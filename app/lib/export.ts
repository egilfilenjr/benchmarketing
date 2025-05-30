import { Team } from '@/app/types';
import { createClient } from '@/app/lib/supabase/server';
import { hasFeature } from './plans';
import { supabase } from '@/app/lib/supabase/client';

type ExportFormat = 'csv' | 'xlsx' | 'pdf';

interface ExportOptions {
  teamId: string;
  format: 'csv' | 'xlsx' | 'pdf';
  dateRange: {
    start: string;
    end: string;
  };
  platforms: string[];
  metrics: string[];
}

interface ExportHistory {
  id: string;
  teamId: string;
  format: string;
  dateRange: {
    start: string;
    end: string;
  };
  platforms: string[];
  metrics: string[];
  fileUrl: string;
  createdAt: string;
}

export class ExportManager {
  async generateExport(options: ExportOptions): Promise<string> {
    try {
      // Get platform data for the specified date range
      const { data: platformData, error: dataError } = await supabase
        .from('platform_data')
        .select('*')
        .eq('team_id', options.teamId)
        .in('platform', options.platforms)
        .gte('synced_at', options.dateRange.start)
        .lte('synced_at', options.dateRange.end);

      if (dataError) throw dataError;

      // Format data based on selected metrics
      const formattedData = this.formatData(platformData || [], options.metrics);

      // Generate file in requested format
      const fileUrl = await this.generateFile(formattedData, options.format);

      // Store export history
      await supabase
        .from('export_history')
        .insert({
          team_id: options.teamId,
          format: options.format,
          date_range: options.dateRange,
          platforms: options.platforms,
          metrics: options.metrics,
          file_url: fileUrl,
        });

      return fileUrl;
    } catch (err) {
      const error = err as Error;
      console.error('Error generating export:', error.message);
      throw error;
    }
  }

  async getExportHistory(teamId: string): Promise<ExportHistory[]> {
    try {
      const { data, error } = await supabase
        .from('export_history')
        .select('*')
        .eq('team_id', teamId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(item => ({
        id: item.id,
        teamId: item.team_id,
        format: item.format,
        dateRange: item.date_range,
        platforms: item.platforms,
        metrics: item.metrics,
        fileUrl: item.file_url,
        createdAt: item.created_at,
      }));
    } catch (err) {
      const error = err as Error;
      console.error('Error fetching export history:', error.message);
      return [];
    }
  }

  private formatData(data: any[], metrics: string[]): any[] {
    return data.map(item => {
      const formattedItem: any = {
        platform: item.platform,
        date: item.synced_at,
      };

      // Add selected metrics
      for (const metric of metrics) {
        formattedItem[metric] = item.data.metrics?.[metric] || 0;
      }

      return formattedItem;
    });
  }

  private async generateFile(data: any[], format: string): Promise<string> {
    // TODO: Implement actual file generation
    // This would typically involve:
    // 1. Converting data to the requested format
    // 2. Uploading to a storage service
    // 3. Returning the file URL
    
    const mockUrl = `https://storage.example.com/exports/${Date.now()}.${format}`;
    return mockUrl;
  }
}

async function generateCSV(data: Record<string, any>[]): Promise<string> {
  // TODO: Implement CSV generation
  return '';
}

async function generateXLSX(data: Record<string, any>[]): Promise<string> {
  // TODO: Implement XLSX generation
  return '';
}

async function generatePDF(data: Record<string, any>[]): Promise<string> {
  // TODO: Implement PDF generation
  return '';
}

export async function getExportHistory(team: Team): Promise<any[]> {
  if (!hasFeature(team, 'export')) {
    return [];
  }

  const supabase = createClient();
  const { data: history } = await supabase
    .from('export_history')
    .select('*')
    .eq('team_id', team.id)
    .order('created_at', { ascending: false });

  return history || [];
} 
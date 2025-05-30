import { createClient } from '../supabase/client';
import { Platform } from '../supabase/schema';
import * as XLSX from 'xlsx';

interface ExportOptions {
  format: 'xlsx' | 'csv';
  dateRange: {
    startDate: string;
    endDate: string;
  };
  platforms: Platform[];
  metrics: string[];
}

export class ExportEngine {
  private teamId: string;

  constructor(teamId: string) {
    this.teamId = teamId;
  }

  async exportData(options: ExportOptions): Promise<string> {
    const supabase = createClient();
    const data: Record<string, any>[] = [];

    // Fetch data for each platform
    for (const platform of options.platforms) {
      const { data: platformData } = await supabase
        .from('platform_data')
        .select('*')
        .eq('platform', platform)
        .eq('team_id', this.teamId)
        .gte('synced_at', options.dateRange.startDate)
        .lte('synced_at', options.dateRange.endDate)
        .order('synced_at', { ascending: true });

      if (!platformData) continue;

      // Extract requested metrics
      for (const record of platformData) {
        const row: Record<string, any> = {
          Date: new Date(record.synced_at).toLocaleDateString(),
          Platform: platform,
        };

        for (const metric of options.metrics) {
          row[metric] = record.data[metric];
        }

        data.push(row);
      }
    }

    // Generate file
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Marketing Data');

    // Save to buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: options.format });

    // Upload to storage
    const fileName = `exports/${this.teamId}/${new Date().getTime()}.${options.format}`;
    const { data: uploadData, error } = await supabase.storage
      .from('exports')
      .upload(fileName, buffer);

    if (error) throw error;

    // Get public URL
    const { data: urlData } = await supabase.storage
      .from('exports')
      .getPublicUrl(fileName);

    // Save export history
    await supabase.from('export_history').insert({
      team_id: this.teamId,
      format: options.format,
      date_range: options.dateRange,
      platforms: options.platforms,
      metrics: options.metrics,
      file_url: urlData.publicUrl,
    });

    return urlData.publicUrl;
  }
} 
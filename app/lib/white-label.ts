import { Team } from '@/app/types';
import { hasFeature } from './plans';
import { supabase } from '@/app/lib/supabase/client';

interface BrandingConfig {
  id: string;
  teamId: string;
  primaryColor: string | null;
  secondaryColor: string | null;
  accentColor: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  companyName: string | null;
  supportEmail: string | null;
  updatedAt: string;
  createdAt: string;
}

const DEFAULT_BRANDING: BrandingConfig = {
  primaryColor: '#1E293B',
  secondaryColor: '#3B82F6',
  accentColor: '#2563EB',
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
  companyName: 'Benchmarketing',
  supportEmail: 'support@benchmarketing.app',
  id: '',
  teamId: '',
  updatedAt: '',
  createdAt: '',
};

export class WhiteLabelManager {
  async getBranding(teamId: string): Promise<BrandingConfig | null> {
    try {
      const { data, error } = await supabase
        .from('team_branding')
        .select('*')
        .eq('team_id', teamId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // Record not found
          return null;
        }
        throw error;
      }

      return this.formatBranding(data);
    } catch (err) {
      const error = err as Error;
      console.error('Error fetching branding:', error.message);
      return null;
    }
  }

  async updateBranding(teamId: string, config: Partial<BrandingConfig>): Promise<BrandingConfig> {
    try {
      const { data, error } = await supabase
        .from('team_branding')
        .upsert({
          team_id: teamId,
          primary_color: config.primaryColor,
          secondary_color: config.secondaryColor,
          accent_color: config.accentColor,
          logo_url: config.logoUrl,
          favicon_url: config.faviconUrl,
          company_name: config.companyName,
          support_email: config.supportEmail,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return this.formatBranding(data);
    } catch (err) {
      const error = err as Error;
      console.error('Error updating branding:', error.message);
      throw error;
    }
  }

  async uploadLogo(teamId: string, file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${teamId}/logo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('branding')
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('branding')
        .getPublicUrl(filePath);

      await this.updateBranding(teamId, { logoUrl: publicUrl });

      return publicUrl;
    } catch (err) {
      const error = err as Error;
      console.error('Error uploading logo:', error.message);
      throw error;
    }
  }

  async uploadFavicon(teamId: string, file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${teamId}/favicon.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('branding')
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('branding')
        .getPublicUrl(filePath);

      await this.updateBranding(teamId, { faviconUrl: publicUrl });

      return publicUrl;
    } catch (err) {
      const error = err as Error;
      console.error('Error uploading favicon:', error.message);
      throw error;
    }
  }

  async resetBranding(teamId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('team_branding')
        .delete()
        .eq('team_id', teamId);

      if (error) throw error;

      // Delete stored files
      await supabase.storage
        .from('branding')
        .remove([`${teamId}/logo.png`, `${teamId}/favicon.ico`]);
    } catch (err) {
      const error = err as Error;
      console.error('Error resetting branding:', error.message);
      throw error;
    }
  }

  private formatBranding(data: any): BrandingConfig {
    return {
      id: data.id,
      teamId: data.team_id,
      primaryColor: data.primary_color,
      secondaryColor: data.secondary_color,
      accentColor: data.accent_color,
      logoUrl: data.logo_url,
      faviconUrl: data.favicon_url,
      companyName: data.company_name,
      supportEmail: data.support_email,
      updatedAt: data.updated_at,
      createdAt: data.created_at,
    };
  }
}

export function generateCustomCSS(config: BrandingConfig): string {
  return `
    :root {
      --bm-primary: ${config.primaryColor};
      --bm-secondary-a: ${config.secondaryColor};
      --bm-secondary-b: ${config.accentColor};
    }
  `;
} 
import { z } from 'zod';

// Branding configuration schema
export const BrandingConfigSchema = z.object({
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  fontFamily: z.string().optional(),
  logo: z.string().optional(),
});

// Galley configuration schema
export const GalleyConfigSchema = z.object({
  branding: BrandingConfigSchema.optional(),
  templateSources: z.array(z.string()).optional(),
  defaultSize: z.object({
    width: z.number(),
    height: z.number(),
  }).optional(),
  exportFormats: z.array(z.enum(['png', 'jpg', 'webp'])).optional(),
  theme: z.string().optional(),
});

export type BrandingConfig = z.infer<typeof BrandingConfigSchema>;
export type GalleyConfig = z.infer<typeof GalleyConfigSchema>;

export function defineConfig(config: GalleyConfig): GalleyConfig {
  return GalleyConfigSchema.parse(config);
}

// Default configuration
export const defaultConfig: GalleyConfig = {
  branding: {
    primaryColor: '#3B82F6',
    secondaryColor: '#64748B',
    fontFamily: 'Inter, sans-serif',
  },
  templateSources: ['./src/templates'],
  defaultSize: {
    width: 800,
    height: 400,
  },
  exportFormats: ['png', 'jpg'],
  theme: 'default',
};
import { z } from 'zod';
export declare const BrandingConfigSchema: z.ZodObject<{
    primaryColor: z.ZodOptional<z.ZodString>;
    secondaryColor: z.ZodOptional<z.ZodString>;
    fontFamily: z.ZodOptional<z.ZodString>;
    logo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const GalleyConfigSchema: z.ZodObject<{
    branding: z.ZodOptional<z.ZodObject<{
        primaryColor: z.ZodOptional<z.ZodString>;
        secondaryColor: z.ZodOptional<z.ZodString>;
        fontFamily: z.ZodOptional<z.ZodString>;
        logo: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    templateSources: z.ZodOptional<z.ZodArray<z.ZodString>>;
    defaultSize: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, z.core.$strip>>;
    exportFormats: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        png: "png";
        jpg: "jpg";
        webp: "webp";
    }>>>;
    theme: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type BrandingConfig = z.infer<typeof BrandingConfigSchema>;
export type GalleyConfig = z.infer<typeof GalleyConfigSchema>;
export declare function defineConfig(config: GalleyConfig): GalleyConfig;
export declare const defaultConfig: GalleyConfig;

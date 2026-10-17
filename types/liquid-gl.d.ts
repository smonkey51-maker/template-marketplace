// liquid-gl ships no type declarations; this covers only the options we pass.
declare module "liquid-gl" {
  export interface LiquidGLOptions {
    target: string;
    snapshot?: string;
    resolution?: number;
    refraction?: number;
    bevelDepth?: number;
    bevelWidth?: number;
    frost?: number;
    shadow?: boolean;
    specular?: boolean;
    reveal?: string;
    tilt?: boolean;
    tint?: string | null;
  }
  export interface LiquidGLLens {
    destroy?: () => void;
  }
  export default function liquidGL(options: LiquidGLOptions): LiquidGLLens;
}

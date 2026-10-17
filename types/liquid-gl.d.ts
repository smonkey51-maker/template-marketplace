// liquid-gl ships no type declarations; this covers the options we pass.
declare module "liquid-gl" {
  export interface LiquidGLOptions {
    target: string;
    snapshot?: string;
    resolution?: number;
    zIndex?: number;
    refraction?: number;
    aberration?: number;
    bevelDepth?: number;
    bevelWidth?: number;
    frost?: number;
    shadow?: boolean;
    specular?: boolean;
    reveal?: string;
    tilt?: boolean;
    magnify?: number;
    tint?: string | null;
    interaction?: "none" | "fluid";
    interactionStrength?: number;
    interactionRadius?: number;
    interactionViscosity?: number;
  }
  export interface LiquidGLLens {
    destroy?: () => void;
  }
  export default function liquidGL(options: LiquidGLOptions): LiquidGLLens;
}

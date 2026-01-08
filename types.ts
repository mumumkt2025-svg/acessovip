
export interface PixelConfig {
  pixelId: string;
  token: string;
  targetUrl: string;
}

declare global {
  interface Window {
    fbq: any;
  }
}

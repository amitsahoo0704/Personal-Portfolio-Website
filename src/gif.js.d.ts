// src/gif.js.d.ts
declare module 'gif.js' {
    export default class GIF {
      constructor(options?: GIFOptions);
      addFrame(image: HTMLImageElement | HTMLCanvasElement | ImageBitmap, options?: FrameOptions): void;
      on(event: 'finished', callback: (blob: Blob) => void): void;
      render(): void;
    }
  
    interface GIFOptions {
      workers?: number;
      quality?: number;
      width?: number;
      height?: number;
      workerScript?: string;
      background?: string;
      transparent?: string;
      repeat?: number;
      delay?: number;
      dither?: boolean | string;
      debug?: boolean;
    }
  
    interface FrameOptions {
      delay?: number;
      copy?: boolean;
    }
  }
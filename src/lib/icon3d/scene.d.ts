export interface IconScene {
  stats: { triangles: number };
  setTheme(theme: 'light' | 'dark'): void;
  setActive(value: boolean): void;
  dispose(): void;
  onFrame(fn: (stats: { fps: number; tris: number }) => void): void;
  pose(x: number, y: number, z: number): void;
}
export const WINE: number;
export function createIcon(options: { canvas: HTMLCanvasElement; debug?: boolean; theme?: 'light' | 'dark' }): Promise<IconScene>;

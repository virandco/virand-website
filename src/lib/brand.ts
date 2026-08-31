// VIRAND logo — single source of truth for the vector marks.
//
// The source files in `src/assets` carry a hard-coded fill per colour variant.
// We keep only the <path> geometry here and re-wrap it at the call site with
// `fill="currentColor"`, so one set of paths serves every theme (white on
// dark, obsidian on light) and any accent override.

import iconRaw from '../assets/VIRAND-icono-blanco.svg?raw';
import wordmarkRaw from '../assets/02-VIRAND-wordmark-blanco.svg?raw';
import verticalRaw from '../assets/03-VIRAND-logo-vertical-blanco.svg?raw';

/** Strip the XML prolog, the <svg> wrapper and the hard-coded fills, leaving
 *  just the <path> data. */
function extractPaths(raw: string): string {
  return raw
    .replace(/<\?xml[^>]*\?>/, '')
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .replace(/\s*fill="[^"]*"/g, '')
    .trim();
}

export const ICON_PATHS = extractPaths(iconRaw);
export const WORDMARK_PATHS = extractPaths(wordmarkRaw);
/** Symbol stacked over the wordmark, one coordinate space. Single-tone use. */
export const VERTICAL_PATHS = extractPaths(verticalRaw);

// The symbol and the wordmark are drawn in the same 1928-wide grid: the symbol
// fills y 0–1250, the wordmark art sits at y 1396–1629. Cropping each to its
// own box lets flexbox lay them out at matching heights.
export const ICON_VIEWBOX = '0 0 1928 1250';
export const WORDMARK_VIEWBOX = '0 1396 1928 233.45';
export const VERTICAL_VIEWBOX = '0 0 1928 1630';

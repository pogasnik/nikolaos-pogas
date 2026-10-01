import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';
import type { MediaSlot } from './content';

// Media for a project lives in public/media/<slug>/. Files are read at build
// time, so dropping a file in and rebuilding is all it takes.

const VIDEO = ['.mp4', '.webm'];
const IMAGE = ['.avif', '.webp', '.png', '.jpg', '.jpeg', '.gif'];

export type MediaItem =
  | { kind: 'video'; caption: string; sources: { src: string; type: string }[]; poster?: string }
  | {
      kind: 'image';
      caption: string;
      src: string;
      width: number;
      height: number;
      animated: boolean;
    }
  | { kind: 'missing'; caption: string };

const mediaDir = (slug: string) => path.join(process.cwd(), 'public', 'media', slug);

function listFiles(slug: string): string[] {
  try {
    return readdirSync(mediaDir(slug))
      .filter((f) => !f.startsWith('.'))
      .sort();
  } catch {
    return [];
  }
}

function captionFromName(stem: string): string {
  const words = stem
    .replace(/^\d+[-_ ]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function itemFor(slug: string, stem: string, caption: string, files: string[]): MediaItem {
  const matching = files.filter((f) => path.parse(f).name === stem);
  const url = (f: string) => `/media/${slug}/${encodeURIComponent(f)}`;
  const videos = matching.filter((f) => VIDEO.includes(path.extname(f).toLowerCase()));
  const images = matching
    .filter((f) => IMAGE.includes(path.extname(f).toLowerCase()))
    .sort(
      (a, b) =>
        IMAGE.indexOf(path.extname(a).toLowerCase()) - IMAGE.indexOf(path.extname(b).toLowerCase()),
    );
  const firstImage = images[0];

  if (videos.length > 0) {
    return {
      kind: 'video',
      caption,
      // webm first: smaller where supported.
      sources: [...videos]
        .sort((a, b) => Number(b.endsWith('.webm')) - Number(a.endsWith('.webm')))
        .map((f) => ({ src: url(f), type: `video/${path.extname(f).slice(1).toLowerCase()}` })),
      poster: firstImage ? url(firstImage) : undefined,
    };
  }
  if (firstImage) {
    // Real dimensions, so the browser reserves the right space and nothing is stretched.
    const { width, height } = imageSize(readFileSync(path.join(mediaDir(slug), firstImage)));
    return {
      kind: 'image',
      caption,
      src: url(firstImage),
      width,
      height,
      animated: firstImage.toLowerCase().endsWith('.gif'),
    };
  }
  return { kind: 'missing', caption };
}

export function getProjectMedia(slug: string, slots: MediaSlot[]): MediaItem[] {
  const files = listFiles(slug).filter((f) =>
    [...VIDEO, ...IMAGE].includes(path.extname(f).toLowerCase()),
  );
  const slotNames = new Set(slots.map((s) => s.name));
  const extraStems = [...new Set(files.map((f) => path.parse(f).name))].filter(
    (stem) => !slotNames.has(stem),
  );

  return [
    ...slots.map((s) => itemFor(slug, s.name, s.caption, files)),
    ...extraStems.map((stem) => itemFor(slug, stem, captionFromName(stem), files)),
  ];
}

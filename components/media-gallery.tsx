import Image from 'next/image';
import type { MediaItem } from '@/lib/media';

export function MediaGallery({ items, projectName }: { items: MediaItem[]; projectName: string }) {
  return (
    <ul className="grid gap-8">
      {items.map((item, i) => (
        <li key={`${item.caption}-${i}`}>
          <figure>
            <MediaBody item={item} projectName={projectName} priority={i === 0} />
            <figcaption className="mt-2 text-sm text-muted">{item.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

const frame = 'overflow-hidden rounded-lg border border-line bg-panel';

function MediaBody({
  item,
  projectName,
  priority,
}: {
  item: MediaItem;
  projectName: string;
  priority: boolean;
}) {
  const alt = `${projectName}: ${item.caption}`;
  switch (item.kind) {
    case 'video':
      return (
        <div className={`${frame} relative aspect-[16/10]`}>
          <video
            className="absolute inset-0 h-full w-full object-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={item.poster}
            aria-label={alt}
          >
            {item.sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        </div>
      );
    case 'image':
      return (
        <div className={`${frame} flex justify-center`}>
          <Image
            src={item.src}
            alt={alt}
            width={item.width}
            height={item.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto max-h-[80vh] w-auto max-w-full"
            priority={priority}
            unoptimized={item.animated}
          />
        </div>
      );
    case 'missing':
      return (
        <div className={`${frame} flex aspect-[4/1] items-center justify-center border-dashed p-6`}>
          <p className="font-mono text-xs text-muted">Screenshot to follow</p>
        </div>
      );
  }
}

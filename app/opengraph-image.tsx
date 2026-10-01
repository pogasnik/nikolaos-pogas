import { ImageResponse } from 'next/og';
import { OgCard, ogSize } from '@/components/og-card';
import { person } from '@/lib/content';

export const alt = `${person.name}, ${person.title}`;
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Greece · Remote"
      title={person.name}
      subtitle={`${person.title}. Next.js, TypeScript, PostgreSQL.`}
    />,
    size,
  );
}

import { ImageResponse } from 'next/og';
import { OgCard, ogSize } from '@/components/og-card';
import { getProject, person, projects } from '@/lib/content';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Project overview';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return new ImageResponse(
    <OgCard
      eyebrow={person.name}
      title={project?.name ?? person.name}
      subtitle={project?.tagline ?? person.title}
    />,
    size,
  );
}

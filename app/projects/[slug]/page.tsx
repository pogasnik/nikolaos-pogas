import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FlowDiagram } from '@/components/flow-diagram';
import { MediaGallery } from '@/components/media-gallery';
import { getProject, projects } from '@/lib/content';
import { getProjectMedia } from '@/lib/media';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const description = `${project.tagline} ${project.problem}`;
  return {
    title: project.name,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title: project.name, description, url: `/projects/${slug}`, type: 'article' },
    twitter: { title: project.name, description },
  };
}

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const media = getProjectMedia(project.slug, project.media);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pb-16">
      <header className="pb-14 pt-16 sm:pt-24">
        <p className="font-mono text-sm text-muted">
          <Link href="/#work" className="hover:text-fg">
            ← Selected work
          </Link>
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">{project.name}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{project.tagline}</p>
        <p className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} className="inline-block py-1 text-accent underline">
              {l.label}
            </a>
          ))}
          <span className="font-mono text-xs text-muted">{project.sourceNote}</span>
        </p>
      </header>

      <Block title="Problem">
        <p className="text-lg leading-relaxed">{project.problem}</p>
      </Block>

      <Block title="What I built">
        <ul className="space-y-3 leading-relaxed">
          {project.built.map((b) => (
            <li
              key={b}
              className="relative pl-4 before:absolute before:left-0 before:text-muted before:content-['–']"
            >
              {b}
            </li>
          ))}
        </ul>
      </Block>

      <Block title="How it works">
        <div className="space-y-10">
          {project.architecture.map((a) => (
            <div key={a.heading}>
              <h3 className="font-medium">{a.heading}</h3>
              <div className="mt-3 space-y-3 leading-relaxed">
                {a.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Data flow">
        <FlowDiagram flow={project.flow} />
      </Block>

      <Block title="Screens">
        <MediaGallery items={media} projectName={project.name} />
      </Block>

      <Block title="Stack">
        <p className="leading-relaxed">{project.stack.join(' · ')}</p>
      </Block>

      {next && next.slug !== project.slug && (
        <nav aria-label="Next project" className="border-t border-line pt-10">
          <Link href={`/projects/${next.slug}`} className="group block">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">Next</span>
            <span className="mt-1 block text-xl font-medium group-hover:text-accent">
              {next.name} →
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-6 font-mono text-sm uppercase tracking-wider text-muted">{title}</h2>
      {children}
    </section>
  );
}

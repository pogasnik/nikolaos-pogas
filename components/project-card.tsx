import Link from 'next/link';
import type { Project } from '@/lib/content';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-line p-5 sm:p-6">
      <h3 className="text-lg font-medium tracking-tight">
        <Link href={`/projects/${project.slug}`} className="hover:text-accent">
          {project.name}
        </Link>
      </h3>
      <p className="mt-1 text-muted">{project.tagline}</p>

      <dl className="mt-5 grid gap-4 text-[15px] leading-relaxed sm:grid-cols-[7rem_1fr] sm:gap-x-4">
        <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-1">Problem</dt>
        <dd>{project.problem}</dd>
        <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-1">Built</dt>
        <dd>{project.summary}</dd>
        <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-1">Stack</dt>
        <dd className="text-muted">{project.stack.join(' · ')}</dd>
      </dl>

      <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-block py-1 text-accent underline"
        >
          How it works<span className="sr-only"> ({project.name})</span>
        </Link>
        {project.links.map((l) => (
          <a key={l.href} href={l.href} className="inline-block py-1 text-accent underline">
            {l.label}
            <span className="sr-only"> ({project.name})</span>
          </a>
        ))}
      </p>
    </article>
  );
}

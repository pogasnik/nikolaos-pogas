import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { education, experience, links, person, projects, stack } from '@/lib/content';
import { siteUrl } from '@/lib/site';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  jobTitle: person.title,
  url: siteUrl,
  email: `mailto:${person.email}`,
  address: { '@type': 'PostalAddress', addressCountry: 'GR' },
  sameAs: links.filter((l) => l.href.startsWith('https://')).map((l) => l.href),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section aria-labelledby="intro" className="pb-20 pt-20 sm:pt-28">
        <h1 id="intro" className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {person.name}
        </h1>
        <p className="mt-3 font-mono text-sm text-muted">
          {person.title} · Next.js, TypeScript, PostgreSQL
        </p>
        <div className="mt-8 max-w-2xl space-y-3 text-lg leading-relaxed">
          {person.summary.map((s) => (
            <p key={s}>{s}</p>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="inline-block py-1 text-accent underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Section id="work" title="Selected work">
        <div className="grid gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section id="experience" title="Experience">
        <ol className="space-y-12">
          {experience.map((role) => (
            <li key={role.org} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <p className="font-mono text-sm text-muted sm:pt-0.5">{role.period}</p>
              <div>
                <h3 className="font-medium">
                  {role.title}, {role.org}
                  {role.orgNote && (
                    <span className="font-normal text-muted"> ({role.orgNote})</span>
                  )}
                </h3>
                <ul className="mt-3 space-y-2 leading-relaxed">
                  {role.points.map((pt) => (
                    <li
                      key={pt}
                      className="relative pl-4 before:absolute before:left-0 before:text-muted before:content-['–']"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
                {role.projectSlugs && (
                  <p className="mt-3 flex gap-x-5 text-sm">
                    {role.projectSlugs.map((slug) => {
                      const p = projects.find((x) => x.slug === slug);
                      return p ? (
                        <Link
                          key={slug}
                          href={`/projects/${slug}`}
                          className="inline-block py-1 text-accent underline"
                        >
                          {p.name}
                        </Link>
                      ) : null;
                    })}
                  </p>
                )}
              </div>
            </li>
          ))}
          <li className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <p className="font-mono text-sm text-muted sm:pt-0.5">{education.year}</p>
            <div>
              <h3 className="font-medium">{education.degree}</h3>
              <p className="mt-1 text-muted">{education.school}</p>
            </div>
          </li>
        </ol>
      </Section>

      <Section id="stack" title="Stack">
        <dl className="grid gap-4 sm:grid-cols-[10rem_1fr] sm:gap-x-6">
          {stack.map((group) => (
            <div key={group.label} className="contents">
              <dt className="font-mono text-sm text-muted">{group.label}</dt>
              <dd className="leading-relaxed">{group.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="contact" title="Contact">
        <p className="text-lg leading-relaxed">
          Open to remote roles. Based in {person.location}, with full overlap with CET hours.
        </p>
        <p className="mt-6">
          <a href={`mailto:${person.email}`} className="text-xl text-accent underline sm:text-2xl">
            {person.email}
          </a>
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {links
            .filter((l) => !l.href.startsWith('mailto:'))
            .map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-block py-1 text-accent underline">
                  {l.label}
                </a>
              </li>
            ))}
        </ul>
        <p className="mt-12 text-sm text-muted">Outside work: {person.outsideWork}</p>
      </Section>
    </>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-8 border-t border-line py-16"
    >
      <h2
        id={`${id}-title`}
        className="mb-10 font-mono text-sm uppercase tracking-wider text-muted"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

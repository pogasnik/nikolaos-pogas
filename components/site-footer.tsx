import { links, person } from '@/lib/content';

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-3xl border-t border-line px-4 py-10 text-sm text-muted sm:px-6">
      <div className="flex flex-wrap justify-between gap-4">
        <p>{person.name}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="inline-block py-1 hover:text-fg">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

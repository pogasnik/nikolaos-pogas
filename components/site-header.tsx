import Link from 'next/link';
import { person } from '@/lib/content';

const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Contact', href: '/#contact' },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-3xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-4 pt-8 sm:px-6">
      <Link href="/" className="font-medium tracking-tight no-underline hover:text-accent">
        {person.name}
      </Link>
      <nav aria-label="Sections">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="inline-block py-1 hover:text-fg">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

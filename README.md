# pogofolio

The portfolio site of Nikolaos Pogas, full-stack engineer. One page with work, experience, stack and
contact, plus one page per project:

- `/projects/ploutos`: multi-tenant e-commerce SaaS with AADE myDATA
- `/projects/arke`: field-service app for installation crews
- `/projects/mydata-receipt-demo`: myDATA XML to receipt PDF ([source](https://github.com/pogasnik/mydata-receipt-demo))

Every page is static HTML, generated at build time. There is no client-side JavaScript of our own,
no analytics and no tracking.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Fonts are Geist via `next/font`. The
OpenGraph images are generated at build time with `next/og`.

## Run it

Requires Node 22.12+ and pnpm 10.

```sh
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm lint         # zero warnings allowed
pnpm typecheck
pnpm format       # prettier
```

## Where things live

| Path                          | What                                                             |
| ----------------------------- | ---------------------------------------------------------------- |
| `lib/content.ts`              | All copy: bio, projects, architecture text, diagrams, experience |
| `app/page.tsx`                | Home page sections                                               |
| `app/projects/[slug]/`        | Project page and its OpenGraph image                             |
| `components/flow-diagram.tsx` | Data-flow diagram, drawn in HTML/CSS from `project.flow`         |
| `lib/media.ts`                | Finds screenshots and recordings in `public/media/<project>/`    |

## Screenshots and recordings

Drop files in `public/media/<project>/` and rebuild. Each project has named slots in
`lib/content.ts` (`media`). A file whose name matches a slot fills it; anything else is shown after
the slots, captioned from its file name. Slots with no file show a placeholder.

| Project             | Folder                              | Slot names                                 |
| ------------------- | ----------------------------------- | ------------------------------------------ |
| Ploutos             | `public/media/ploutos/`             | `storefront`, `admin`, `cli`               |
| Arke                | `public/media/arke/`                | `technician-app`, `dashboard`, `event-log` |
| myDATA receipt demo | `public/media/mydata-receipt-demo/` | `form-and-receipt` (filled)                |

- Images: `.avif`, `.webp`, `.png`, `.jpg`, `.gif`. Sized from the file itself.
- Recordings: `.mp4` and/or `.webm`. They play muted, looped and inline. Add an image with the same
  name (for example `admin.mp4` + `admin.png`) and it becomes the poster frame.
- Keep recordings short and small: 10–20 s, under ~3 MB, no audio track.

## Deploy

Vercel picks up Next.js and pnpm on its own; there is no `vercel.json`. After connecting a custom
domain, set `NEXT_PUBLIC_SITE_URL` (for example `https://example.com`) in the Vercel project so canonical
links, the sitemap and OpenGraph URLs use it. Until then the Vercel production URL is used.

## Licence

All rights reserved. The code is public to read; the copy and media are not for reuse.

// The public URL, used for canonical links, the sitemap and OpenGraph.
// Set NEXT_PUBLIC_SITE_URL once the domain is connected. On Vercel the
// production URL is picked up automatically until then.
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return 'http://localhost:3000';
}

export const siteUrl = resolveSiteUrl();
export const siteDescription =
  'Nikolaos Pogas, full-stack engineer in Greece. Next.js, TypeScript and PostgreSQL: multi-tenant SaaS, field-service apps and AADE myDATA integrations.';

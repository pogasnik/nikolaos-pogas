import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="py-28">
      <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="mt-4 text-muted">That page does not exist.</p>
      <p className="mt-8">
        <Link href="/" className="text-accent underline">
          Back to the start
        </Link>
      </p>
    </section>
  );
}

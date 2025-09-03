export default function AboutPage() {
  return (
    <section className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">About</h1>
      <p>
        This is a minimal, premium showcase of products I love and things on my wishlist. Built with Next.js, Tailwind,
        and a local Git-based CMS.
      </p>
      <p>
        For enquiries or suggestions, reach me at{' '}
        <a className="underline underline-offset-4" href="mailto:hello@example.com">hello@example.com</a> or{' '}
        <a className="underline underline-offset-4" href="https://x.com/" target="_blank" rel="noopener noreferrer">
          X/Twitter
        </a>
        .
      </p>
    </section>
  );
}

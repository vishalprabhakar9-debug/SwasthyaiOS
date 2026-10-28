import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="font-heading text-4xl">That page is not in the library.</h1>
      <p className="mt-3">The exercise or article may have moved.</p>
      <Link href="/exercises" className="mt-4 inline-block underline">
        Browse exercises
      </Link>
    </div>
  );
}

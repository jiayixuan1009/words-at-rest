import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 text-lg text-stone-700">That puzzle seems to have wandered off.</p>
      <p className="mt-6 text-lg">
        <Link href="/daily">Play today&apos;s puzzle</Link> · <Link href="/themes">Browse themes</Link>
      </p>
    </div>
  );
}

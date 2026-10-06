import Link from "next/link";
import JsonLd from "./JsonLd";
import { absoluteUrl } from "@/lib/site";

export interface Crumb {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-stone-500">
      <ol className="flex flex-wrap gap-1">
        {all.map((c, i) => (
          <li key={c.href} className="flex gap-1">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i < all.length - 1 ? (
              <Link href={c.href} className="hover:text-stone-800">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-stone-700">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${absoluteUrl(all[all.length - 1].href)}#breadcrumb`,
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.href),
          })),
        }}
      />
    </nav>
  );
}

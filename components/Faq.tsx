import JsonLd from "./JsonLd";
import { absoluteUrl } from "@/lib/site";

export interface FaqItem {
  q: string;
  /** Plain-text answer (also used verbatim in FAQPage JSON-LD). Keep 40–80 words. */
  a: string;
}

/**
 * Visible FAQ + matching FAQPage JSON-LD. Each question is a native <details>
 * accordion: answers are server-rendered in the HTML (crawlers and screen
 * readers get them), but stay folded so phones show a short list of questions.
 */
export default function Faq({
  items,
  heading = "Frequently asked questions",
  path,
}: {
  items: FaqItem[];
  heading?: string;
  /** Page path, for a stable FAQPage @id. */
  path?: string;
}) {
  return (
    <section className="mt-14 max-w-3xl" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-serif text-3xl">{heading}</h2>
      <div className="mt-6 divide-y divide-[#d4cbb8] border-y border-[#d4cbb8]">
        {items.map((it) => (
          <details key={it.q} className="faq-item group py-4">
            <summary className="faq-summary flex cursor-pointer list-none items-start justify-between gap-4">
              <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">{it.q}</h3>
              <span aria-hidden="true" className="faq-chevron mt-1 shrink-0 font-sans text-xl leading-none text-[var(--moss)]">+</span>
            </summary>
            <p className="faq-answer mt-2 text-lg leading-relaxed text-[var(--ink-soft)]">{it.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          ...(path ? { "@id": `${absoluteUrl(path)}#faq`, isPartOf: { "@id": `${absoluteUrl(path)}#webpage` } } : {}),
          mainEntity: items.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }}
      />
    </section>
  );
}

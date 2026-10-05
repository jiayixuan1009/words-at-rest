import JsonLd from "./JsonLd";

export interface FaqItem {
  q: string;
  /** Plain-text answer (also used verbatim in FAQPage JSON-LD). Keep 40–80 words. */
  a: string;
}

/** Visible FAQ + matching FAQPage JSON-LD. Answers carry .faq-answer for Speakable. */
export default function Faq({ items, heading = "Frequently asked questions" }: { items: FaqItem[]; heading?: string }) {
  return (
    <section className="mt-14 max-w-3xl" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-serif text-3xl">{heading}</h2>
      <div className="mt-6 divide-y divide-[#d4cbb8] border-y border-[#d4cbb8]">
        {items.map((it) => (
          <div key={it.q} className="py-5">
            <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">{it.q}</h3>
            <p className="faq-answer mt-2 text-lg leading-relaxed text-[var(--ink-soft)]">{it.a}</p>
          </div>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
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

export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-[var(--ink)] [&_a]:text-[var(--moss)] [&_a]:underline [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-6 [&_ol]:list-decimal [&_p]:text-[var(--ink-soft)] [&_ul]:list-disc">
      {children}
    </div>
  );
}

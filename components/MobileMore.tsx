/**
 * "Read more" for long secondary copy on phones — CSS only, no JavaScript.
 * The full text is always in the server-rendered HTML (same markup for every
 * visitor and crawler). On screens < 640px it starts clipped to a short preview
 * with a "Read more" toggle (a visually hidden checkbox + label, keyboard
 * focusable); on larger screens it is simply shown in full.
 */
export default function MobileMore({
  id,
  children,
  label = "Read more",
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`mobile-more ${className}`}>
      <input type="checkbox" id={`more-${id}`} className="mobile-more__toggle sr-only" />
      <div className="mobile-more__body space-y-4">{children}</div>
      <label htmlFor={`more-${id}`} className="mobile-more__label">
        <span className="mobile-more__open">{label}</span>
        <span className="mobile-more__close">Show less</span>
      </label>
    </div>
  );
}

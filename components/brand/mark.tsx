export function Mark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.15" />
      <path
        d="M6 18.5c3.2-1.6 6.4-2.4 10-2.4s6.8.8 10 2.4"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <circle cx="16" cy="13.5" r="3.1" fill="#C45C26" />
    </svg>
  );
}

export function Wordmark({
  subtitle,
  compact = false,
}: {
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Mark className="h-7 w-7 text-ink" />
      <div className="leading-tight">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-[18px] tracking-tight text-ink">
            See Mo
          </span>
          {!compact && (
            <span className="text-[12px] text-ink-dim">Sigiriya</span>
          )}
        </div>
        {subtitle && <p className="text-[11px] text-ink-dim">{subtitle}</p>}
      </div>
    </div>
  );
}

export function Mark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="8"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
      <path
        d="M8 20.5c3.2-6.2 6.4-9.5 8-9.5s4.8 3.3 8 9.5"
        stroke="#F59E0B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16.5" r="2.2" fill="#0EA5E9" />
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
          <span className="text-[15px] font-medium tracking-tight text-ink">
            AISee
          </span>
          {!compact && (
            <span className="font-mono text-[10px] tracking-[0.16em] text-telemetry uppercase">
              Enterprise
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-[11px] text-ink-dim">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

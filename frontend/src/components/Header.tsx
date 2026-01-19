"use client";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1" style={{ color: "var(--foreground-muted)" }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm" style={{ color: "var(--foreground)" }}>
            {formattedDate}
          </p>
          <p className="text-xs" style={{ color: "var(--foreground-subtle)" }}>
            {now.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
          style={{
            background: `linear-gradient(135deg, var(--info) 0%, var(--accent) 100%)`,
            color: "var(--foreground)",
          }}
        >
          SC
        </div>
      </div>
    </header>
  );
}

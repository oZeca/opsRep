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
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-zinc-400 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-zinc-300">{formattedDate}</p>
          <p className="text-xs text-zinc-500">
            {now.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
          SC
        </div>
      </div>
    </header>
  );
}

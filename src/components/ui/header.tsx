import React from "react";

interface Props {
  children: React.ReactNode;
  title: string;
  description?: string;
  count?: number;
}

export function Header({ children, title, description, count }: Props) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-light">
          {title}{" "}
          {count && (
            <span className="flex size-9 items-center justify-center rounded-full border text-lg">
              {count}
            </span>
          )}
        </h1>
        {description && (
          <p className="text-muted-foreground text-sm">
            {description}
            Breif overview of product features and benefits
          </p>
        )}
      </div>
      {children}
    </header>
  );
}

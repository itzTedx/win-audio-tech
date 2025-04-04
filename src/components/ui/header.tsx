"use client";

import { useRouter } from "next/navigation";

import { IconArrowLeft } from "@tabler/icons-react";

import { Button } from "./button";

interface Props {
  children?: React.ReactNode;
  title: string;
  description?: string;
  count?: number;
  withBackButton?: boolean;
}

export function Header({
  children,
  title,
  description,
  count,
  withBackButton,
}: Props) {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <div className="flex items-center">
          {withBackButton && (
            <Button
              variant="ghost"
              className="mr-2"
              onClick={() => router.back()}
            >
              <IconArrowLeft />
            </Button>
          )}

          <h1 className="flex items-center gap-2 text-3xl font-light">
            {title}{" "}
            {count && (
              <span className="flex size-9 items-center justify-center rounded-full border text-lg">
                {count}
              </span>
            )}
          </h1>
        </div>
        {description && (
          <p className="text-muted-foreground text-xs">
            {description}
            Breif overview of product features and benefits
          </p>
        )}
      </div>
      {children}
    </header>
  );
}

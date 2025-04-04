"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import {
  IconBuilding,
  IconPlus,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface SearchProps {
  data: any;
}

export function Search({ data }: SearchProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        aria-keyshortcuts="/"
        className={cn(
          "bg-background text-muted-foreground relative h-10 w-10 justify-start rounded-[0.5rem] text-sm font-normal shadow-none transition-all max-sm:px-2.5 sm:w-52 sm:pr-12 md:w-64 lg:w-72"
        )}
        onClick={() => setOpen(true)}
      >
        <IconSearch className="sm:text-muted-foreground/60 size-4 flex-shrink-0 sm:mr-2.5" />
        <span className="hidden sm:inline-flex">Search...</span>
        <kbd className="bg-muted/30 pointer-events-none absolute top-1/2 right-2.5 hidden h-5 -translate-y-1/2 items-center justify-center gap-1 rounded border px-1.5 font-mono text-xs font-medium opacity-100 select-none sm:flex">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search Cards or Company..." />
        <CommandList>
          <CommandEmpty>No cards found.</CommandEmpty>
          {data?.map((company) => (
            <CommandGroup key={company.id} heading={company.name}>
              {company.persons!.map((person) => (
                <CommandItem
                  value={person.slug!}
                  key={person.id}
                  onSelect={() => {
                    runCommand(() => router.push(`/card/${person.id}`));
                  }}
                >
                  <IconUser className="text-muted-foreground mr-2 size-4" />{" "}
                  {person.name}
                </CommandItem>
              ))}
              {company?.persons!.length && (
                <>
                  <CommandItem
                    value={`new-${company.name}`}
                    className="justify-between"
                    onSelect={() => {
                      runCommand(() =>
                        router.push(`/card/new?company=${company.id}`)
                      );
                    }}
                  >
                    <p className="text-muted-foreground/60 px-2 text-xs">
                      No Cards Found
                    </p>
                    <div className="text-muted-foreground flex">
                      <IconPlus className="mr-1 size-3 p-0.5" />
                      Add new
                    </div>
                  </CommandItem>
                </>
              )}
            </CommandGroup>
          ))}
          <CommandGroup heading="Companies">
            {data?.map((company) => (
              <CommandItem
                key={company.id}
                value={company.name}
                onSelect={() => {
                  runCommand(() => router.push("/"));
                }}
              >
                <IconBuilding className="text-muted-foreground mr-2 size-4" />
                {company.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

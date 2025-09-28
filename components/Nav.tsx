"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

type NavOrientation = "horizontal" | "vertical";

interface NavProps {
  orientation?: NavOrientation;
  onNavigate?: () => void;
}

export function Nav({ orientation = "horizontal", onNavigate }: NavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation">
      <ul
        className={cn(
          "flex gap-2 text-sm font-medium",
          orientation === "horizontal"
            ? "items-center"
            : "flex-col items-start space-y-2 text-base",
        )}
      >
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === link.href
              : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                className={cn(
                  "rounded-full px-4 py-2 transition-all duration-150",
                  isActive
                    ? "bg-white/10 text-fg"
                    : "text-fg-muted hover:bg-white/5 hover:text-fg",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

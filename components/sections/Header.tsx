"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { track } from "@vercel/analytics";
import { site, siteConfig, unwrap } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

function FullscreenNav({ onClose }: { onClose: () => void }) {
  return (
    <nav
      id="mobile-nav"
      className="nav-fullscreen fixed inset-0 z-[99] flex min-h-[100dvh] flex-col bg-[#1D1B18] xl:hidden"
      aria-label="Hlavní navigace"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 15% 20%, rgba(245,184,0,0.12), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 85%, rgba(61,52,44,0.55), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light"
        aria-hidden
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'matrix\' values=\'0 0 0 0 0.42 0 0 0 0 0.32 0 0 0 0 0.22 0 0 0 0.55 0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "180px 180px",
        }}
      />

      {/* Spacer matching header bar (logo row + vertical padding) */}
      <div
        className="relative shrink-0 px-3 py-3 sm:px-4 sm:py-4 md:px-8"
        aria-hidden
      >
        <div className="h-4 sm:h-6" />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col justify-between px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8 sm:px-8 sm:pt-10 md:px-12 md:pt-12">
        <ul className="flex flex-col gap-1 sm:gap-2">
          {site.nav.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-fullscreen__link group flex items-baseline gap-3 py-1.5 font-display text-[clamp(1.75rem,7vw,3.75rem)] uppercase leading-[1.05] tracking-tight text-white transition-colors hover:text-komatsu-yellow focus-visible:text-komatsu-yellow"
                style={{ animationDelay: `${80 + i * 45}ms` }}
                onClick={onClose}
              >
                <span
                  className="mt-[0.35em] hidden h-[0.12em] w-0 shrink-0 bg-komatsu-yellow transition-[width] duration-300 group-hover:w-6 group-focus-visible:w-6 sm:block"
                  aria-hidden
                />
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-fullscreen__foot mt-8 border-t border-white/10 pt-6">
          <a
            href={unwrap(site.phoneHref)}
            className="block font-display text-2xl text-komatsu-yellow transition hover:text-white sm:text-3xl"
            onClick={() => {
              track("phone_click", { source: "mobile_nav" });
              onClose();
            }}
          >
            <Placeholder value={site.phone} />
          </a>
        </div>
      </div>
    </nav>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const headerSurface = open
    ? "border-white/10 bg-[#1D1B18]"
    : scrolled
      ? "border-white/10 bg-void/90 backdrop-blur-md"
      : "border-transparent bg-transparent backdrop-blur-none";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${headerSurface}`}
      >
        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4 md:px-8">
          <Link
            href="#hero"
            className="flex shrink-0 items-center"
            aria-label={`${siteConfig.name} – úvod`}
            onClick={close}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG */}
            <img
              src="/brand/zemtar-logo.svg"
              alt={siteConfig.name}
              height={24}
              className="h-4 w-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] sm:h-6"
            />
          </Link>

          <nav
            className="hidden items-center gap-5 xl:flex"
            aria-label="Hlavní navigace"
          >
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm text-white/80 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
            <a
              href={unwrap(site.phoneHref)}
              className={`hidden text-sm font-medium text-white md:inline ${open ? "!hidden" : ""}`}
              onClick={() => track("phone_click", { source: "header" })}
            >
              <Placeholder value={site.phone} />
            </a>
            <Button
              href="#kontakt"
              className="!px-2.5 !py-2 text-xs whitespace-nowrap sm:!px-3 md:!px-4"
              onClick={() => {
                track("cta_click", { source: "header" });
                close();
              }}
            >
              {site.hero.cta}
            </Button>
            <button
              type="button"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-line xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Zavřít menu" : "Otevřít menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Zavřít" : "Menu"}</span>
              <span className="relative block h-3.5 w-5" aria-hidden>
                <span
                  className={`absolute left-0 top-0 block h-0.5 w-5 bg-white transition duration-200 ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[6px] block h-0.5 w-5 bg-white transition duration-200 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[12px] block h-0.5 w-5 bg-white transition duration-200 ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
        <ScrollProgress />
      </header>

      {mounted && open
        ? createPortal(<FullscreenNav onClose={close} />, document.body)
        : null}
    </>
  );
}

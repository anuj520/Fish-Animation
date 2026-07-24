"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";

const HERO_MEDIA = ["/images/herotexture.jpg.jpeg"];

const STAGE_LABELS = {
  experience: "Loading experience",
  fish: "Adding fish",
  animation: "Adding animation",
  water: "Adding water",
  lights: "Adding lights",
  reveal: "Preparing reveal",
} as const;

type LoaderStageKey = keyof typeof STAGE_LABELS;

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const image = new Image();

    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });

const simplifyItemLabel = (item: string) => {
  if (!item) {
    return "Preparing scene";
  }

  const normalized = item.split("?")[0].split("/").at(-1) ?? item;

  return normalized
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
};

const resolveStageKey = (item: string, progress: number): LoaderStageKey => {
  const lowerItem = item.toLowerCase();

  if (lowerItem.includes("water")) return "water";
  if (lowerItem.includes("env") || lowerItem.includes("sunset") || lowerItem.includes("hdr")) {
    return "lights";
  }
  if (lowerItem.includes("butterfly")) return "animation";
  if (lowerItem.includes("clown") || lowerItem.endsWith(".glb")) return "fish";
  if (progress >= 96) return "reveal";
  if (progress >= 78) return "lights";
  if (progress >= 58) return "water";
  if (progress >= 34) return "animation";
  if (progress >= 16) return "fish";

  return "experience";
};

interface SitePreloaderProps {
  onReadyChange: (ready: boolean) => void;
}

export default function SitePreloader({ onReadyChange }: SitePreloaderProps) {
  const { active, item, loaded, progress, total } = useProgress();
  const [pageAssetsReady, setPageAssetsReady] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const hasTrackedThreeAssets = total > 0 || loaded > 0 || Boolean(item);
  const normalizedProgress = Math.max(4, Math.min(100, Math.round(progress)));
  const activeStageKey = useMemo(
    () => resolveStageKey(item, normalizedProgress),
    [item, normalizedProgress]
  );

  useEffect(() => {
    let cancelled = false;

    const fontReady =
      "fonts" in document ? document.fonts.ready.catch(() => undefined) : Promise.resolve();

    Promise.all([fontReady, ...HERO_MEDIA.map(preloadImage)]).then(() => {
      if (!cancelled) {
        setPageAssetsReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;

    if (isVisible) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!hasTrackedThreeAssets || !pageAssetsReady || active || progress < 100) {
      return;
    }

    const readyTimer = window.setTimeout(() => {
      setIsReady(true);
    }, 250);

    return () => {
      window.clearTimeout(readyTimer);
    };
  }, [active, hasTrackedThreeAssets, pageAssetsReady, progress]);

  useEffect(() => {
    onReadyChange(isReady);
  }, [isReady, onReadyChange]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, 450);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [isReady]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      aria-label="Loading the hero experience"
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-[#030712] text-white transition-opacity duration-500 ${
        isReady ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-sm px-6 text-center">
        <div className="mx-auto mb-5 h-12 w-12 rounded-full border border-white/15 bg-white/5">
          <div className="loader-ring h-full w-full rounded-full border border-cyan-200/35" />
        </div>

        <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">Academy X</p>
        <p className="mt-3 text-base text-white/88">{STAGE_LABELS[activeStageKey]}</p>
        <p className="mt-2 text-sm text-white/45">{simplifyItemLabel(item)}</p>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-white transition-[width] duration-300"
            style={{ width: `${normalizedProgress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/40">
          <span>{normalizedProgress}%</span>
          <span>{total > 0 ? `${loaded}/${total}` : "..."}</span>
        </div>
      </div>
    </div>
  );
}

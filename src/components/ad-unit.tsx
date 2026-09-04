import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const AD_CLIENT = "ca-pub-6788262712245888";

type AdUnitProps = {
  /** AdSense ad slot id. Defaults to the configured "Ad1D" unit. */
  slot?: string;
  className?: string;
};

/**
 * Renders a Google AdSense display ad unit. The loader script is injected
 * site-wide from the root route's head config; this component only mounts the
 * <ins> element and asks AdSense to fill it once, after hydration.
 */
export function AdUnit({ slot = "5285482195", className }: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    if (typeof window === "undefined") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (error) {
      console.error("[v0] adsbygoogle push failed", error);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle${className ? ` ${className}` : ""}`}
      style={{ display: "block" }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

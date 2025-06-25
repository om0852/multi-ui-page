"use client";

import { useEffect, useRef } from "react";

// Fix: Declare adsbygoogle on window
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type Props = {
  slot: string;                 // Your data-ad-slot
  format?: string;              // e.g. "auto"
  className?: string;           // Tailwind/CSS class
  style?: React.CSSProperties;  // Optional inline styles
};

export default function AdUnit({
  slot,
  format = "auto",
  className = "",
  style = {},
}: Props) {
  const adRef = useRef(null);

  useEffect(() => {
    // Safe check: only push after AdSense script is available
    if (typeof window !== "undefined" && window.adsbygoogle && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense push error:", err);
      }
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block", ...style }}
      data-ad-client="ca-pub-7125097812565053"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
      ref={adRef as any}
    />
  );
}

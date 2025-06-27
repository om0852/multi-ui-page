"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/* TS helper so push() is recognised */
declare global {
  interface Window { adsbygoogle: unknown[]; }
}

export default function AdsContext() {
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null);
  /* ───────────────────────────────────── */
  /* push AFTER script is loaded & width >0 */
  /* ───────────────────────────────────── */
  useEffect(() => {
    const tryPush = () => {
      if (
        window.adsbygoogle &&
        adRef.current &&
        adRef.current.getAttribute("data-adsbygoogle-status") !== "done" &&
        adRef.current.offsetWidth > 0
      ) {
        try {
          window.adsbygoogle.push({});
        } catch (e) {
          console.error("AdSense push error", e);
        }
      }
    };

    /* If the library is already on the page, push immediately */
    if (window.adsbygoogle) {
      tryPush();
    } else {
      /* Wait for script load once, then push */
      const script = document.querySelector<HTMLScriptElement>(
        'script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
      );
      const onLoad = () => {
        tryPush();
        script?.removeEventListener("load", onLoad);
      };
      script?.addEventListener("load", onLoad);
    }
  }, [pathname]);

  /* key = url → React will remount on navigation, so we never reuse a filled slot */
  const key = pathname ;

  return (
    <div className="my-4 overflow-hidden">
      <ins
        ref={adRef}
        key={key}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7125097812565053"
        data-ad-slot="6155612091"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

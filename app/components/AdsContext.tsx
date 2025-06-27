"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const AdsContext = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log("adsence component ", url);
    const scriptElement = document.querySelector(
      'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7125097812565053"]'
    );
    const handleScript = () => {
      try {
        if (window.adsbygoogle) {
          console.log("pushing ads");
          window.adsbygoogle.push({});
        } else {
          scriptElement.addEventListener("load", handleScript);
          console.log("waiting until adsence lib is loaded");
        }
      } catch (error) {
        console.log("error in adsence", error);
      }
    };
    handleScript();
    return () => {
      if (scriptElement) {
        scriptElement.removeEventListener("load", handleScript);
      }
    };
  }, [pathname, searchParams]);
  return (
    <div style={{ overflow: "hidden", margin: "5px" }}>
      ggogle ad block
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7125097812565053"
        data-ad-slot="6155612091"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdsContext;

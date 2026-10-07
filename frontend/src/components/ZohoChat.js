"use client";

import { useEffect } from "react";

export default function ZohoChat() {
  useEffect(() => {
    let loaded = false;
    const injectZohoScript = () => {
      if (loaded) return;
      loaded = true;
      const d = document;
      if (d.getElementById("zohosalesiq-script")) return;
      const s = d.createElement("script");
      s.id = "zohosalesiq-script";
      s.src =
        "https://salesiq.zohopublic.com/widget?wc=siq9902d9da017d32a3f94cf3449967b1b27d5bddc6e41af6813991b4f97a43b361";
      s.defer = true;
      d.body.appendChild(s);

      window.$zoho = window.$zoho || {};
      window.$zoho.salesiq = window.$zoho.salesiq || { ready: function () {} };

      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", triggerOnIdle);
      window.removeEventListener("touchstart", triggerOnIdle);
      window.removeEventListener("click", triggerOnIdle);
    };

    // Defer loading on mobile to ensure critical hydration and initial paint complete first
    const triggerOnIdle = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          setTimeout(injectZohoScript, 1200);
        });
      } else {
        setTimeout(injectZohoScript, 1500);
      }
    };

    window.addEventListener("scroll", triggerOnIdle, { passive: true, once: true });
    window.addEventListener("touchstart", triggerOnIdle, { passive: true, once: true });
    window.addEventListener("click", triggerOnIdle, { passive: true, once: true });

    // Fallback timer if user doesn't interact (only loads when idle)
    const timer = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(injectZohoScript);
      } else {
        injectZohoScript();
      }
    }, 8000);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  return null;
}

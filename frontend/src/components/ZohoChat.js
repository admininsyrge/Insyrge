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

      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("click", onUserInteraction);
    };

    const onUserInteraction = () => {
      injectZohoScript();
    };

    window.addEventListener("scroll", onUserInteraction, { passive: true, once: true });
    window.addEventListener("touchstart", onUserInteraction, { passive: true, once: true });
    window.addEventListener("click", onUserInteraction, { passive: true, once: true });

    const timer = setTimeout(injectZohoScript, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("click", onUserInteraction);
    };
  }, []);

  return null;
}

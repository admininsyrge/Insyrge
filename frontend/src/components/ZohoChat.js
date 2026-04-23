"use client";

import { useEffect } from "react";

export default function ZohoChat() {
  useEffect(() => {
    (function () {
      const d = document;
      const s = d.createElement("script");
      s.src =
        "https://salesiq.zohopublic.com/widget?wc=siq9902d9da017d32a3f94cf3449967b1b27d5bddc6e41af6813991b4f97a43b361";
      s.defer = true;
      d.body.appendChild(s);

      window.$zoho = window.$zoho || {};
      window.$zoho.salesiq = window.$zoho.salesiq || { ready: function () {} };
    })();
  }, []);

  return null;
}

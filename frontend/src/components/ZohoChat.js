"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MessageSquareText } from "lucide-react";

export default function ZohoChat() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const injectZohoScript = useCallback((autoOpen = false) => {
    if (typeof window === "undefined") return;
    if (document.getElementById("zohosalesiq-script")) {
      if (autoOpen && window.$zoho?.salesiq?.chat) {
        try {
          window.$zoho.salesiq.chat.start();
        } catch (_) {}
      }
      return;
    }

    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || {
      ready: function () {
        setIsScriptLoaded(true);
        if (autoOpen) {
          try {
            window.$zoho.salesiq.chat.start();
          } catch (_) {}
        }
      },
    };

    const s = document.createElement("script");
    s.id = "zohosalesiq-script";
    s.src =
      "https://salesiq.zohopublic.com/widget?wc=siq9902d9da017d32a3f94cf3449967b1b27d5bddc6e41af6813991b4f97a43b361";
    s.defer = true;
    s.async = true;
    s.onload = () => {
      setIsScriptLoaded(true);
    };
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile =
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setIsMobile(checkMobile);

    // Respect Data Saver mode or slow 2G/3G connections
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSaveData = conn?.saveData;
    const isSlowConnection = conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";

    if (isSaveData || isSlowConnection) {
      // Don't auto-load 2MB of chat scripts on constrained mobile networks; load only on click
      return;
    }

    if (checkMobile) {
      // 📱 On mobile: Never inject on first touch. Defer until page is completely idle (7s+)
      const idleTimer = setTimeout(() => {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(() => injectZohoScript(false));
        } else {
          injectZohoScript(false);
        }
      }, 7500);

      return () => clearTimeout(idleTimer);
    } else {
      // 💻 On desktop: Load lazily after first user interaction with reasonable debounce
      let triggered = false;
      const onDesktopInteraction = () => {
        if (triggered) return;
        triggered = true;
        cleanupDesktop();
        setTimeout(() => {
          if ("requestIdleCallback" in window) {
            window.requestIdleCallback(() => injectZohoScript(false));
          } else {
            injectZohoScript(false);
          }
        }, 2500);
      };

      const cleanupDesktop = () => {
        window.removeEventListener("scroll", onDesktopInteraction);
        window.removeEventListener("click", onDesktopInteraction);
      };

      window.addEventListener("scroll", onDesktopInteraction, { passive: true, once: true });
      window.addEventListener("click", onDesktopInteraction, { passive: true, once: true });

      // Fallback desktop timer (8s)
      const desktopTimer = setTimeout(() => {
        if (!triggered) {
          cleanupDesktop();
          injectZohoScript(false);
        }
      }, 8000);

      return () => {
        clearTimeout(desktopTimer);
        cleanupDesktop();
      };
    }
  }, [injectZohoScript]);

  // If the heavy script is already loaded and active, let SalesIQ take over completely
  if (isScriptLoaded) return null;

  // On mobile or before SalesIQ loads, show an ultra-lightweight 0-KB overhead launcher
  if (isMobile) {
    return (
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => injectZohoScript(true)}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#081b33] text-white border border-[#08e5c0]/50 shadow-[0_4px_20px_rgba(8,229,192,0.35)] active:scale-95 transition-all"
          aria-label="Open Live Chat Consultation"
        >
          <span className="w-2 h-2 rounded-full bg-[#08e5c0] animate-pulse" />
          <MessageSquareText className="w-4 h-4 text-[#08e5c0]" />
          <span className="text-xs font-bold text-white tracking-wide">
            Chat with us
          </span>
        </button>
      </div>
    );
  }

  return null;
}

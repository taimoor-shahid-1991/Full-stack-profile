"use client";

import { useEffect } from "react";

export default function AosInit() {
  useEffect(() => {
    import("aos").then(({ default: AOS }) => {
      AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 60,
      });

      if (document.readyState === "complete") {
        AOS.refreshHard();
      } else {
        window.addEventListener("load", () => AOS.refreshHard(), { once: true });
      }
    });
  }, []);

  return null;
}

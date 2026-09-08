"use client";

import { useEffect, useState } from "react";

export default function StickyInterestAction({ styles }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function update() {
      const form = document.getElementById("apply");
      const formRect = form?.getBoundingClientRect();
      const formVisible = formRect && formRect.top < window.innerHeight * .82 && formRect.bottom > 0;
      setVisible(window.scrollY > window.innerHeight * .72 && !formVisible);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a className={`${styles.stickyAction} ${visible ? styles.stickyVisible : ""}`} href="#apply">
      Request the private overview
    </a>
  );
}

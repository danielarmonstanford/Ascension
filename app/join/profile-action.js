"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfileAction({ className, href: initialHref = "/profile" }) {
  const [href, setHref] = useState(initialHref);

  useEffect(() => {
    const query = window.location.search;
    setHref(query ? `/profile${query}` : "/profile");
  }, []);

  return <Link className={className} href={href} data-analytics-event="profile_cta_click">Discover Your Pathway<span aria-hidden="true">→</span></Link>;
}

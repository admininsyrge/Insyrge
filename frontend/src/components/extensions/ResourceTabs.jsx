"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ResourceTabs({ slug, resources }) {
  const pathname = usePathname();

  return (
    <div className="resource-tabs">
      <Link
        href={`/extensions/${slug}`}
        className={`resource-tab ${
          pathname === `/extensions/${slug}` ? "active" : ""
        }`}
      >
        Details
      </Link>
      {resources.map((resource) => {
        const fullPath = `/extensions/${slug}/${resource.path}`;
        const isActive = pathname === fullPath;

        return (
          <Link
            key={resource.key}
            href={fullPath}
            className={`resource-tab ${isActive ? "active" : ""}`}
          >
            {resource.label}
          </Link>
        );
      })}
    </div>
  );
}

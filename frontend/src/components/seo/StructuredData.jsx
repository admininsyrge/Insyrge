import React from "react";

/**
 * Renders JSON-LD structured data for Google Search rich snippets.
 * @param {{ data: object | object[] }} props
 */
export default function StructuredData({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import PortfolioClient from "./PortfolioClient";

// ✅ SEO Metadata
export const metadata = {
  title: "Portfolio | Insyrge Consultancy",
  description:
    "Explore Insyrge Consultancy's diverse portfolio showcasing innovative digital solutions, Zoho integrations, and enterprise-grade software built to transform businesses.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}

import ServicesClient from "./ServicesClient";

// ✅ SEO Metadata
export const metadata = {
  title: "Our Services | Insyrge Consultancy",
  description:
    "Discover Insyrge Consultancy's comprehensive range of business automation and Zoho integration services. Empower your operations with intelligent digital transformation.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}

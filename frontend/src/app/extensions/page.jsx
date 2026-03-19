import ExtensionsClient from "./ExtensionsClient";

// ✅ Server-side metadata
export const metadata = {
  title: "Zoho Extensions | Insyrge Consultancy",
  description:
    "Explore our range of powerful Zoho Extensions — custom-built solutions to enhance your business workflows, efficiency, and automation.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function ExtensionsPage() {
  return <ExtensionsClient />;
}

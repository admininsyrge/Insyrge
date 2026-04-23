import ContactClient from "./ContactClient";

// ✅ Server-side metadata
export const metadata = {
  title: "Contact Us | Insyrge Consultancy",
  description:
    "Get in touch with Insyrge Consultancy for expert guidance in business automation, Zoho integration, and tech innovation. Let’s build your next success story together.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

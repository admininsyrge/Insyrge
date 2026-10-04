import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserContext";
import ZohoChat from "@/components/ZohoChat";
import Script from "next/script";

import StructuredData from "@/components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://insyrge.com/#organization",
      name: "Insyrge",
      url: "https://insyrge.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://insyrge.com/#logo",
        url: "https://insyrge.com/logo.png",
        caption: "Insyrge Logo",
      },
      description:
        "Insyrge is an enterprise-grade IT consultancy and digital engineering firm specializing in strategic IT advisory, custom software engineering, cloud architecture, AI automation, and enterprise systems integration.",
      telephone: "+91-7973837217",
      email: "info@insyrge.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unit 40, 8–10 Fourth Avenue",
        addressLocality: "Blacktown",
        addressRegion: "NSW",
        postalCode: "2148",
        addressCountry: "AU",
      },
      sameAs: [
        "https://www.linkedin.com/company/insyrge/",
        "https://instagram.com/insyrge",
        "https://x.com/insyrge",
        "https://facebook.com/insyrge",
      ],
      knowsAbout: [
        "Enterprise IT Consulting",
        "Custom Software Development",
        "Cloud Architecture & DevOps",
        "AI & Workflow Automation",
        "Data Analytics & BI",
        "Zoho CRM & Ecosystem",
        "System Integration",
        "Cybersecurity & Infrastructure",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://insyrge.com/#website",
      url: "https://insyrge.com",
      name: "Insyrge",
      publisher: {
        "@id": "https://insyrge.com/#organization",
      },
    },
  ],
};

export const metadata = {
  metadataBase: new URL("https://insyrge.com"),
  title: {
    default: "Insyrge | Enterprise IT Consultancy, Custom Software & Cloud Solutions",
    template: "%s | Insyrge",
  },
  description:
    "Scale your business with full-spectrum IT consulting, custom software development, cloud infrastructure, AI automation, and enterprise CRM/ERP solutions by Insyrge. Book a free consultation.",
  authors: [{ name: "Insyrge", url: "https://insyrge.com" }],
  creator: "Insyrge",
  publisher: "Insyrge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Insyrge | Enterprise IT Consultancy, Custom Software & Cloud Solutions",
    description:
      "Scale your business with full-spectrum IT consulting, custom software development, cloud infrastructure, AI automation, and enterprise CRM/ERP solutions by Insyrge.",
    url: "https://insyrge.com",
    siteName: "Insyrge",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Insyrge - Enterprise IT Consulting & Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insyrge | Enterprise IT Consultancy, Custom Software & Cloud Solutions",
    description:
      "Scale your business with full-spectrum IT consulting, custom software development, cloud infrastructure, AI automation, and enterprise CRM/ERP solutions by Insyrge.",
    images: ["/logo.png"],
    creator: "@insyrge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "m2zFuQ1KJU1S3PDupioeQvzXHc77eICXja6GJtrqBA4",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <StructuredData data={organizationSchema} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#08e5c0] focus:text-[#081b33] focus:font-bold focus:rounded-md focus:shadow-xl"
        >
          Skip to main content
        </a>
        <Header />
        <UserProvider>
          <main id="main-content">{children}</main>
        </UserProvider>
        <Footer />
        <ZohoChat />
        <Script
          id="zoho-pagesense"
          src="https://cdn.pagesense.io/js/851039329/fe82d17f52e84f93bcbfafeffc63b037.js"
          strategy="lazyOnload"
        />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-HWKVQWKL99"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-HWKVQWKL99');
          `}
        </Script>
      </body>
    </html>
  );
}


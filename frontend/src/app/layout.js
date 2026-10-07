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
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});


const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://insyrge.com/#organization",
      name: "Insyrge",
      legalName: "Insyrge Pty Ltd",
      url: "https://insyrge.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://insyrge.com/#logo",
        url: "https://insyrge.com/logo.png",
        caption: "Insyrge Logo",
      },
      description:
        "Insyrge is a certified Zoho consulting partner and solutions architecture firm delivering enterprise Zoho CRM and Zoho One implementations, custom Deluge scripting, third-party API integrations, and AI workflow automation.",
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
        "Zoho CRM Consulting",
        "Zoho CRM Implementation",
        "Zoho CRM Customization",
        "Zoho CRM Automation",
        "Zoho One Architecture",
        "Business Process Automation",
        "Deluge Scripting",
        "REST API & Webhook Integrations",
        "AI Workflow Automation & Intelligent Agents",
        "CRM Migration (Salesforce, HubSpot)",
        "Solutions Architecture",
        "Zoho Creator Applications",
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#081b33",
};

export const metadata = {
  metadataBase: new URL("https://insyrge.com"),
  title: {
    default: "Insyrge | Zoho CRM Consulting, Implementation & Business Automation",
    template: "%s | Insyrge",
  },
  description:
    "Scale your business with certified Zoho CRM consulting, Zoho One architecture, Deluge automation, API integrations, and practical AI solutions by Insyrge. Book a free consultation.",
  authors: [{ name: "Insyrge", url: "https://insyrge.com" }],
  creator: "Insyrge",
  publisher: "Insyrge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Insyrge | Zoho CRM Consulting, Implementation & Business Automation",
    description:
      "Scale your business with certified Zoho CRM consulting, Zoho One architecture, Deluge automation, API integrations, and practical AI solutions by Insyrge.",
    url: "https://insyrge.com",
    siteName: "Insyrge",
    images: [
      {
        url: "/images/hero-automation-dashboard.jpg",
        width: 1200,
        height: 675,
        alt: "Insyrge - Zoho CRM & Business Automation Consulting",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insyrge | Zoho CRM Consulting, Implementation & Business Automation",
    description:
      "Scale your business with certified Zoho CRM consulting, Zoho One architecture, Deluge automation, API integrations, and practical AI solutions by Insyrge.",
    images: ["/images/hero-automation-dashboard.jpg"],
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
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://api.insyrge.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.insyrge.com" />
        <link rel="preconnect" href="https://cdn.pagesense.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.pagesense.io" />
        <link rel="dns-prefetch" href="https://salesiq.zohopublic.com" />
        <StructuredData data={organizationSchema} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full overflow-x-hidden min-h-screen flex flex-col`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#08e5c0] focus:text-[#081b33] focus:font-bold focus:rounded-md focus:shadow-xl"
        >
          Skip to main content
        </a>
        <Header />
        <UserProvider>
          <main id="main-content" className="flex-1 w-full overflow-x-hidden">{children}</main>
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


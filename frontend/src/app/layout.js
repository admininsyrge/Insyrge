import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserContext"; // ✅ import context provider
import ZohoChat from "@/components/ZohoChat";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Insyrge",
  description: "Insyrge Consultancy Service | Be the Rising",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="m2zFuQ1KJU1S3PDupioeQvzXHc77eICXja6GJtrqBA4"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="relative">
          <Header />
        </header>

        <UserProvider>
          <main>{children}</main>
        </UserProvider>

        <Footer />
        <ZohoChat />

        {/* ✅ Zoho PageSense Script */}
        <Script
          id="zoho-pagesense"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        (function(w,s){
          var e=document.createElement("script");
          e.type="text/javascript";
          e.async=true;
          e.src="https://cdn.pagesense.io/js/851039329/fe82d17f52e84f93bcbfafeffc63b037.js";
          var x=document.getElementsByTagName("script")[0];
          x.parentNode.insertBefore(e,x);
        })(window,"script");
      `,
          }}
        />
      </body>
    </html>
  );
}

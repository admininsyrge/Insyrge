export default function manifest() {
  return {
    name: "Insyrge - Enterprise IT Consulting & Zoho Solutions",
    short_name: "Insyrge",
    description:
      "Enterprise IT consultancy, custom software engineering, cloud architecture, and Zoho business automation.",
    start_url: "/",
    display: "standalone",
    background_color: "#071831",
    theme_color: "#08e5c0",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

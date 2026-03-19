import BlogPageClient from "./BlogClient";

export const metadata = {
  title: "Blogs | Insyrge Consultancy",
  description:
    "Explore expert insights, guides, and case studies from Insyrge Consultancy. Stay updated with the latest trends in business automation and technology.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function BlogsPage() {
  return <BlogPageClient />;
}

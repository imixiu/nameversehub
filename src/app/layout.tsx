import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NameverseHub - Discover the Story Behind Every Name",
  description: "Explore 105,000+ name meanings and origins, backed by real US Social Security data from 1880-2025.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

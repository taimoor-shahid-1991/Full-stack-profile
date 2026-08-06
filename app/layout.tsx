import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

import BackToTop from "@/components/BackToTop";
import BootstrapClient from "@/components/BootstrapClient";
import AosInit from "@/components/AosInit";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Taimoor Shahid | Full Stack Developer",
  description:
    "Taimoor Shahid is a Full Stack Developer specializing in building modern, responsive, and high-performance web applications.",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body>
        {children}
        <BackToTop />
        <BootstrapClient />
        <AosInit />
      </body>
    </html>
  );
}

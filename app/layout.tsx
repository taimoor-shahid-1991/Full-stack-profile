import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

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
    icon: "/images/favicon.webp",
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
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#161a24",
              color: "#ffffff",
              border: "1px solid #262b38",
              borderRadius: "10px",
              fontSize: "0.9rem",
            },
            success: {
              iconTheme: { primary: "#ff5e2e", secondary: "#161a24" },
            },
            error: {
              iconTheme: { primary: "#e0455f", secondary: "#161a24" },
            },
          }}
        />
      </body>
    </html>
  );
}

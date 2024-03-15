import { Navigation } from "@/components/Navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend, Quicksand } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });
export { quicksand, lexend };

export const metadata: Metadata = {
  title: "manczak.net",
  description: "Jakub Mańczak, Poznań.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col items-center bg-neutral-900 text-neutral-50 ${quicksand.className}`}
      >
        <Navigation />
        {children}
        <p className="my-4 mt-auto text-neutral-500 font-medium">
          &copy; Jakub Mańczak {"("}2019 - {new Date().getFullYear()}
          {")"}
        </p>
      </body>
    </html>
  );
}

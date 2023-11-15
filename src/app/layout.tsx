import { Navigation } from "@/components/Navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Lato, Lexend, Quicksand, Roboto_Slab } from "next/font/google";

// const robotoslab = Roboto_Slab({ subsets: ["latin"] });
// const lato = Lato({
//   subsets: ["latin", "latin-ext"],
//   weight: ["100", "300", "400", "700", "900"],
// });
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
        className={`
          ${quicksand.className} min-h-screen flex flex-col items-center
          bg-neutral-900 text-neutral-50
        `}
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

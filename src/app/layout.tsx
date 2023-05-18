"use client";
import { Navigation } from "@/components/Navigation";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <ThemeProvider
          disableTransitionOnChange
          themes={["system", "light", "dark"]}
          attribute="class"
        >
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

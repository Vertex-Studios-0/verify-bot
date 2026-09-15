import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discord Verification",
  description: "Secure Discord server verification"
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
    {children}
  </body></html>;
}
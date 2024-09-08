import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "LearnStack",
  description: "Get Unlimited PDF, Files OF IIT-JEE, NEET, NCERT, StateBoard & More...",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="ezoic-site-verification" content="vnbFbSJk8gYdd4cyjVj6nbCOccis79" />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8795170955289937"
            crossOrigin="anonymous"></script>
          <script type="application/ld+json">
            {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "LearnStack",
              "description": "Get Unlimited PDF, Files OF IIT-JEE, NEET, NCERT, StateBoard & More...",
              "url": "https://www.learnstack.in.net",
              "keywords": ["IIT-JEE", "NEET", "NCERT", "StateBoard", "PDF Files"],
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.learnstack.in.net"
              }
            }
            `}
          </script>
        </head>
        <body className={outfit.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

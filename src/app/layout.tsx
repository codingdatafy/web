/**
 * @project CodingDatafy
 * @license MIT
 * @copyright 2026 CodingDatafy Organization
 * @author CodingDatafy Team
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "@/styles/codingdatafy.css";
import AnalyticsWrapper from "./AnalyticsWrapper"; 

/**
 * CONSOLIDATED SITE METADATA
 */
export const metadata: Metadata = {
  description: "To build the world's largest reference for coding languages.",
  metadataBase: new URL('https://www.codingdatafy.com'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'KZMiUBpTZfkZsUt47NLT88ssUsu9hFOez6aaHVBvLqg',
  },
  title: {
    template: "%s - CodingDatafy",
    default: "CodingDatafy - Documentation", 
  },
  icons: {
    icon: '/images/favicon.png',
  },
};

/**
 * ROOT LAYOUT COMPONENT
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * STRUCTURED DATA (JSON-LD)
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CodingDatafy",
    "url": "https://www.codingdatafy.com",
    "logo": "https://www.codingdatafy.com/images/logo.png",
    "sameAs": [
      "https://github.com/codingdatafy",
      "https://x.com/codingdatafy",
      "https://facebook.com/codingdatafy"
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* INJECTING STRUCTURED DATA FOR SEARCH ENGINES */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div>
          {/* APPLICATION HEADER */}
          <header>
            <Link href="/">
              <Image 
                src="/images/logo.png" 
                alt="CodingDatafy Logo" 
                width={368} 
                height={77} 
                priority
              />
            </Link>
            <nav>
              <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/languages">Languages</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </nav>
          </header>

          {/* MAIN CONTENT AREA */}
          <main>
            {children}
          </main>

          {/* APPLICATION FOOTER */}
          <footer>
            <nav>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/terms-of-use">Terms of Use</Link></li>
                <li><Link href="/privacy-policy">Privacy policy</Link></li>
                <li><Link href="/contribute">Contribute</Link></li>
              </ul>
            </nav>
            
            <ul>
              <li>
                <a href="https://github.com/codingdatafy" target="_blank" rel="noopener noreferrer">
                  <Image 
                    src="/images/github.png" 
                    alt="GitHub" 
                    width={32} 
                    height={32} 
                    loading="lazy" 
                  />
                </a>
              </li>
            </ul>

            <p>
              <small>Copyright © 2026 <strong>CodingDatafy</strong>. All Rights Reserved.</small>
            </p>
          </footer>
        </div>

        {/* PERFORMANCE & ANALYTICS */}
        <AnalyticsWrapper />
        
        {/* EXTERNAL CORE SCRIPTS */}
        <script src="/scripts/codingdatafy.js" defer></script>
      </body>
    </html>
  );
}
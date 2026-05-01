/**
 * @project CodingDatafy
 * @license MIT
 * @copyright 2026 CodingDatafy Organization
 * @author CodingDatafy Team
 */

import Link from 'next/link';
import React from 'react';
import type { Metadata } from 'next';

/**
 * 1. STATIC METADATA
 */
export const metadata: Metadata = {
  title: "404 - Page Not Found | CodingDatafy",
  description: "The coding documentation page you requested could not be found.",
  robots: { index: false, follow: true },
};

/**
 * NOT FOUND COMPONENT (404 Error Page)
 */
export default function NotFound(): React.JSX.Element {
  return (
    <div>
      <main>
        <article>
          <header>
            <h1>404</h1>
            <h2>Page Not Found</h2>
          </header>
          
          <div>
            <p>
              Oops! The documentation page you are looking for doesn't exist or has been moved to a new directory.
            </p>
            
            <nav>
              <Link href="/">
                Return to Homepage
              </Link>
              
              <span>or</span>
              
              <Link href="/languages">
                Explore Languages
              </Link>
            </nav>
          </div>

          <footer>
            <hr />
            <p>
              <small>© 2026 CodingDatafy Organization</small>
            </p>
          </footer>
        </article>
      </main>
    </div>
  );
}
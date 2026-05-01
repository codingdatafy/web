/**
 * @project CodingDatafy
 * @license MIT
 * @copyright 2026 CodingDatafy Organization
 * @author CodingDatafy Team
 */

'use client';

import { useEffect, startTransition } from 'react';

/**
 * GLOBAL ERROR BOUNDARY
 */
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): React.JSX.Element {
  useEffect(() => {
    console.error("CodingDatafy Runtime Error:", error);
  }, [error]);

  const handleReset = () => {
    startTransition(() => {
      reset();
    });
  };

  return (
    <div>
      <main>
        <article>
          <header>
            <h1>System Exception Encountered</h1>
          </header>

          <div>
            <p>We apologize, but an unexpected error occurred while processing this request.</p>
            
            {error.digest && (
              <p>
                Diagnostic ID: <code>{error.digest}</code>
              </p>
            )}
            
            <div>
              <button
                onClick={handleReset}
                aria-label="Attempt to recover from error"
              >
                Try again
              </button>
              
              <a href="/">
                Return Home
              </a>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
/**
 * @project CodingDatafy
 * @license MIT
 * @copyright 2026 CodingDatafy Organization
 * @author CodingDatafy Team
 */

import { getPageData, getAllPostSlugs } from "@/lib/markdown";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/**
 * PAGE COMPONENT PROPERTIES
 */
interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

/**
 * STATIC PATH GENERATION
 */
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

/**
 * DYNAMIC METADATA GENERATION
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPageData(slug);
  
  if (!data) return {};

  const title = data.meta.title;
  const description = data.meta.description || "Master coding with CodingDatafy expert-led documentation.";
  const fullUrl = `https://www.codingdatafy.com/${slug?.join('/') || ''}`;

  return {
    title,
    description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'CodingDatafy',
      images: [
        {
          url: '/images/icon.png',
          width: 1200,
          height: 630,
          alt: `CodingDatafy - ${title}`,
        },
      ],
      type: 'article',
    },
  };
}

/**
 * MAIN PAGE RENDERER
 */
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPageData(slug);

  if (!data) notFound();

  return (
    <div>
      {data.meta.style && (
        <link rel="stylesheet" href={`/styles/${data.meta.style}`} precedence="high" />
      )}

      <div>
        {data.sidebarHtml && (
          <aside>
            <nav 
              dangerouslySetInnerHTML={{ __html: data.sidebarHtml }} 
            />
          </aside>
        )}

        <main>
          <article>
            <header>
              <h1>{data.meta.title}</h1>
            </header>
            
            <section
              dangerouslySetInnerHTML={{ __html: data.contentHtml }} 
            />

            <footer>
              <hr />
              <div>
                <p>
                  <small>
                    Published by <strong>CodingDatafy Organization</strong>. 
                    Explore the world's largest reference at <a href={`https://www.codingdatafy.com/${slug?.join('/') || ''}`}>CodingDatafy Documentation</a>.
                  </small>
                </p>
                <p>
                  <small>© 2026 CodingDatafy Organization | Licensed under MIT</small>
                </p>
              </div>
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
}
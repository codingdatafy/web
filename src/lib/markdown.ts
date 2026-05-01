/**
 * @project CodingDatafy
 * @license MIT
 * @copyright 2026 CodingDatafy Organization
 * @author CodingDatafy Team
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

/**
 * PATH CONFIGURATION
 */
const CONTENT_DIRECTORY = path.join(process.cwd(), 'content');

/**
 * PAGE METADATA INTERFACE
 */
export interface PageMetadata {
  title: string;
  description: string;
  style: string | null;
  project?: string;
  license?: string;
  copyright?: string;
  author?: string;
  [key: string]: any; 
}

/**
 * PAGE DATA INTERFACE
 */
export interface PageData {
  slug: string;
  contentHtml: string;
  sidebarHtml: string | null;
  meta: PageMetadata;
}

/**
 * CORE MARKDOWN ENGINE
 */
export async function getPageData(slugArray: string[] | undefined): Promise<PageData | null> {
  const relativePath = slugArray && slugArray.length > 0 ? slugArray.join('/') : 'index';
  
  /**
   * RESOLUTION LOGIC
   */
  let fullPath = path.join(CONTENT_DIRECTORY, relativePath, 'index.md');

  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(CONTENT_DIRECTORY, `${relativePath}.md`);
  }

  if (!fs.existsSync(fullPath)) return null;

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    /**
     * CONTEXTUAL SIDEBAR SEARCH
     */
    let sidebarHtml: string | null = null;
    const currentDir = path.dirname(fullPath);
    const sidebarPath = path.join(currentDir, '_sidebar.md');

    if (fs.existsSync(sidebarPath)) {
      const sidebarFile = fs.readFileSync(sidebarPath, 'utf8');
      const processedSidebar = await remark()
        .use(html, { sanitize: false })
        .process(sidebarFile);
      sidebarHtml = processedSidebar.toString();
    }

    return {
      slug: relativePath,
      contentHtml,
      sidebarHtml,
      meta: {
        title: data.title || 'CodingDatafy',
        description: data.description || 'Professional coding documentation.',
        style: data.style || null,
        project: data.project,
        license: data.license,
        copyright: data.copyright,
        author: data.author,
        ...data 
      },
    };
  } catch (error) {
    console.error(`[CodingDatafy Engine Error]: Failed to parse ${relativePath}`, error);
    return null;
  }
}

/**
 * STATIC ROUTE GENERATOR
 */
export function getAllPostSlugs() {
  const getFiles = (dir: string, allFiles: any[] = []) => {
    if (!fs.existsSync(dir)) return allFiles;

    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const name = path.join(dir, file);
      
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, allFiles);
      } else if (file.endsWith('.md') && !file.startsWith('_')) {
        const relativePath = path.relative(CONTENT_DIRECTORY, name);
        
        const slug = relativePath
          .replace(/\.md$/, '')
          .split(path.sep)
          .filter(segment => segment !== 'index');
        
        allFiles.push({ params: { slug } });
      }
    });
    return allFiles;
  };
  
  return getFiles(CONTENT_DIRECTORY);
}
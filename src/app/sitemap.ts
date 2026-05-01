/**
 * @project CodingDatafy
 * @license MIT
 * @copyright 2026 CodingDatafy Organization
 * @author CodingDatafy Team
 */

import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.codingdatafy.com';
const CONTENT_DIRECTORY = path.join(process.cwd(), 'content');

/**
 * RECURSIVE FILE SCANNER
 */
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    if (!fs.existsSync(dirPath)) return [];

    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else if (
            file.endsWith('.md') && 
            !file.startsWith('_') && 
            !file.startsWith('.')
        ) {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

/**
 * SITEMAP GENERATOR
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const files = getAllFiles(CONTENT_DIRECTORY);

    const sitemapEntries = files.map((filePath) => {
        // 1. Normalize path to relative from content root
        let relativePath = path.relative(CONTENT_DIRECTORY, filePath)
            .replace(/\\/g, '/')
            .replace('.md', '');

        // 2. Handle index files
        if (relativePath === 'index') {
            relativePath = '';
        } else if (relativePath.endsWith('/index')) {
            relativePath = relativePath.slice(0, -6);
        }

        const urlPath = relativePath === '' ? '' : `/${relativePath}`;
        const stats = fs.statSync(filePath);
        
        // 3. Dynamic Priority Logic based on URL depth
        let priority = 0.7;
        if (urlPath === '') {
            priority = 1.0;
        } else if (urlPath.startsWith('/languages')) {
            const depth = urlPath.split('/').filter(Boolean).length;
            // Higher priority for category landing pages
            priority = depth <= 2 ? 0.9 : 0.8;
        }

        return {
            url: `${BASE_URL}${urlPath}`,
            lastModified: stats.mtime,
            changeFrequency: 'weekly' as const,
            priority: priority,
        };
    });

    return sitemapEntries;
}
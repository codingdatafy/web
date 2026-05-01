# Project Overview
CodingDatafy is an open-source documentation engine and knowledge base dedicated to coding languages. The platform is engineered to solve the challenge of fragmented coding references by providing a centralized, high-performance, and scalable repository of technical data.

## Technical Stack
- Domain Name: [www.codingdatafy.com](https://www.codingdatafy.com)
- Framework: Next.js 16 (App Router)
- Language: TypeScript (Strict Mode)
- Content Engine: Markdown-based (Flat-file Architecture)
- Infrastructure: Vercel (Deployment) and Cloudflare (DNS/Security)

## Architecture Overview
Built on the Next.js 16 framework and powered by TypeScript, the project adopts a "Content-as-Code" philosophy. By utilizing a flat-file Markdown architecture instead of traditional databases, CodingDatafy achieves near-instantaneous load times, superior SEO indexing, and a streamlined contribution workflow that allows developers to manage technical content via Git.
The infrastructure is optimized for a hybrid cloud environment, leveraging Vercel for serverless deployment and Cloudflare for edge security and global DNS management.

## Branching Model
We follow a strict branching model to ensure production stability:
- **main**: Reserved for stable production releases only.
- **develop**: The primary integration branch for all new features.
- **feature/**: All work must be performed on a dedicated feature branch created from 'develop' (e.g., `feature/add-python-docs`).

## Contribution Policy
CodingDatafy is built for the global developer community. We follow a professional workflow where every code change is linked to a specific Issue and tracked within our Project Management board on GitHub.

## Licensing
This project is licensed under a dual-licensing model:

- **Software/Source Code:** Licensed under the [MIT License](LICENSE).
- **Documentation & Content:** All content within the `content/` directory is licensed under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) license.

Under this model, you are free to share and adapt the material for any purpose, even commercially, provided that you give **appropriate credit** to CodingDatafy Organization and provide a link to the original source.

Copyright (c) 2026 CodingDatafy Organization.
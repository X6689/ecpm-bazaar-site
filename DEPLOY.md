# Deploy eCPM Bazaar Personal Site

This project is configured as a static Next.js export for Pages/CDN hosting.

## GitHub Pages Custom Domain

The canonical public site is:

```text
https://ecpmbazaar.com/
https://ecpmbazaar.com/demo/
```

Build the custom-domain version without a repo `basePath`:

```bash
npm install
npm run build
```

`public/CNAME` is copied into `out/CNAME` during export so GitHub Pages can bind
the custom domain.

GitHub Pages now serves the custom domain over HTTPS. Keep canonical metadata,
the sitemap, and public links on `https://ecpmbazaar.com/`.

In Squarespace Domains, point the apex domain to GitHub Pages:

```text
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    X6689.github.io
```

Remove conflicting default Squarespace `A` records and the default `www`
record before saving these.

For the old GitHub repository-path URL, use this only as a fallback:

```bash
GITHUB_PAGES_REPO_PATH=true npm run build
```

## Tencent Cloud EdgeOne Pages

1. Push this project to GitHub or Gitee.
2. Open Tencent Cloud EdgeOne Pages.
3. Create a new Pages project and import the repository.
4. Use these build settings:

```text
Framework: Next.js
Install command: npm install
Build command: npm run build
Output directory: out
Node.js version: 20 or 22
```

5. Deploy the project.
6. Use the default EdgeOne Pages URL first. Bind a custom domain later when the
   domain is ready.

## Local Check

```bash
npm install
npm run build
```

After build, the static site is generated in:

```text
out/
```

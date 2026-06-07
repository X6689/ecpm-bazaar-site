# Deploy eCPM Bazaar Personal Site

This project is configured as a static Next.js export for Pages/CDN hosting.

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

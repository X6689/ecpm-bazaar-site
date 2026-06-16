/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = "ecpm-bazaar-site";

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  ...(isGitHubPages
    ? {
        assetPrefix: `/${repoName}/`,
        basePath: `/${repoName}`
      }
    : {})
};

export default nextConfig;

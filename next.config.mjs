/** @type {import('next').NextConfig} */
const useGitHubRepoPath = process.env.GITHUB_PAGES_REPO_PATH === "true";
const repoName = "ecpm-bazaar-site";

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  ...(useGitHubRepoPath
    ? {
        assetPrefix: `/${repoName}/`,
        basePath: `/${repoName}`
      }
    : {})
};

export default nextConfig;

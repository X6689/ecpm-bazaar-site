import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { publicContactEmail, publicContactMailto } from "../lib/site-contact";

const expectedEmail = "xia.business.systems@gmail.com";
const legacyEmails = ["xmmyy168", "xmmyy1688"].map((localPart) => `${localPart}@gmail.com`);
const textExtensions = new Set([".css", ".html", ".js", ".json", ".md", ".ts", ".tsx", ".txt", ".xml"]);

function textFiles(relativeDirectory: string): string[] {
  if (!existsSync(join(process.cwd(), relativeDirectory))) {
    return [];
  }

  return readdirSync(join(process.cwd(), relativeDirectory)).flatMap((entry) => {
    const relativePath = join(relativeDirectory, entry);
    const absolutePath = join(process.cwd(), relativePath);

    if (statSync(absolutePath).isDirectory()) {
      return textFiles(relativePath);
    }

    return textExtensions.has(extname(entry).toLowerCase()) ? [relativePath] : [];
  });
}

function combinedText(relativeDirectories: string[]) {
  return relativeDirectories
    .flatMap(textFiles)
    .map((relativePath) => `${relativePath}\n${readFileSync(join(process.cwd(), relativePath), "utf8")}`)
    .join("\n");
}

const source = combinedText(["app", "lib", "public", "tests", "scripts"]);
const staticExport = combinedText(["out"]);

if (publicContactEmail !== expectedEmail || publicContactMailto !== `mailto:${expectedEmail}`) {
  throw new Error("Public contact constants are not using the approved email address.");
}

for (const legacyEmail of legacyEmails) {
  if (source.includes(legacyEmail) || staticExport.includes(legacyEmail)) {
    throw new Error(`Legacy public contact email remains: ${legacyEmail}`);
  }
}

if (!source.includes(expectedEmail)) {
  throw new Error("The approved public contact email is missing from source files.");
}

if (staticExport && (!staticExport.includes(expectedEmail) || !staticExport.includes(`mailto:${expectedEmail}`))) {
  throw new Error("The static export does not contain the approved email and mailto address.");
}

console.log(`Public contact email check passed: ${expectedEmail}`);

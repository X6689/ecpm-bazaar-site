import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const projectRoot = process.cwd();
const globals = readFileSync(join(projectRoot, "app/globals.css"), "utf8");
const visualSystem = readFileSync(join(projectRoot, "app/visual-system.css"), "utf8");
const productPages = readFileSync(join(projectRoot, "app/product-pages.css"), "utf8");
const resourceVisuals = readFileSync(join(projectRoot, "app/resource-visuals.css"), "utf8");
const footerComponent = readFileSync(join(projectRoot, "app/site-footer.tsx"), "utf8");

test("footer uses a full-width shell with a centered, shrinkable inner container", () => {
  assert.match(globals, /\.site-footer\s*\{[\s\S]*?width:\s*100%;[\s\S]*?\}/);
  assert.match(
    globals,
    /\.site-footer-main\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,[\s\S]*?width:\s*min\(1120px,[\s\S]*?margin-inline:\s*auto;[\s\S]*?\}/
  );
  assert.match(visualSystem, /\.bazaar-page \.site-footer\s*\{[^}]*width:\s*100%;[^}]*\}/);
  assert.match(visualSystem, /\.bazaar-page \.site-footer-main\s*\{[^}]*margin-inline:\s*auto;[^}]*\}/);
});

test("footer columns adapt before their combined minimum widths can overflow", () => {
  assert.match(
    globals,
    /@media \(max-width: 1080px\)[\s\S]*?\.site-footer-main\s*\{[^}]*repeat\(2, minmax\(0, 1fr\)\)[^}]*\}/
  );
  assert.match(
    globals,
    /@media \(max-width: 620px\)[\s\S]*?\.site-footer-main\s*\{[^}]*minmax\(0, 1fr\)[^}]*\}/
  );
  assert.doesNotMatch(globals, /\.site-footer-main\s*\{[^}]*minmax\((260|150|210|220)px/);
});

test("footer content can shrink and long contact text can wrap", () => {
  assert.match(globals, /\.site-footer-main > \*,[\s\S]*?min-width:\s*0;/);
  assert.match(globals, /\.site-footer-email span\s*\{[^}]*overflow-wrap:\s*anywhere;[^}]*\}/);
  assert.match(footerComponent, /<span>\{publicContactEmail\}<\/span>/);
});

test("page-specific footer styles do not restore a constrained outer shell", () => {
  assert.doesNotMatch(productPages, /\.bazaar-demo-page \.site-footer\s*\{[^}]*width:/);
  assert.doesNotMatch(resourceVisuals, /\.bazaar-resource-page \.site-footer-main\s*\{[^}]*width:/);
  assert.doesNotMatch(`${globals}\n${visualSystem}`, /\.site-footer[^,{]*\{[^}]*(overflow-x:\s*hidden|overflow:\s*(hidden|clip))/);
});

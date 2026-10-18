/**
 * Archive the public CustomWeb Pro website without third-party dependencies.
 * Usage: node scripts/collect-content.mjs
 * Requires Node 20+ and Python 3 (standard library HTML parser only).
 * Raw sources and a URL-to-local-asset manifest make every imported item traceable.
 */
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";

const origin = "https://customwebpro.webmastery.tech";
const root = process.cwd();
const research = path.join(root, "research");
const imageDirectory = path.join(root, "public/images/original");
await Promise.all([research, imageDirectory, path.join(research, "raw"), path.join(research, "css")].map((dir) => fs.mkdir(dir, { recursive: true })));
const failures = [];
const requests = [];
const imageSources = new Map();
const aliasSources = new Map();
const pages = [];
const api = {};

const parser = String.raw`
import sys,json,re
from html.parser import HTMLParser
from urllib.parse import urljoin
class Node:
 def __init__(self,tag='',attrs=None,parent=None): self.tag=tag; self.attrs=dict(attrs or []); self.parent=parent; self.children=[]
 def text(self): return re.sub(r'\s+',' ',''.join(c if isinstance(c,str) else c.text()+' ' for c in self.children)).strip()
 def walk(self):
  yield self
  for c in self.children:
   if not isinstance(c,str): yield from c.walk()
 def has(self,word): return word in self.attrs.get('class','').split()
class Parser(HTMLParser):
 def __init__(self): super().__init__(convert_charrefs=True); self.root=Node(); self.current=self.root; self.skip=0
 def handle_starttag(self,tag,attrs):
  n=Node(tag,attrs,self.current);self.current.children.append(n)
  if tag not in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']:self.current=n
 def handle_startendtag(self,tag,attrs): self.handle_starttag(tag,attrs);self.handle_endtag(tag)
 def handle_endtag(self,tag):
  n=self.current
  while n.parent and n.tag!=tag: n=n.parent
  if n.parent:self.current=n.parent
 def handle_data(self,data):
  n=self.current
  while n.parent:
   if n.tag in ['script','style','svg','noscript']:return
   n=n.parent
  self.current.children.append(data)
payload=json.load(sys.stdin);p=Parser();p.feed(payload['html']);nodes=list(p.root.walk());url=payload['url']
def matches(tag):return [n for n in nodes if n.tag==tag]
def record(n):return {'tag':n.tag,'id':n.attrs.get('id'),'class':n.attrs.get('class'),'text':n.text()}
images=[]
for n in matches('img'):
 a=n.attrs;images.append({'url':urljoin(url,a.get('src','')),'alt':a.get('alt',''),'title':a.get('title',''),'width':a.get('width'),'height':a.get('height'),'srcset':a.get('srcset',''),'class':a.get('class','')})
links=[{'url':urljoin(url,n.attrs.get('href','')),'label':n.text(),'href':n.attrs.get('href',''),'ariaLabel':n.attrs.get('aria-label')} for n in matches('a') if n.attrs.get('href')]
out={'url':url,'title':next((n.text() for n in matches('title')),''),'description':next((n.attrs.get('content','') for n in matches('meta') if n.attrs.get('name')=='description'),''),'headings':[record(n) for n in nodes if re.fullmatch('h[1-6]',n.tag)],'paragraphs':[n.text() for n in matches('p') if n.text()],'text':next((n.text() for n in matches('body')),p.root.text()),'images':images,'links':links,'sections':[record(n) for n in nodes if n.attrs.get('id') and n.tag not in ['script','style','svg']],'widgets':[record(n) for n in nodes if n.has('elementor-widget') and n.text()],'testimonials':[record(n) for n in nodes if n.has('elementskit-single-testimonial-slider') or n.has('elementskit-testimonial-slider')],'faq':[record(n) for n in nodes if n.tag=='details' or n.has('elementor-accordion-item') or n.has('e-n-accordion-item')],'forms':[{'action':n.attrs.get('action'),'method':n.attrs.get('method'),'fields':[dict(c.attrs) for c in n.walk() if c.tag in ['input','textarea','select','button']]} for n in matches('form')],'stylesheets':[urljoin(url,n.attrs['href']) for n in matches('link') if n.attrs.get('rel')=='stylesheet' and n.attrs.get('href')]}
for item,n in zip(out['testimonials'],[n for n in nodes if n.has('elementskit-single-testimonial-slider') or n.has('elementskit-testimonial-slider')]):
 descendants=list(n.walk())
 item['author']=next((c.text() for c in descendants if c.has('elementskit-author-name')),'')
 item['country']=next((c.text() for c in descendants if c.has('elementskit-author-des')),'')
 item['quote']=next((c.text() for c in descendants if c.tag=='p'),'')
 item['image']=next((urljoin(url,c.attrs.get('src','')) for c in descendants if c.tag=='img'),'')
 item['stars']=next((sum(1 for c in stars.walk() if c.tag=='li') for stars in descendants if stars.has('elementskit-stars')),None)
for item,n in zip(out['faq'],[n for n in nodes if n.tag=='details' or n.has('elementor-accordion-item') or n.has('e-n-accordion-item')]):
 descendants=list(n.walk());question=next((c.text() for c in descendants if c.tag=='summary'),'')
 item['question']=re.sub(r'^\d+\.\s*','',question)
 item['answer']=n.text().removeprefix(question).strip()
json.dump(out,sys.stdout,ensure_ascii=False)
`;

function parse(html, url) {
  const result = spawnSync("python", ["-c", parser], { input: JSON.stringify({ html, url }), encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(result.stderr || "HTML extraction failed");
  return JSON.parse(result.stdout);
}

function slug(url) {
  const u = new URL(url);
  const pathname = u.pathname.replace(/^\/+|\/+$/g, "").replace(/[^\w.-]+/g, "-") || "index";
  return u.searchParams.has("elementskit_template") ? `${pathname}-template-${u.searchParams.get("elementskit_template")}` : pathname;
}

async function request(url, kind = "source") {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(25000), headers: { "User-Agent": "CustomWebPro-Content-Archive/1.0 (owner-authorized website redesign)" } });
    requests.push({ url, status: response.status, kind, finalUrl: response.url });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response;
  } catch (error) {
    failures.push({ url, kind, error: error.message });
    return null;
  }
}

function addImage(url, source, meta = {}) {
  if (!url || url.startsWith("data:")) return;
  try {
    const normalized = new URL(url, origin);
    if (!/\.(png|jpe?g|webp|gif|svg|avif|ico)$/i.test(normalized.pathname)) return;
    normalized.search = "";
    const key = normalized.href;
    if (!imageSources.has(key)) imageSources.set(key, { url: key, sources: [], ...meta });
    const record = imageSources.get(key);
    if (!record.sources.includes(source)) record.sources.push(source);
    Object.assign(record, meta);
  } catch {}
}

// Public WordPress endpoints expose canonical source images and the complete page list.
for (const type of ["pages", "posts", "media", "categories", "tags"]) {
  api[type] = [];
  for (let page = 1; page <= 20; page += 1) {
    const url = `${origin}/wp-json/wp/v2/${type}?per_page=100&page=${page}`;
    const response = await request(url, `api-${type}`);
    if (!response) break;
    const records = await response.json();
    api[type].push(...records);
    const totalPages = Number(response.headers.get("x-wp-totalpages") || 1);
    if (page >= totalPages) break;
  }
  await fs.writeFile(path.join(research, `wordpress-${type}.json`), JSON.stringify(api[type], null, 2));
  console.log(`Public API: ${type}: ${api[type].length} records`);
}

for (const media of api.media) {
  addImage(media.source_url, "wordpress-media", { wordpressId: media.id, title: media.title?.rendered || "", alt: media.alt_text || "", width: media.media_details?.width, height: media.media_details?.height, attachedTo: media.post });
  for (const size of Object.values(media.media_details?.sizes || {})) {
    if (size.source_url) aliasSources.set(size.source_url, media.source_url);
  }
}

const queue = [origin + "/", ...api.pages.map((p) => p.link), ...api.posts.map((p) => p.link)];
const sitemaps = [origin + "/wp-sitemap.xml"];
const visitedSitemaps = new Set();
for (let i = 0; i < sitemaps.length && i < 20; i += 1) {
  const url = sitemaps[i];
  if (visitedSitemaps.has(url)) continue;
  visitedSitemaps.add(url);
  const response = await request(url, "sitemap");
  if (!response) continue;
  const xml = await response.text();
  await fs.writeFile(path.join(research, "raw", slug(url)), xml);
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replace(/&amp;/g, "&"));
  for (const location of locations) {
    if (location.endsWith(".xml")) sitemaps.push(location);
    else if (new URL(location).origin === origin) queue.push(location);
  }
}

const seenPages = new Set();
const styleUrls = new Set();
for (let i = 0; i < queue.length && seenPages.size < 150; i += 1) {
  let url;
  try {
    const u = new URL(queue[i]);
    u.hash = "";
    const template = u.searchParams.get("elementskit_template");
    u.search = "";
    if (template) u.searchParams.set("elementskit_template", template);
    if (!/\.[a-z0-9]+$/i.test(u.pathname)) u.pathname = u.pathname.replace(/\/?$/, "/");
    url = u.href;
  } catch { continue; }
  if (seenPages.has(url) || new URL(url).origin !== origin || /\/(wp-json|wp-admin|wp-login|feed|comments)\b|\.[a-z0-9]+$/i.test(new URL(url).pathname)) continue;
  seenPages.add(url);
  const response = await request(url, "page");
  if (!response) continue;
  if (!response.headers.get("content-type")?.includes("text/html")) continue;
  const html = await response.text();
  const rawFile = `raw/${slug(url)}.html`;
  await fs.writeFile(path.join(research, rawFile), html);
  const page = parse(html, url);
  page.rawFile = rawFile;
  pages.push(page);
  for (const image of page.images) {
    const canonical = aliasSources.get(image.url) || image.url.replace(/-\d+x\d+(?=\.[a-z]+$)/i, "");
    addImage(canonical, url, { alt: image.alt, displayedWidth: image.width, displayedHeight: image.height });
    if (canonical !== image.url) aliasSources.set(image.url, canonical);
    for (const candidate of image.srcset.split(",")) {
      const variantUrl = candidate.trim().split(/\s+/)[0];
      if (variantUrl) aliasSources.set(variantUrl, canonical);
    }
  }
  for (const link of page.links) queue.push(link.url);
  for (const css of page.stylesheets) if (css.includes("/uploads/")) styleUrls.add(css);
  console.log(`Archived ${slug(url)}: ${page.images.length} image references, ${page.headings.length} headings`);
}

for (const url of styleUrls) {
  const response = await request(url, "stylesheet");
  if (!response) continue;
  const css = await response.text();
  await fs.writeFile(path.join(research, "css", path.basename(new URL(url).pathname)), css);
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
    addImage(new URL(match[1], url).href, url);
  }
}

const assets = [...imageSources.values()];
const usedNames = new Map();
for (let i = 0; i < assets.length; i += 6) {
  await Promise.all(assets.slice(i, i + 6).map(async (asset) => {
    let filename = decodeURIComponent(path.basename(new URL(asset.url).pathname)).replace(/[^a-zA-Z0-9._-]/g, "-");
    if (usedNames.has(filename) && usedNames.get(filename) !== asset.url) filename = `${path.parse(filename).name}-${crypto.createHash("sha1").update(asset.url).digest("hex").slice(0, 8)}${path.extname(filename)}`;
    usedNames.set(filename, asset.url);
    asset.localPath = `/images/original/${filename}`;
    const response = await request(asset.url, "image");
    if (!response) { asset.downloaded = false; return; }
    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(path.join(imageDirectory, filename), buffer);
    asset.downloaded = true;
    asset.bytes = buffer.length;
    asset.sha256 = crypto.createHash("sha256").update(buffer).digest("hex");
    asset.contentType = response.headers.get("content-type");
  }));
}

const manifest = {
  origin,
  collectedAt: new Date().toISOString(),
  scope: "All same-origin publicly discoverable pages via internal links, WordPress REST API and sitemap; original images exposed by public media API, page markup and Elementor stylesheets. Responsive thumbnail variants are mapped to canonical originals rather than downloaded redundantly. External linked websites are recorded but not crawled.",
  pages: pages.map(({ url, title, rawFile, images, links, headings }) => ({ url, title, rawFile, imageCount: images.length, linkCount: links.length, headingCount: headings.length })),
  apiCounts: Object.fromEntries(Object.entries(api).map(([key, value]) => [key, value.length])),
  assets,
  responsiveAliases: Object.fromEntries(aliasSources),
  requests,
  failures,
};

await fs.writeFile(path.join(research, "site-content.json"), JSON.stringify(pages, null, 2));
await fs.writeFile(path.join(research, "asset-manifest.json"), JSON.stringify(manifest, null, 2));
const homepage = pages.find((page) => page.url === origin + "/");
const assetFor = (url) => assets.find((asset) => asset.url === (aliasSources.get(url) || url));
const canonicalProjects = pages.filter((page) => api.posts.some((post) => post.link === page.url));
const catalog = {
  source: origin + "/",
  name: "CustomWeb Pro",
  founder: "Biplob Hossain",
  profileUrl: "https://www.fiverr.com/customweb_pro",
  sourceClaims: { experience: "6+ years", clients: "1.5K+", aiGigRating: "4.9 (265)", wordpressGigRating: "5.0 (5)" },
  services: ["AI Mobile Application Development", "AI Website Development", "Interactive Online Coding Lessons"].map((title) => ({
    title,
    description: homepage.widgets.find((widget) => widget.text.startsWith(title) && widget.class.includes("elementskit-icon-box"))?.text.replace(title, "").replace(/Learn more$/, "").trim(),
  })),
  projects: canonicalProjects.map((page) => ({
    title: page.title.replace(/ – customwebpro$/, ""),
    url: page.url,
    description: page.widgets.find((widget) => widget.class.includes("text-editor"))?.text,
    priceRange: page.widgets.find((widget) => widget.text.startsWith("Price range "))?.text.replace("Price range ", ""),
    duration: page.widgets.find((widget) => widget.text.startsWith("Project duration "))?.text.replace("Project duration ", ""),
    industry: page.widgets.find((widget) => /^(Industries|Industry|ndustry) /.test(widget.text))?.text.replace(/^(Industries|Industry|ndustry) /, ""),
    images: page.images.map((image) => assetFor(image.url)).filter((asset) => asset && !/Screenshot|logo/i.test(asset.localPath)).map((asset) => ({ source: asset.url, localPath: asset.localPath, width: asset.width, height: asset.height })),
  })),
  faq: homepage.faq.map(({ question, answer }) => ({ question, answer })),
  testimonials: homepage.testimonials.filter((item) => item.class.includes("elementskit-single-testimonial-slider")).map(({ author, country, quote, image, stars }) => ({ author, country, quote, stars, image: assetFor(image)?.localPath, sourceImage: image })),
  pricing: {
    hourly: { currency: "USD", price: 25 },
    ai: [
      { tier: "Basic", title: "STARTER AI WEB APPLICATION", price: 150, days: 7, revisions: "3 Revisions" },
      { tier: "Standard", title: "CUSTOM AI WEBSITE OR AI MOBILE APP", price: 1150, days: 30, revisions: "Unlimited Revisions" },
      { tier: "Premium", title: "BESPOKE AI WEBSITE OR AI MOBILE APP", price: 2250, days: 30, revisions: "Unlimited Revisions" },
    ],
    wordpress: [
      { tier: "Basic", title: "1 Page Simple Website", price: 90, days: 3, pages: 1 },
      { tier: "Standard", title: "3-5 Page Website (Medium Business)", price: 290, days: 5, pages: 5 },
      { tier: "Premium", title: "Premium eCommerce Website", price: 590, days: 7, pages: 10, products: 20 },
    ],
  },
  contact: { sourceForm: "WordPress Elementor form with Name, Email and Message; no public email, telephone or reusable public submission endpoint was published.", externalUrl: "https://www.fiverr.com/customweb_pro" },
};
await fs.writeFile(path.join(research, "content-catalog.json"), JSON.stringify(catalog, null, 2));
await fs.writeFile(path.join(research, "site-copy.md"), pages.map((p) => `# ${p.title}\n\nSource: ${p.url}\n\n${p.widgets.map((w) => w.text).join("\n\n")}\n`).join("\n\n---\n\n"));
const summary = `# Source collection\n\nCollected from ${origin} on ${manifest.collectedAt}.\n\n${manifest.scope}\n\n- ${pages.length} HTML pages archived with complete source and structured text, headings, widget copy, forms, FAQs, testimonials, images and links.\n- Public WordPress records: ${Object.entries(manifest.apiCounts).map(([k, v]) => `${v} ${k}`).join(", ")}.\n- ${assets.filter((a) => a.downloaded).length} original images downloaded (${assets.filter((a) => !a.downloaded).length} image failures).\n- ${aliasSources.size} responsive image aliases mapped to originals.\n- ${styleUrls.size} Elementor stylesheets examined for background images.\n- ${failures.length} request failures: ${failures.map((f) => `${f.url} — ${f.error}`).join("; ") || "none"}.\n\n## Files\n\n- \`site-content.json\`: complete structured extraction.\n- \`site-copy.md\`: readable widget copy for every page.\n- \`asset-manifest.json\`: page inventory, images, checksums, source mappings, responsive aliases, HTTP statuses and failures.\n- \`wordpress-*.json\`: unmodified public WordPress API records.\n- \`raw/\`: archived public HTML and sitemap XML.\n- \`css/\`: source Elementor stylesheets.\n- \`../public/images/original/\`: downloaded source images.\n\n## Caveats\n\nClaims, ratings, client counts and prices were preserved as found on the source and have not been independently verified. No private WordPress content or external Fiverr content is included.\n`;
await fs.writeFile(path.join(research, "collection-summary.md"), summary);
console.log(summary);

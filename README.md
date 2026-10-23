# Considered — a static affiliate content website

A mobile-responsive, original everyday-shopping editorial site for India. Publisher: Rajnikanth. Public contact: agriflowe@gmail.com. Marketplace: Amazon.in. No dependencies, paid APIs, database, third-party fonts, Amazon images or fabricated product reviews. Nine substantial buying guides across six categories, searchable guide index, About, Contact, Privacy, affiliate disclosure, custom 404, page metadata, sitemap and robots are included. Node is only needed on your computer to generate/preview files. Hosting serves plain HTML/CSS/JS/SVG.

## 1. Download the project on Windows

Repository: https://github.com/Rajnikanth31/affiliate

Your existing local project is at **E:\Projests\affiliate_marketing** (spelling preserved). You do not need to clone again if you already have that folder.

For a new computer, install Git for Windows from https://git-scm.com/downloads/win and clone into a new, empty destination:

```powershell
New-Item -ItemType Directory -Force -Path 'E:\Projests' | Out-Null
git clone https://github.com/Rajnikanth31/affiliate.git 'E:\Projests\affiliate_marketing'
Set-Location -LiteralPath 'E:\Projests\affiliate_marketing'
```

If that destination already exists, keep it and choose another location for a fresh clone. You can also use GitHub's Code > Download ZIP and extract it locally.

## 2. Install Node and preview

Install a supported Node.js LTS release from https://nodejs.org/ (version 22 or newer). On Windows 11 with Windows Package Manager, you can use:

```powershell
winget install --id OpenJS.NodeJS.LTS --exact
```

Reopen PowerShell after installing, then:

```powershell
Set-Location -LiteralPath 'E:\Projests\affiliate_marketing'
node --version
node scripts/build.mjs
node scripts/check.mjs
node scripts/preview.mjs
```

Open http://127.0.0.1:4173 in your browser. Press Ctrl+C to stop. No `npm install` is needed. If PowerShell blocks `npm.ps1`, use the `node` commands above or `npm.cmd run build`; no execution-policy change is necessary. Equivalent commands are `npm run build`, `npm run check`, `npm run preview`.

## 3. Configure before public launch

Edit `site.config.json` in a text editor:

* `name`: your editorial brand. “Considered” is a working name; check name availability before launch.
* `url`: the final HTTPS origin, e.g. `https://your-project.pages.dev`, without a path. Blank means preview mode: all pages are noindex, robots blocks crawling and sitemap has no URLs. Configure and rebuild before making the site searchable.
* `contactEmail`: a real public inbox you control. Blank shows an honest contact-pending message. Add the address, update the privacy policy with your actual email provider and retention practice, and rebuild before launch.
* `affiliateEnabled`: leave `false` until you have the required Amazon Associates approval and have checked the current rules for your marketplace and site.
* `affiliateLinks`: keys match guide slugs. Paste complete approved Special Links obtained from your Amazon Associates account. Empty values remain inactive even if the global switch is on. Never invent a tag. The builder permits HTTPS Amazon India domains and Amazon's `amzn.to` short links only; other marketplaces require an intentional allowlist change in `scripts/build.mjs`.

All configuration is public after build; never place secrets in it. The builder emits affiliate anchors only when the switch is true AND a link exists. It uses `rel="sponsored nofollow noopener"`, and displays a disclosure near links and in the footer. Required Amazon wording is included conditionally when links are enabled. The disclosure page also explains the future arrangement without claiming current membership. Approval and compliance are the owner's responsibility; this template makes no claim of eligibility.

Edit guide text in `content/guides.json`. Edit informational/legal pages in `scripts/build.mjs`. Review the privacy policy against your actual practices and applicable requirements; it is a starting draft, not a legal determination. There is no contact form pretending to submit messages. The mail link is only present after configuration.

After every edit:

```powershell
node scripts/build.mjs
node scripts/check.mjs
```

Only generated files inside `dist` go online. Do not edit `dist` directly; rebuilding replaces it. Source files and automation notes stay on your computer.

## 4. Deploy to Cloudflare Pages when ready

No deployment has been performed. A custom domain is optional and may cost money; use the supplied `pages.dev` address for the ₹0 monthly plan. A static site needs no Worker backend, paid model, Docker or always-on Windows PC. Check current free-plan limits before deploying; free tiers and availability may change.

The simplest route is Pages **Direct Upload**:

1. Create/sign into your Cloudflare account. Open **Workers & Pages**, create a Pages project and choose **Direct Upload / drag and drop**. Follow the current dashboard labels.
2. Choose your project name. Upload the contents of `dist`, or select the `dist` folder as the deployment folder. `index.html` must be at the deployment root, not nested in another `dist` directory. Do not upload the source project or the project ZIP.
3. The first upload can remain in preview/noindex mode while you obtain the `https://...pages.dev` address. This does not make the site private; noindex is a search-engine request, not access control.
4. Set `url` to that exact address and configure your contact inbox. Review all content and policies, rebuild, check, then upload `dist` again as a new production deployment.
5. Open the deployed homepage, all guides, contact, policy pages, `/robots.txt`, `/sitemap.xml` and a nonexistent URL to check the 404. Test on a phone. Verify HTTPS and links. Submit the sitemap to a search console if desired; indexing and affiliate approval are not guaranteed.

If creating a deployment ZIP, zip **the contents**, not the parent folder:

```powershell
Compress-Archive -Path '.\dist\*' -DestinationPath '.\pages-upload.zip' -Force
```

Cloudflare documents that a Direct Upload project cannot later switch to Git integration; create a new Pages project if you choose that workflow later. For optional Git integration, use `node scripts/build.mjs` as the build command and `dist` as the output directory, and set a supported Node version in the build environment. No framework is required.

Official references, checked while preparing this project:
* https://developers.cloudflare.com/pages/get-started/direct-upload/
* https://developers.cloudflare.com/pages/platform/limits/
* https://affiliate-program.amazon.in/help/node/topic/GPXFHVYZMTGPUMPE
* https://affiliate-program.amazon.in/help/operating/agreement

## Project map

```text
site.config.json          Brand, public URL, contact and affiliate links
content/guides.json       Original general buying guides
assets/                  Local CSS, JS and original SVG illustrations
scripts/build.mjs        Static generator and page templates
scripts/check.mjs        Links, metadata and inactive-link safety checks
scripts/preview.mjs      Localhost-only preview on port 4173
automation/README.md     Optional future draft-only n8n approach
dist/                    Generated files to upload
```

## Editorial and privacy launch checklist

Replace the working identity with your real publisher information; add a functioning contact inbox and align the privacy policy. Read every guide and check any claims you retain. Keep product-specific claims out until you have evidence. Do not add copied Amazon photos, scraped ratings or manually maintained prices. If adding Amazon content later, use only permitted methods and follow current program requirements. Keep disclosure visible near every affiliate placement. Verify configured links lead to the intended items and use your approved account. Rebuild and check after changes.

Guide search is progressive enhancement: all guides remain accessible with JavaScript disabled. The site includes keyboard focus styles, skip navigation, meaningful image descriptions, reduced-motion support and responsive layouts. It does not include analytics or browser storage. Local preview serves only this machine. Port 4173 already in use? Stop the other process or change the port at the bottom of `scripts/preview.mjs`.

Optional automation is described in `automation/README.md`. It is deliberately separate from the public site and does not auto-publish content.

## Current editorial scope

Nine general buying guides across Home office, Home & cleaning, Kitchen, Tech essentials, Personal care and Travel. Topic selection is informed by dated, linked Amazon India category reports, not a live bestseller feed. Products are not ranked or claimed as tested. One Amazon.in affiliate link is enabled for the laptop-stand guide using the user-provided SiteStripe link. Other guide links are empty and remain inactive. Final application review is pending. The public contact uses Gmail. Review the privacy policy against actual inbox management before launch.

## Hosting directly from this GitHub repository

Uploading source to GitHub does not itself publish the website. For automatic Cloudflare Pages builds, create a **new Git-integrated Pages project**, connect this repository, and select:

* Production branch: `main`
* Framework preset: None
* Build command: `node scripts/build.mjs`
* Build output directory: `dist`
* Root directory: repository root (leave blank)
* Node version: a supported LTS release, version 22 or newer

After your first deployment, set `url` in `site.config.json` to the exact HTTPS production address and commit that change. Cloudflare will rebuild canonical URLs, sitemap and robots. Until then the website is intentionally noindex. Affiliate status is controlled in site.config.json. Direct Upload projects cannot be converted to Git integration; use a new Pages project if you already made one.


Affiliate update (24 October 2026): the laptop-stand guide includes a clearly labelled Zebronics NS1000 product example, not a tested recommendation. The link.amazon destination was checked to reach Amazon.in with tracking tag consideredind-21. Amazon short links are public, not credentials. Never add prices, copied reviews, ratings or product images without meeting the relevant requirements.

## Multiple product examples

Product cards are defined in each guide’s `products` array in `content/guides.json`. Each entry has `linkKey`, local image path, image dimensions/alt text, editorial note, comparison question and check date. Its link is configured under `affiliateLinks[linkKey]` in `site.config.json`; the global switch still controls all affiliate anchors. Guides can have multiple cards. Publisher-supplied images live in `assets/`. Cards remain above the guide sections.

Current collection: ten guides and seven product examples (including the original laptop stand). New examples cover two air fryers, two earbuds, a Philips MG3927 kit and a Philips AC0950 purifier. Exact product links and tracking tags were checked on 24 October 2026. No prices, ratings, hands-on testing or health benefits are claimed. Air-purifier guidance cites the EPA.

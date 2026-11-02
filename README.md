# Urban Crumb Bakery

**Student:** Khutso Mokwatlo
**Student Number:** ST10529579
**Module:** WEDE5020 – Web Development (Portfolio of Evidence)
**Part:** Part 3 – Enhancing Functionality and SEO
**Live site (GitHub Pages):** https://mokwatlosara-ux.github.io/Khutsomokwatlo_ST10529579_wede5020_poe1/ *(GitHub Pages)*
**Repository:** [https://github.com/mokwatlosara-ux/Khutsomokwatlo_ST10529579_wede5020_poe1.git](https://github.com/mokwatlosara-ux/Khutsomokwatlo_ST10529579_wede5020_poe3.git)

---

## 1. About the Website

Urban Crumb Bakery is a fictional local bakery based in Pretoria, Gauteng. The website gives
customers information about the bakery, its products and services, its branches and opening
hours, and provides an enquiry form for custom cakes, catering and bulk orders.

Part 3 adds JavaScript functionality, search engine optimisation and deployment on GitHub Pages.

Part 1 delivered the semantic HTML structure and content. Part 2 adds the complete visual
layer: an external CSS stylesheet, a typographic system, Grid and Flexbox layouts, decorative
and colour styling, interactive states, and a fully responsive design for desktop, tablet and
mobile devices.

---

## 2. Website Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Hero introduction, key selling points and a call to action |
| About Us | `about.html` | Background, history, mission, vision and values |
| Products & Services | `products.html` | Product cards with descriptions and pricing |
| Enquiry | `enquiry.html` | Enquiry form for custom orders and catering |
| Contact | `contact.html` | Branch details, contact information and opening hours |

---

## 3. Project Structure

```text
Khutsomokwatlo_ST10529579_wede5020_poe1
│
├── css/
│   └── style.css            External stylesheet linked to all five pages
├── images/
│   ├── hero-480.jpg         Responsive image sources (multiple widths)
│   ├── hero-800.jpg
│   ├── hero-1600.jpg
│   ├── bread-400.jpg  / bread-800.jpg
│   ├── pastries-400.jpg / pastries-800.jpg
│   ├── cakes-400.jpg  / cakes-800.jpg
│   ├── catering-400.jpg / catering-800.jpg
│   └── storefront-400.jpg / storefront-800.jpg
├── js/
│   ├── main.js              Shared: scroll reveal, accordion, tabs, lightbox, back-to-top
│   ├── products.js          Dynamic product list, search, filter, sort, modal
│   ├── enquiry.js           Enquiry form validation
│   └── map.js               Leaflet branch map
├── screenshots/             Responsive testing evidence
├── robots.txt
├── sitemap.xml
├── 404.html
├── index.html
├── about.html
├── products.html
├── enquiry.html
├── contact.html
└── README.md
```

---

## 4. CSS Approach

### 4.1 External stylesheet
A single external stylesheet, `css/style.css`, is linked in the `<head>` of every page with
`<link rel="stylesheet" href="css/style.css">`. No inline or embedded styles are used, so the
presentation layer is completely separated from the content layer.

### 4.2 Base styles and the cascade
The stylesheet opens with a set of CSS custom properties (design tokens) declared on `:root`
for colours, fonts, the spacing scale, border radii, shadows and transitions. Because these
tokens cascade down to every element, a change such as the brand colour only needs to be made
in one place. A light reset (`box-sizing: border-box`, zeroed margins and padding) and the
default body typography are applied with element selectors so that the number of selectors
needed later is kept to a minimum.

### 4.3 Typography
* Font families: Georgia (headings) and Segoe UI (body), each with a full fallback stack.
* A fluid type scale using `clamp()` so headings resize smoothly between mobile and desktop.
* `line-height`, `letter-spacing`, `font-weight` and a `65ch` measure on paragraphs for
  comfortable reading.
* An uppercase, letter-spaced `.eyebrow` label and a `::after` gradient rule under section
  titles provide typographic hierarchy.

### 4.4 Layout
* **CSS Grid** is used for the page container grids, the site header (with
  `grid-template-areas`), the card grids (`repeat(auto-fit, minmax(16rem, 1fr))`), the split
  image/text blocks, the enquiry form and the footer.
* **Flexbox** is used for the navigation bar, button groups, card internals (so prices align
  to the bottom of every card regardless of text length) and the opening-hours rows.

### 4.5 Imagery
All imagery is original flat-style illustration created for this project (bread, pastries,
a celebration cake, a catering platter, a storefront and a display-counter hero scene),
built to match the site's colour palette. No third-party photographs are used, so no image
licensing or attribution is required.

### 4.6 Decoration and colour
A warm bakery palette (crust brown, caramel, cream) is applied consistently through the
tokens. Borders, border radii, layered `box-shadow` values, gradients and `transition`
properties are used to give cards, buttons and the header depth without clutter.

### 4.7 Pseudo-classes and interactivity
* `:hover` and `:focus` on navigation links, buttons and cards.
* `::after` underline that scales in on navigation hover and on the current page.
* `:active` press state on buttons.
* `:focus-visible` outlines on every interactive element for keyboard users.
* `:focus-within` lifts a card when any element inside it receives focus.
* `:nth-child(even)` tints alternate cards; `:last-child` removes the final divider.
* `:required:valid` gives live green validation feedback on form fields.

### 4.8 Responsive design
Three breakpoints are used, defined in `em` so that they respect the user's font-size setting:

| Breakpoint | Width | Main adjustments |
|------------|-------|------------------|
| Tablet | `max-width: 64em` (1024px) | Reduced spacing scale, tighter navigation, narrower card minimums |
| Mobile | `max-width: 48em` (768px) | Multi-column layouts collapse to a single column, navigation collapses into a CSS-only toggle menu, type and line-height reduced, buttons go full width |
| Small mobile | `max-width: 30em` (480px) | Smaller brand and headings, wider container, image aspect ratio switches to 16:9, opening hours stack |

Two further media queries handle `prefers-reduced-motion` and print styles.

**Relative units:** `rem` and `em` are used for all font sizes, spacing and breakpoints; `%`
and `fr` for widths; `ch` for the reading measure; and `vw` inside `clamp()` for fluid type.
Fixed pixel values are only used for hairline borders.

**Responsive images:** the home page hero uses the `<picture>` element with `<source>`
elements at the desktop and mobile breakpoints, plus `srcset` and `sizes` as a fallback. All
product and content images use `srcset` with `sizes` so the browser downloads the 400px file
on a phone and the 800px file on a desktop. `width`, `height` and `loading="lazy"` are set to
prevent layout shift and to improve load performance.

### 4.9 Accessibility
A skip link, `aria-label` on the navigation, `aria-current="page"` on the active link,
descriptive `alt` text on every image, visible focus outlines, labels bound to every form
control and a colour palette with strong contrast.

---

## 5. Responsive Testing Evidence

Testing was carried out with the Google Chrome DevTools device toolbar (and by resizing the
browser window) at the following sizes. Screenshots are stored in the `screenshots/` folder.

| Device / size | Viewport | Screenshot |
|---------------|----------|-----------|
| Desktop (1440 × 900) | ≥ 1024px | `screenshots/desktop-home.png` |
| Laptop (1024 × 768) | tablet breakpoint | `screenshots/tablet-home.png` |
| iPad Air (820 × 1180) | ≤ 768px | `screenshots/tablet-products.png` |
| iPhone 14 Pro (393 × 852) | ≤ 480px | `screenshots/mobile-home.png` |
| Galaxy S20 (360 × 800) | ≤ 480px | `screenshots/mobile-nav-open.png` |

---

## 5A. Part 3 - Functionality (JavaScript)

All scripts are plain JavaScript (no framework), loaded with `defer`, and every feature is
written to work with the keyboard and screen readers.

| Feature | Page | File | How it works |
|---------|------|------|--------------|
| Accordion (FAQ) | Home | `main.js` | Buttons with `aria-expanded`/`aria-controls` toggle `hidden` on panels; one panel is open at a time |
| Tabs | About | `main.js` | `role="tablist"` pattern; click and left/right arrow keys switch panels |
| Gallery + lightbox | About | `main.js` | Thumbnails link to the large image; the lightbox is built with DOM manipulation, has previous/next, Escape to close, a focus trap-style return of focus and a caption |
| Interactive map | Contact | `map.js` | Leaflet 1.9.4 with OpenStreetMap tiles, a marker and popup per branch, and buttons that `flyTo` a branch |
| Dynamic product listing | Products | `products.js` | Cards are generated from a data array using `createElement`; no HTML is hard-coded for products |
| Search, filter and sort | Products | `products.js` | Live text search, category filter and sort (price low/high, A-Z); result count announced with `aria-live`; empty state with reset button |
| Details modal | Products | `products.js` | "View details" opens a dialog; "Enquire" links to the form with the product pre-filled in the message |
| Animations | All | `style.css`, `main.js` | Hero entrance with CSS keyframes, scroll-reveal with `IntersectionObserver`, card/gallery/button transitions, back-to-top button. All animation is disabled under `prefers-reduced-motion` |
| Form validation | Enquiry | `enquiry.js` | Described below |

### Form validation rules
* **Full name:** required, 2-60 letters, spaces, hyphens or apostrophes.
* **Email:** required, must match a standard email pattern.
* **Phone:** required, South African format (`0XXXXXXXXX` or `+27XXXXXXXXX`, spaces/dashes allowed).
* **Required date:** cannot be in the past; required unless the enquiry type is "General".
* **Message:** required, 10-500 characters, with a live character counter.
* Errors appear next to the field (`aria-invalid`, `aria-describedby`), an error summary with links
  to each problem appears at the top, and a confirmation message shows on success.
* The form uses `novalidate` so the custom messages are shown instead of the browser defaults.

> **Note:** the form validates in the browser and shows a confirmation. GitHub Pages is static
> hosting, so enquiries are not actually emailed. A form service or back-end would be required in
> production.

---

## 5B. Part 3 - Search Engine Optimisation

### On-page SEO
* **Keyword research:** target phrases were chosen around what local customers search for:
  *bakery Pretoria*, *fresh bread Pretoria*, *custom cakes Pretoria*, *catering Pretoria* and
  *Menlyn bakery*. They are used naturally in titles, headings, descriptions and body copy.
* **Title tags and meta descriptions:** every page has a unique title (under about 65 characters)
  and a unique description (under about 160 characters) containing the primary keyword.
* **Headings:** one `<h1>` per page followed by ordered `<h2>`/`<h3>` headings.
* **Images:** descriptive file names (`cakes-800.jpg`), descriptive `alt` text, `width`/`height`
  and `loading="lazy"`.
* **URLs:** short, lowercase, descriptive file names (`products.html`, `contact.html`) plus a
  `<link rel="canonical">` on each page.
* **Internal linking:** navigation, footer links, calls to action between pages, and links
  inside FAQ answers.
* **Mobile-friendliness:** responsive design from Part 2 (viewport tag, fluid layout, three breakpoints).
* **Structured data:** `Bakery` (schema.org) JSON-LD with address, phone, geo-coordinates and
  opening hours on the home page.
* **Open Graph / Twitter tags** for rich link previews.

### Off-page SEO (strategy)
* **Backlinks:** plan to request links from local directories (Pretoria business listings, Yellow
  Pages SA), the Menlyn and Pretoria CBD business forums, local food bloggers and event
  suppliers for whom the bakery caters.
* **Social media:** Facebook, Instagram and WhatsApp links are in the footer of every page; new
  products and weekly specials would be posted with a link back to the products page.
* **Local SEO:** the business name, address and phone number are consistent across the site and
  the JSON-LD; the next step is claiming a Google Business Profile for each branch and collecting
  customer reviews. The contact page includes an embedded map and both branch addresses.

### Additional requests
* **robots.txt:** allows crawling of the site, blocks `/screenshots/` and `/js/`, and points to the sitemap.
* **sitemap.xml:** lists all five pages with `lastmod`, `changefreq` and `priority`.
* **Page speed:** responsive `srcset` images, lazy loading, `defer` on all scripts, one small
  CSS file, no JavaScript framework, preload of the mobile hero image, SVG favicon.
* **Security:** a Content-Security-Policy `<meta>` tag restricts scripts to the site itself and
  the pinned Leaflet CDN; Leaflet is loaded with Subresource Integrity hashes; external links
  use `rel="noopener noreferrer"`; a strict referrer policy is set; user input is written to the
  page with `textContent`/DOM methods, not `innerHTML`; form input is validated. GitHub Pages
  provides HTTPS. A custom `404.html` is included.

---

## 5C. Deployment

The site is deployed with **GitHub Pages**: repository *Settings > Pages > Deploy from a branch >
`main` / root*. The live URL is listed at the top of this README. The canonical URLs, sitemap and
Open Graph tags use this address; update them if the repository name or host changes.

---

## 6. Changelog

### [Part 3] - 2026-11-02

#### Corrections made in response to Part 2 feedback
* **Missing repository link (Part 2 feedback: "Where's the link?"):** the Part 2 submission text
  said the work was on GitHub but did not include the URL, so the repository could not be found.
  The repository link is now a clickable link at the top of this README
  ([GitHub repository](https://github.com/mokwatlosara-ux/Khutsomokwatlo_ST10529579_wede5020_poe1.git)),
  the live GitHub Pages link is listed beside it, and both links are included in the Part 3
  submission text.
* **README:** updated the part number, structure tree (JavaScript files, SEO files), repository link
  and added documentation for the new features, SEO work and deployment.
* **`js/` folder:** the empty placeholder `.gitkeep` was replaced with working scripts.
* **Footer:** added a "Follow Us" column with social links on every page.
* **`<head>` of every page:** added unique title and description, canonical link, Open Graph tags,
  favicon, referrer policy and Content-Security-Policy.
* **Enquiry form:** the form previously relied on browser defaults only. Added `novalidate`, per-field
  error messages, an error summary, `aria-describedby`/`aria-invalid` and a confirmation message.
* **Products page:** the four static cards were replaced with a generated list of 12 products so
  customers can search, filter and sort.

#### New features
* Home: FAQ accordion, hero entrance animation, scroll-reveal on cards.
* About: tabs ("A Day at Urban Crumb") and an image gallery with a lightbox.
* Products: dynamic product cards, live search, category filter, sorting, details modal, empty state.
* Enquiry: JavaScript validation (name, email, SA phone number, date, message length), live character counter.
* Contact: interactive Leaflet map with branch markers and "Show branch" buttons.
* All pages: back-to-top button, animated transitions, `prefers-reduced-motion` support.
* SEO: `robots.txt`, `sitemap.xml`, JSON-LD structured data, `404.html`, `images/favicon.svg`.
* CSS: new section 14 in `style.css` for all Part 3 components, including responsive rules.

### [Part 2] – 2026-09-18

#### Corrections made in response to Part 1 feedback
* **External stylesheet:** created `css/style.css` and linked it from all five HTML pages;
  Part 1 had no stylesheet linked.
* **Folder structure:** consolidated the duplicate `CSS`, `Images` and `JS` folders into
  lowercase `css/`, `images/` and `js/` folders so that file paths are consistent and work on
  case-sensitive web servers.
* **README:** rewrote the README, which previously ended mid-sentence inside the project
  structure code block and had an unformatted repository link. It now contains a full project
  overview, CSS documentation, testing evidence, changelog and references.
* **Navigation:** wrapped the navigation links in a `<ul>`/`<li>` list, added
  `aria-label="Main navigation"` and marked the active link with `aria-current="page"`.
* **Semantics and accessibility:** added a meta description to every page, a skip link, a
  footer with site-wide links and contact details, and consistent heading levels (the previous
  pages nested an `<h2>` inside a section that already used `<h3>` headings).
* **Enquiry form:** replaced the `<br><br>` spacing between fields with a CSS Grid form
  layout, wrapped each control in a `.form__field` container and added placeholder text and
  helper text.
* **Content images:** added original illustrations to the home, about and products pages,
  which previously contained no images at all.



---

## 7. References

Leaflet, 2023. *Leaflet 1.9.4 documentation*. [online] Available at: <https://leafletjs.com/reference.html> [Accessed 2 November 2026].

Google, 2025. *Search Essentials and SEO Starter Guide*. [online] Available at: <https://developers.google.com/search/docs/fundamentals/seo-starter-guide> [Accessed 2 November 2026].

Schema.org, 2025. *Bakery*. [online] Available at: <https://schema.org/Bakery> [Accessed 2 November 2026].

W3C, 2025. *ARIA Authoring Practices Guide: Accordion and Tabs patterns*. [online] Available at: <https://www.w3.org/WAI/ARIA/apg/patterns/> [Accessed 2 November 2026].

Mozilla Developer Network, 2025. *Intersection Observer API*. [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API> [Accessed 2 November 2026].

Coyier, C., 2024. *A Complete Guide to Flexbox*. [online] Available at:
<https://css-tricks.com/snippets/css/a-guide-to-flexbox/> [Accessed 18 September 2026].

Coyier, C., 2024. *A Complete Guide to CSS Grid*. [online] Available at:
<https://css-tricks.com/snippets/css/complete-guide-grid/> [Accessed 18 September 2026].

Mozilla Developer Network, 2025. *Using CSS custom properties (variables)*. [online]
Available at:
<https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties>
[Accessed 18 September 2026].

Mozilla Developer Network, 2025. *Using media queries*. [online] Available at:
<https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries>
[Accessed 18 September 2026].

Mozilla Developer Network, 2025. *Responsive images*. [online] Available at:
<https://developer.mozilla.org/en-US/docs/Web/HTML/Responsive_images> [Accessed 18 September 2026].

Mozilla Developer Network, 2025. *Pseudo-classes*. [online] Available at:
<https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes> [Accessed 18 September 2026].

W3C, 2025. *Web Content Accessibility Guidelines (WCAG) 2.2*. [online] Available at:
<https://www.w3.org/TR/WCAG22/> [Accessed 18 September 2026].

W3Schools, 2025. *CSS Responsive Web Design*. [online] Available at:
<https://www.w3schools.com/css/css_rwd_intro.asp> [Accessed 18 September 2026].

# MediaRanch Africa — Website

A world-class, cinematic marketing site for **MediaRanch Africa**, a premier Lagos-based video production studio (est. 2012). Built for review and deployment.

> If content is king, then video is the throne and we are the king makers.

## ✶ What's inside

A seven-page static site engineered around the Figma-specified design system (True Black · Signature Red `#E30613` · Work Sans · sharp corners · 120px section rhythm) with custom interactions, reveal animations, a magnetic-cursor overlay and a cinematic loader.

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero · Our Forte · Featured Work bento · Stats · Quote · Workflow · Testimonials · CTA |
| About | `about.html` | Visual narratives · Journey · 6 values · Timeline · Team · Clients wall |
| Services | `services.html` | 7-stage workflow · Services bento · 8-capability matrix · Engagement tiers · FAQ |
| Work | `work.html` | Filterable case-study grid · Impact metrics |
| Case Study | `case-study.html` | Cinematic detail template with brief/approach/outcome |
| Resources | `resources.html` | Filterable assets · Editorial strip · Newsletter |
| Contact | `contact.html` | Full brief form · Map · Direct channels · Post-submit playbook |

## ✶ Tech

- **HTML + CSS + Vanilla JS** — zero framework, lighthouse-friendly
- **CSS custom properties** — tokenized design system in `assets/css/main.css`
- **IntersectionObserver** — scroll-triggered reveals & staggered animations
- **Custom cursor** — mix-blend-mode difference, magnetic buttons
- **No build step** — just open `index.html` or serve statically

## ✶ Local preview

```bash
# Option 1: Python
python3 -m http.server 4873

# Option 2: Node
npx serve

# Then visit http://localhost:4873
```

## ✶ Deployment

Deployed to **Vercel** — see repo description for the live URL.

```bash
vercel --prod
```

## ✶ Design system

- **Colors** — `#000000` base · `#E30613` signature red · `#0B0B0B` surfaces · `#E2E2E2` body text
- **Type** — Work Sans 400/500/700/800/900 · tight letter-spacing on display, generous line-height on body
- **Shape** — Brutalist sharp corners · tonal layering · no shadows
- **Motion** — `cubic-bezier(0.19, 1, 0.22, 1)` expo-out for all reveals

## ✶ Contact

**MediaRanch Africa**
22A Adeniji Street, off Wemco Road, Ogba, Lagos State
+234 803 424 1220 · +234 803 296 4689
hello@mediaranchafrica.com · www.mediaranchafrica.com

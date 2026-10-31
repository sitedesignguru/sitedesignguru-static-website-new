# Site Design Guru website

Built with [Hugo](https://gohugo.io) and hosted on GitHub Pages. All the words, links, projects and testimonials live in Markdown files in `content/`. Pushing to `main` publishes the site.

## Preview on your computer

```sh
npm install
npm run dev
```

Open http://localhost:1313. The page reloads as you save.

## Where everything lives

| To change | Edit |
| --- | --- |
| Menu, logo, social links, footer links, analytics | `content/settings.md` |
| Home page title and search description | `content/_index.md` |
| Home page sections | `content/homepage/` (one file per section) |
| Contact form wording, fields and destination | `content/homepage/contact.md` |
| Testimonials | `content/testimonials/` |
| Portfolio page wording and filters | `content/portfolio/_index.md` |
| Portfolio projects | `content/portfolio/` (one file per project) |
| Images | `static/img/` |

The part between the `---` lines at the top of a file holds the labeled pieces of a section. The text below it is ordinary Markdown.

In headings and quotes that support it, `**double asterisks**` apply the highlight color.

Sections and projects appear in order of their `weight`, lowest first. To reorder, change the numbers. Add `draft: true` to hide a file from the published site.

## Common jobs

**Add a portfolio project**

1. Put the screenshots in `static/img/`. Put a preview image in `static/img/portfolio-previews/`.
2. Run `hugo new portfolio/client-name.md`, or copy an existing project file.
3. Fill in the details and list the screenshots below the `---` as `![description](img/file.jpg)`.

`category` must match a filter key in `content/portfolio/_index.md`: `new`, `redesign` or `dev`.

**Change the featured project**

Move `featured: true` to another project file and give it a `summary`. The featured project appears at the top of the portfolio page and in the home page's Featured section, not in the grid.

**Add a testimonial**

Add a file to `content/testimonials/`, then point a home page section at it with `testimonial: {name: the-filename, color: purple}`. The colors are `purple`, `gold` and `orange`.

**Add a page, such as a privacy policy**

Create `content/privacy.md` with a `title` and Markdown text. It's published at `/privacy/`. Link to it from `footer_links` or `nav` in `content/settings.md`.

**Reorder or remove a home page section**

Change its `weight`, or add `draft: true`. Service sections renumber themselves.

The build stops with an error if a file points to an image, icon or testimonial that doesn't exist, so a typo can't reach the live site.

## Contact form

GitHub Pages can't run PHP, so the old `mail/contact.php` handler is gone and messages go through [Web3Forms](https://web3forms.com).

1. Create an access key at [web3forms.com](https://web3forms.com), using the address that should receive messages.
2. For previews, add it to a `.env` file in the project folder, which git ignores: `HUGO_WEB3FORMS_KEY=your-key`.
3. For the live site, add it in the repository under **Settings → Secrets and variables → Actions** as a secret named `WEB3FORMS_KEY`.

This keeps the key out of the repository. Web3Forms needs it in the browser, so it still appears in the source of the published page.

Without the key, a preview shows a warning and the form can't send. A published build stops with an error.

File uploads need a paid Web3Forms plan. Once yours supports them, set `attachments: true`.

## First-time GitHub setup

1. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push to `main`. The **Actions** tab shows the deployment.
3. To use the real domain, add `sitedesign.guru` under **Settings → Pages → Custom domain**, then point its DNS at GitHub Pages. No `CNAME` file is needed with this setup.

## For developers

- `layouts/` holds the page templates and `layouts/_partials/home/` holds one template per home page section type, chosen by `block:` in each section's file.
- `assets/icons/` holds the animated service icons. Their colors are drawn for one section color each.
- `static/` is copied to the site unchanged: CSS, JavaScript, fonts and images.
- `hugo` builds the site into `public/`.
- The Hugo version is set in `.github/workflows/deploy.yml`.

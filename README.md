# blogpaste.online

A static blog built with plain HTML, CSS, and vanilla JS — no build step,
no framework, no server required.

## File structure

```
index.html              Homepage — lists all posts
about.html
contact.html
privacy-policy.html
posts/
  pasting-my-thoughts.html
  rough-draft.html
  daily-writing-habit.html
css/style.css
js/script.js
sitemap.xml
robots.txt
ads.txt
```

## Adding a new post

1. Copy `posts/rough-draft.html` to `posts/your-new-slug.html`.
2. Update, for that new file:
   - `<title>` and `<meta name="description">`
   - `<link rel="canonical">` and the `og:*` tags
   - the tape label, `<h1>`, byline (date/read time), and article body
3. Add a matching card to the `<div class="board">` list in `index.html`:
   ```html
   <a class="clip" href="posts/your-new-slug.html" data-tag="writing">
     <span class="pin" aria-hidden="true"></span>
     <span class="tape">Writing</span>
     <h2>Your Post Title</h2>
     <p class="excerpt">A one or two sentence teaser.</p>
     <span class="meta">Month Day, Year · N min read</span>
   </a>
   ```
   `data-tag` controls the filter buttons on the homepage (`writing`,
   `habits`, `notes`, or add a new tag + button in `index.html`).
4. Add the new URL to `sitemap.xml`.

Every page is fully self-contained static HTML — search engines see the
same content as a visitor with JavaScript turned off. The homepage
search/filter box is a JS enhancement on top of that, not a replacement.

## A note on "there's no CSS"

If you open a single HTML file in a file-preview tool (rather than the
whole folder, served together, in a browser), it can look unstyled —
the preview only loads that one file and doesn't fetch its sibling
`css/style.css`. As long as the folder structure stays intact (the
`css/` and `js/` folders next to the HTML files) and you open it
through an actual web server — your own browser via `file://`, or once
it's deployed — the styling loads normally. This is exactly how it'll
behave on GitHub Pages.

## Deploying to GitHub Pages

1. Create a new GitHub repo (public or private, either works with
   Pages on a paid plan; public is required on the free plan).
2. Push everything in this folder to the repo, keeping the folder
   structure as-is (`css/`, `js/`, `posts/` all at the same level as
   `index.html`). The `.nojekyll` file is already included — it tells
   GitHub Pages not to run its default Jekyll build step, which isn't
   needed for a plain static site like this.
3. In the repo, go to **Settings → Pages**, and under "Build and
   deployment," set the source to "Deploy from a branch," pick your
   main branch and the `/ (root)` folder, then save.
4. A `CNAME` file with `blogpaste.online` is already included, which
   is what tells GitHub Pages to serve this repo on your custom
   domain instead of the default `username.github.io` address.
5. At your domain registrar (wherever blogpaste.online is
   registered), add these DNS records so the domain points at GitHub
   Pages:
   - Four **A** records for `@` pointing to GitHub's Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153`
   - A **CNAME** record for `www` pointing to
     `<your-github-username>.github.io`
   (GitHub's own docs at
   [docs.github.com/pages](https://docs.github.com/en/pages) have the
   current values if these ever change — worth a quick check.)
6. Back in **Settings → Pages**, once GitHub confirms the domain is
   detected, tick "Enforce HTTPS" so the site serves over `https://`.

DNS changes can take anywhere from a few minutes to a few hours to
propagate, so the domain may not resolve immediately after step 5.

### Other static hosts

Any static host works, since there's no backend — Netlify, Cloudflare
Pages, and Vercel all support drag-and-drop folder uploads or a
connected git repo, with free HTTPS custom domains, if you'd rather
use one of those instead of GitHub Pages.

## Before you apply to Google AdSense

AdSense reviews the *whole site*, not just ad code, so check these first:

- [ ] **Real, original content.** At least a handful of posts with
      substantial text (the 3 included posts are a starting point —
      most reviewers like to see more than that before approving).
- [ ] **About page** — done (`about.html`).
- [ ] **Contact page** — done (`contact.html`), but wire the form up to
      a real form backend (e.g. free plan at formspree.io) by replacing
      `YOUR_FORM_ID` in `contact.html`, or just rely on the mailto link.
- [ ] **Privacy policy mentioning ads/cookies** — done
      (`privacy-policy.html`), update the contact email placeholder.
- [ ] **Custom domain live over HTTPS** with the site fully deployed —
      AdSense won't review a site that isn't publicly reachable.
- [ ] **Easy navigation** — done (nav bar + footer links on every page).
- [ ] Update `hello@blogpaste.online` everywhere to a real inbox you
      check.

### Once you're approved

1. Google gives you a publisher ID like `ca-pub-1234567890123456`.
2. Replace `pub-0000000000000000` in `ads.txt` with that real ID.
3. Add your Auto Ads (or per-unit) snippet to the `<head>` of every
   page — there's a comment marking where in `index.html` and each
   post already.
4. The `.ad-slot` divs inside each post are placeholder positions for
   in-article ad units if you'd rather place ads manually than use
   Auto Ads — swap the HTML comment inside them for AdSense's real
   `<ins class="adsbygoogle">` snippet.

## Notes

- Fonts (Fraunces / Source Sans 3 / IBM Plex Mono) load from Google
  Fonts via `<link>` tags — no build step needed, but it does mean
  those pages need internet access to fetch the fonts. Self-host them
  under a `fonts/` folder if you'd rather have zero external requests.
- All colors/fonts/spacing are defined once as CSS variables at the
  top of `css/style.css` if you want to adjust the palette.

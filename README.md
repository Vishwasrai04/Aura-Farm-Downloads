# Aura Farm landing page

Static site: `index.html` + `style.css` + `script.js`. No build step, no cost.

```
aura-farm-site/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── setup-welcome.png
    ├── setup-installing.png
    ├── setup-done.png
    ├── og.png              <- link preview image (WhatsApp, LinkedIn, etc.)
    └── hero.png            <- optional: add a real app screenshot (see step 2)
```

**Upload all of these together.** The page needs `index.html`, `style.css`, `script.js` and the `assets` folder in the same repo. If `style.css` is old or missing, the page looks broken.

## 1. Edit three values

Open `script.js` and set the values at the top (your email and download link are already filled in):

```js
var DOWNLOAD_URL  = "https://github.com/<your-username>/aura-farm/releases/latest";
var SUPPORT_EMAIL = "raivishwas.04@gmail.com";
var FEEDBACK_URL  = "";   // paste a Google Form or Tally link, or leave empty to use email
```

The download buttons in `index.html` already point to your repo.

## 2. Add screenshots

- Create a folder `assets/` and save a screenshot of the app as `assets/hero.png` (about 1600x1000 px works well).
- The page has an illustrated preview in the hero. When `assets/hero.png` exists, a section called "The app itself" appears automatically with your real screenshot. Without the file, that section stays hidden.
- Use real screenshots of Aura Farm, with sample content such as the "The Future of AI" project.

## 3. Put the code on GitHub

Create a new empty repository on github.com (for example `aura-farm`). Then, in this folder:

```bash
git init
git add .
git commit -m "Add Aura Farm landing page"
git branch -M main
git remote add origin https://github.com/<your-username>/aura-farm.git
git push -u origin main
```

Do not commit the `.exe` into the repository. Use Releases (next step).

## 4. Upload the .exe as a GitHub Release

1. On the repo page, click **Releases** -> **Create a new release**.
2. Tag: `v0.1.0-beta`. Title: `Aura Farm 0.1.0 beta`.
3. Drag your installer `.exe` into the assets box.
4. Tick **Set as a pre-release** and click **Publish release**.

The link `https://github.com/<your-username>/aura-farm/releases/latest` then points to it. Note that `/latest` ignores pre-releases, so either untick "pre-release" or use the direct release URL instead:

`https://github.com/<your-username>/aura-farm/releases/tag/v0.1.0-beta`

Public repos are the simplest, since the download link works for everyone. A private repo's release files can't be downloaded by people without repo access.

## 5. Host the page for free (pick one)

**Cloudflare Pages** (recommended)
1. Cloudflare dashboard -> Workers & Pages -> Create -> Pages -> Connect to Git.
2. Choose the repo. Framework preset: None. Build command: empty. Output directory: `/`.
3. Deploy. You get `https://<name>.pages.dev`.

**Netlify**: Add new site -> Import from Git -> choose repo -> leave build settings empty -> Deploy.

**GitHub Pages**: repo Settings -> Pages -> Source: Deploy from branch -> `main` / root. URL: `https://<your-username>.github.io/aura-farm/`.

Every `git push` to `main` redeploys automatically.

## 6. Feedback form

Create a free Google Form or Tally form (name, what worked, what broke, tools they want supported). Paste its link into `FEEDBACK_URL`.

## 7. Before you share the link

- [ ] Download link opens and the `.exe` installs on a clean Windows PC
- [ ] Feedback form and email work
- [ ] Real screenshot added, placeholder gone
- [ ] Every feature on the page works in the current build (remove anything that doesn't)
- [ ] Page keeps `noindex` while it's invite-only. Delete that `<meta name="robots">` line for the public launch.

## Optional later

- Code-sign the installer to remove the Windows SmartScreen warning
- Custom domain (roughly 100-800 INR a year) pointed at your host
- A short demo GIF or video in the hero

# Custom domain: casualattitude.site

## 0. Enable GitHub Pages (required first)

- Repo **Settings** → **Pages** (left sidebar).
- Under **Build and deployment**:
  - **Source**: choose **GitHub Actions** (not “Deploy from a branch”).
- Save. Push to `main` so the deploy workflow runs; the site will appear at `https://<user>.github.io/<repo>/` until you add a custom domain.

## 1. GitHub repo (custom domain)

- **Settings** → **Pages** → **Custom domain**: `casualattitude.site`
- Click **Save**, then enable **Enforce HTTPS** when it appears.

## 2. DNS at your registrar

Point the domain to GitHub Pages.

**Apex (casualattitude.site):** add 4 A records:

| Type | Name/Host | Value        |
|------|-----------|--------------|
| A    | @         | 185.199.108.153 |
| A    | @         | 185.199.109.153 |
| A    | @         | 185.199.110.153 |
| A    | @         | 185.199.111.153 |

**www (optional):** one CNAME record:

| Type  | Name/Host | Value                    |
|-------|-----------|--------------------------|
| CNAME | www       | casualattitude0.github.io |

## 3. After deploy

- The workflow now builds with no base path so the site is served at `https://casualattitude.site/`.
- DNS can take up to 48 hours to propagate; often it’s a few minutes.
- The old URL `https://casualattitude0.github.io/portfolio/` will no longer work (content is at the root for the custom domain).

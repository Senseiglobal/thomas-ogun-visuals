# Thomas Ogun Visuals Portfolio Website

Modern static portfolio website for **Thomas Ogun Visuals**, designed for GitHub Pages and built with only HTML5, CSS3 and vanilla JavaScript.

## Folder Structure

```text
/
|-- index.html
|-- about.html
|-- portfolio.html
|-- exhibition.html
|-- auramanager.html
|-- cinematography.html
|-- creative-direction.html
|-- professional-practice.html
|-- contact.html
|-- robots.txt
|-- sitemap.xml
|-- README.md
|-- css/
|   |-- style.css
|   `-- responsive.css
|-- js/
|   `-- main.js
|-- assets/
|   |-- images/
|   |-- artwork/
|   |-- cinematography/
|   |-- exhibition/
|   |-- icons/
|   `-- logo/
`-- documents/
```

## Replacing Images

Place final images in the matching asset folders:

- `assets/artwork/` for artworks and exhibition pieces
- `assets/cinematography/` for video galleries
- `assets/exhibition/` for process images, AR screenshots and behind-the-scenes material
- `assets/images/` for general page images and Open Graph previews
- `assets/logo/` for final logo files

In the HTML, replace placeholder blocks such as:

```html
<div class="image-placeholder">Artwork 01</div>
```

with:

```html
<img src="assets/artwork/artwork-01.jpg" alt="Artwork title by Thomas Ogun" loading="lazy">
```

Use descriptive `alt` text for accessibility and SEO. Add `loading="lazy"` to non-hero images.

### Aura Manager Hero Image

The Aura Manager hero currently uses:

```html
assets/images/aura-manager-thomas-desktop.png?v=20260709
```

Use a wide desktop image when replacing it. Keep the subject's head and shirt mark visible across screen sizes. After replacing the image, update the query string version in `auramanager.html` so browsers do not keep an older cached image.

## Replacing Text

Most editable content lives directly in the HTML files. Search for comments such as:

```html
<!-- Replace with final biography. -->
```

Update headings, descriptions, artwork titles, years, media, social links and contact details as the practice develops.

## Theme and Cache Notes

The site supports light and dark themes through CSS variables in `css/style.css`. Dark-mode navigation has a stronger contrast override so menu links remain readable against the black header. Light-mode navigation should be left unchanged unless the full design palette is being revised.

Static assets are cache-busted with query strings such as:

```html
css/style.css?v=20260709-nav-contrast
```

When CSS, JavaScript or key hero images are updated, change the version string in the HTML files so GitHub Pages visitors receive the latest files.

## Deploying to GitHub Pages

1. Create a GitHub repository.
2. Upload all website files to the repository root.
3. Go to **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/root`.
6. Save and wait for GitHub to publish the site.

## Connecting `thomasogunvisuals.com`

1. In GitHub Pages settings, add `thomasogunvisuals.com` as the custom domain.
2. In your domain provider DNS settings, add GitHub Pages records.
3. For an apex domain, use GitHub's current A records.
4. For `www`, add a CNAME record pointing to your GitHub Pages URL.
5. Enable **Enforce HTTPS** after DNS is verified.

Also update `sitemap.xml`, `robots.txt` and Open Graph URLs if the domain changes.

## Adding Google Analytics

Create a Google Analytics property and copy the measurement script. Paste it before `</head>` in each HTML file. Keep analytics scripts lightweight so the portfolio remains fast.

## Adding a Contact Form Later

The contact page currently uses a static form:

```html
<form class="contact-form" action="#" method="post">
```

For GitHub Pages, connect a third-party form service such as Formspree, Basin, Getform or Netlify Forms. Replace `action="#"` with the service endpoint.

## Maintenance

- Compress images before uploading.
- Keep file names lowercase with hyphens, for example `identity-spirituality-01.jpg`.
- Update `sitemap.xml` when adding new pages.
- Test on mobile after major edits.
- Check light and dark theme contrast after navigation or button changes.
- Update asset query strings after CSS, JavaScript or hero-image edits.
- Keep project documentation current for exhibitions, AR demos, press, screenshots and development records.

## Notes

This website is original static code and does not copy any commercial theme, WordPress implementation or third-party layout. The design direction is premium, minimal, editorial and museum-focused.

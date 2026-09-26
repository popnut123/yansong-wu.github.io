# Yansong Wu — personal research website

A responsive static website for research, publications, and robot demos. Built with HTML, CSS, and JavaScript; no package installation or Jekyll required.

## Preview locally

From this directory:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000 in your browser. You can also open `index.html` directly.

## Update the content

- **Introduction, contact details, featured projects:** edit `index.html`.
- **Publications:** edit `publications.json`, then run `python3 render_publications.py`. The generated HTML is committed, so GitHub does not need to run Python.
- **Portrait and project images:** replace files in `assets/` and update their descriptions in `index.html`.
- **Design:** edit `styles.css`.
- **Video:** the TacDiffusion thumbnail opens an embedded YouTube player. Each video link also works directly without JavaScript. Change the link URL and `data-video` value to replace it. Locally hosted MP4 video can be added later.

Publication filtering, search, show-more, theme switching, and the video dialog use `script.js`. All papers and navigation remain available without JavaScript.

## Publish on GitHub Pages when ready

1. Push the website files to the repository's `main` branch.
2. Open repository **Settings → Pages**.
3. Select **Deploy from a branch**, **main**, **/ (root)**, and save.
4. Wait for GitHub to show the published address.

With repository `popnut123/yansong-wu.github.io`, the default address is `https://popnut123.github.io/yansong-wu.github.io/`. If the repository is renamed to `popnut123.github.io`, the address becomes `https://popnut123.github.io/`. All local assets use relative paths to support either arrangement.

## Draft content and sources

This first draft uses information from:

- [Google Scholar](https://scholar.google.com/citations?user=ernQtWIAAAAJ&hl=en): publication entries and portrait.
- [TUM profile](https://www.ce.cit.tum.de/air/people/yansong-wu-msc/): affiliation, research interests, email.
- [TacDiffusion](https://github.com/popnut123/TacDiffusion): paper, code, and [demo video](https://www.youtube.com/watch?v=dabpM4S9kbc); video thumbnail from YouTube.
- [VT-Bridge](https://hoxnocha.github.io/vt-bridge-web/): paper metadata, project page, and the project-page title capture used in Selected Work.
- [React When You Need To](https://react-when-you-need-to.github.io/): paper metadata, project page, and the project-page title capture used in Selected Work.

Layout inspired by the spacious typography and personal/research structure of Haoyi Zhu's website. Site code was written for this project.

Before publishing, review the bio, selected work, publication metadata, and the job-seeking statement. Some Scholar entries may be preprint versions of later publications; the list preserves them for your review. Author lists use the abbreviations supplied by Scholar. No CV, graduation date, private information, or individual contribution claims have been invented. A higher-resolution portrait and additional demo videos can be added after feedback.

Images and research materials belong to their respective authors; this repository does not relicense them.

"""Regenerate the static publication list after editing publications.json.

Uses only Python's standard library. No build step is needed to view the site.
"""
import json
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent
papers = json.loads((ROOT / 'publications.json').read_text())
articles = []
for paper in papers:
    authors = escape(paper['authors']).replace('Y Wu', '<strong>Y Wu</strong>')
    links = ''.join(
        f'<a href="{escape(link["url"], quote=True)}">{escape(link["label"])} ↗</a>'
        for link in paper['links']
    )
    articles.append(f'''        <article class="publication" data-topics="{escape(' '.join(paper['topics']))}">
          <span class="paper-year">{paper['year']}</span>
          <div><h3><a href="{escape(paper['links'][0]['url'], quote=True)}">{escape(paper['title'])}</a></h3>
            <p class="paper-authors">{authors}</p>
            <div class="paper-details"><span class="paper-venue">{escape(paper['venue'])}</span><div class="paper-links">{links}</div></div>
          </div>
        </article>''')
page = ROOT / 'index.html'
before, rest = page.read_text().split('        <!-- PUBLICATIONS_START -->', 1)
_, after = rest.split('        <!-- PUBLICATIONS_END -->', 1)
page.write_text(before + '        <!-- PUBLICATIONS_START -->\n' + '\n'.join(articles) + '\n        <!-- PUBLICATIONS_END -->' + after)
print(f'Rendered {len(papers)} publications into index.html')

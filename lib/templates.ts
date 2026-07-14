
const SHARED_CSS = `
:root {
  --ivory: #FAF8F5;
  --cream: #F3EFE9;
  --gold: #C49B5C;
  --gold-light: #D4B07A;
  --gold-dark: #A67B3D;
  --navy: #1B2A4A;
  --navy-light: #2D4A7A;
  --charcoal: #2C2C2C;
  --text: #3A3A3A;
  --text-light: #6B6B6B;
  --border: #E8E3DC;
  --white: #FFFFFF;
  --rose: #C4727F;
  --blue: #5B8DB8;
}
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Inter', -apple-system, sans-serif;
  background: var(--ivory);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* NAV */
.site-header {
  background: var(--white);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.logo {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--navy);
  text-decoration: none;
}
.logo span { color: var(--gold); }
.main-nav {
  display: flex;
  gap: 32px;
  list-style: none;
}
.main-nav a {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s;
}
.main-nav a:hover { color: var(--gold); }
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: var(--navy);
  cursor: pointer;
}

/* BREADCRUMB */
.breadcrumb {
  padding: 16px 0;
  font-size: 13px;
  color: var(--text-light);
}
.breadcrumb a { color: var(--gold-dark); }
.breadcrumb a:hover { text-decoration: underline; }
.breadcrumb .sep { margin: 0 8px; }

/* CATEGORY PAGE */
.category-header {
  padding: 48px 0 32px;
  text-align: center;
}
.category-header h1 {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  color: var(--navy);
  margin-bottom: 8px;
}
.category-header p {
  font-size: 15px;
  color: var(--text-light);
}
.article-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding-bottom: 48px;
}
.article-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.article-card:hover {
  border-color: var(--gold);
  box-shadow: 0 4px 20px rgba(196,155,92,0.1);
}
.article-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.article-card .card-body { padding: 20px; }
.article-card h2 {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  color: var(--navy);
  margin-bottom: 8px;
  line-height: 1.4;
}
.article-card p {
  font-size: 14px;
  color: var(--text-light);
  line-height: 1.6;
}
.article-card .card-meta {
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-light);
  display: flex;
  justify-content: space-between;
}

/* PAGINATION */
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 32px 0 64px;
}
.pagination a, .pagination span {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}
.pagination a {
  background: var(--white);
  border: 1px solid var(--border);
  color: var(--text);
}
.pagination a:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.pagination .active {
  background: var(--navy);
  color: white;
  border: 1px solid var(--navy);
}

/* FOOTER */
.site-footer {
  background: var(--white);
  border-top: 1px solid var(--border);
  padding: 32px 0;
  text-align: center;
}
.site-footer p {
  font-size: 13px;
  color: var(--text-light);
}
.site-footer a { color: var(--gold-dark); text-decoration: none; }

/* MOBILE */
@media (max-width: 768px) {
  .main-nav { display: none; }
  .main-nav.open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--white);
    border-bottom: 1px solid var(--border);
    padding: 16px 24px;
    gap: 16px;
    z-index: 99;
  }
  .mobile-menu-toggle { display: block; }
  .article-grid { grid-template-columns: 1fr; }
}
`;

export const HEADER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <meta name="description" content="{{DESCRIPTION}}">
  <link rel="canonical" href="{{CANONICAL}}">
  <meta property="og:title" content="{{TITLE}}">
  <meta property="og:description" content="{{DESCRIPTION}}">
  <meta property="og:url" content="{{CANONICAL}}">
  <meta property="og:image" content="{{OG_IMAGE}}">
  <meta property="og:type" content="article">
  <link rel="icon" href="/icon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>${SHARED_CSS}
/* TAXONOMY */
.taxonomy-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding-bottom:48px}
.taxonomy-card{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:20px;text-decoration:none;color:var(--text);transition:border-color .2s,box-shadow .2s;display:flex;flex-direction:column;gap:8px}
.taxonomy-card:hover{border-color:var(--gold);box-shadow:0 4px 16px rgba(196,155,92,.1)}
.taxonomy-card h3{font-family:'Playfair Display',serif;font-size:17px;color:var(--navy);margin:0}
.taxonomy-count{font-size:13px;font-weight:500;color:var(--gold-dark)}
.taxonomy-summary{text-align:center;font-size:14px;color:var(--text-light);margin-bottom:32px}
@media(max-width:768px){.taxonomy-grid{grid-template-columns:repeat(2,1fr)}}
</style>
  <link rel="stylesheet" href="/article.css">
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-95PY8PSZ0Y"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-95PY8PSZ0Y');
  </script>
</head>
<body>
<header class="site-header">
  <div class="container nav-inner">
    <a href="/" class="logo">name<span>verse</span>hub</a>
    <nav class="main-nav">
      <a href="/names">All Names</a>
      <a href="/origins">By Origin</a>
      <a href="/meanings">By Meaning</a>
      <a href="/trends">Trends</a>
      <a href="/about">About</a>
    </nav>
    <button class="mobile-menu-toggle" aria-label="Menu">☰</button>
  </div>
</header>
<main>`;

export const FOOTER_HTML = `</main>
<footer class="site-footer">
  <div class="container">
    <p>&copy; 2026 nameversehub.com &middot; Data sourced from <a href="https://www.ssa.gov/oact/babynames/" target="_blank" rel="noopener">US Social Security Administration</a> &middot; EST. 2026</p>
  </div>
</footer>
<script>
  document.querySelector('.mobile-menu-toggle')?.addEventListener('click', function() {
    document.querySelector('.main-nav')?.classList.toggle('open');
  });
</script>
</body></html>`;

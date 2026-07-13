// Auto-generated about page HTML for NameverseHub
export const ABOUT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About - Nameverse Hub</title>
  <meta name="description" content="Learn how Nameverse Hub combines US Social Security Administration data with etymological research to bring you the story behind 105,000+ names.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

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
    }

    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: var(--ivory);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* NAV */
    nav {
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
    .nav-links {
      display: flex;
      gap: 32px;
      list-style: none;
    }
    .nav-links a {
      font-size: 14px;
      font-weight: 500;
      color: var(--text);
      text-decoration: none;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--gold); }

    /* PAGE HERO */
    .page-hero {
      padding: 60px 0 48px;
      background: linear-gradient(180deg, var(--white) 0%, var(--ivory) 100%);
      border-bottom: 1px solid var(--border);
    }
    .page-hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: 40px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 12px;
    }
    .page-hero p {
      font-size: 17px;
      color: var(--text-light);
      max-width: 640px;
      line-height: 1.7;
    }

    /* CONTENT */
    .content-area {
      padding: 48px 0 80px;
    }
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 48px;
      align-items: start;
    }

    .main-content h2 {
      font-family: 'Playfair Display', serif;
      font-size: 26px;
      font-weight: 700;
      color: var(--navy);
      margin: 40px 0 16px;
    }
    .main-content h2:first-child { margin-top: 0; }
    .main-content p {
      font-size: 15px;
      line-height: 1.8;
      margin-bottom: 16px;
      color: var(--text);
    }
    .main-content .highlight {
      background: var(--cream);
      border-left: 3px solid var(--gold);
      padding: 16px 20px;
      border-radius: 0 8px 8px 0;
      margin: 20px 0;
      font-size: 15px;
      line-height: 1.7;
      color: var(--text);
    }

    /* DATA SOURCE CARDS */
    .source-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 20px 0;
    }
    .source-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px;
    }
    .source-card h3 {
      font-size: 14px;
      font-weight: 600;
      color: var(--navy);
      margin-bottom: 6px;
    }
    .source-card p {
      font-size: 13px;
      color: var(--text-light);
      line-height: 1.6;
      margin: 0;
    }
    .source-card .source-tag {
      display: inline-block;
      margin-top: 10px;
      font-size: 11px;
      font-weight: 600;
      color: var(--gold-dark);
      background: rgba(196, 155, 92, 0.1);
      padding: 3px 8px;
      border-radius: 4px;
    }

    /* STATS */
    .about-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin: 24px 0;
    }
    .about-stat {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px;
      text-align: center;
    }
    .about-stat .num {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      font-weight: 700;
      color: var(--navy);
    }
    .about-stat .label {
      font-size: 12px;
      color: var(--text-light);
      margin-top: 4px;
    }

    /* SIDEBAR */
    .sidebar {
      position: sticky;
      top: 88px;
    }
    .sidebar-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
    }
    .sidebar-card h3 {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      color: var(--navy);
      margin-bottom: 12px;
    }
    .sidebar-card ul {
      list-style: none;
      padding: 0;
    }
    .sidebar-card li {
      font-size: 13px;
      color: var(--text-light);
      padding: 6px 0;
      border-bottom: 1px solid var(--border);
    }
    .sidebar-card li:last-child { border-bottom: none; }
    .sidebar-card li strong {
      color: var(--text);
      font-weight: 600;
    }

    .sidebar-card .cta-link {
      display: inline-block;
      margin-top: 12px;
      font-size: 13px;
      font-weight: 600;
      color: var(--gold-dark);
      text-decoration: none;
    }
    .sidebar-card .cta-link:hover { text-decoration: underline; }

    /* TIMELINE */
    .timeline {
      margin: 24px 0;
      position: relative;
      padding-left: 24px;
      border-left: 2px solid var(--border);
    }
    .timeline-item {
      position: relative;
      padding-bottom: 20px;
    }
    .timeline-item:last-child { padding-bottom: 0; }
    .timeline-item::before {
      content: '';
      position: absolute;
      left: -30px;
      top: 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--gold);
      border: 2px solid var(--ivory);
    }
    .timeline-item .year {
      font-size: 12px;
      font-weight: 600;
      color: var(--gold-dark);
      letter-spacing: 0.5px;
    }
    .timeline-item .desc {
      font-size: 14px;
      color: var(--text);
      line-height: 1.6;
      margin-top: 2px;
    }

    /* FOOTER */
    footer {
      background: var(--white);
      border-top: 1px solid var(--border);
      padding: 32px 0;
      text-align: center;
    }
    footer p {
      font-size: 13px;
      color: var(--text-light);
    }
    footer a {
      color: var(--gold-dark);
      text-decoration: none;
    }

    /* MOBILE */
    @media (max-width: 768px) {
      .page-hero h1 { font-size: 32px; }
      .content-grid { grid-template-columns: 1fr; }
      .sidebar { position: static; }
      .source-cards { grid-template-columns: 1fr; }
      .about-stats { grid-template-columns: 1fr; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>

  <!-- NAV -->
  <nav>
    <div class="container nav-inner">
      <a href="/" class="logo">name<span>verse</span>hub</a>
      <ul class="nav-links">
        <li><a href="/names">All Names</a></li>
        <li><a href="/origins">By Origin</a></li>
        <li><a href="/meanings">By Meaning</a></li>
        <li><a href="/trends">Trends</a></li>
        <li><a href="/about" style="color:var(--gold)">About</a></li>
      </ul>
    </div>
  </nav>

  <!-- PAGE HERO -->
  <section class="page-hero">
    <div class="container">
      <h1>About Nameverse Hub</h1>
      <p>We combine official US government records with etymological research to tell the real story behind every name — no speculation, no fabrication.</p>
    </div>
  </section>

  <!-- CONTENT -->
  <section class="content-area">
    <div class="container">
      <div class="content-grid">

        <div class="main-content">

          <h2>Our Data Sources</h2>
          <p>Every name page on Nameverse Hub is built from two distinct sources: real historical records and expert etymological research. We keep these clearly separated so you always know which information comes from where.</p>

          <div class="source-cards">
            <div class="source-card">
              <h3>US Social Security Administration</h3>
              <p>Official baby name records from 1880 to 2025. This is public domain data collected by the US federal government — the same records used by demographers and historians.</p>
              <span class="source-tag">Popularity & Trends</span>
            </div>
            <div class="source-card">
              <h3>Etymological Research</h3>
              <p>Name meanings, linguistic origins, cultural significance, and historical context compiled from established etymological references and academic sources.</p>
              <span class="source-tag">Meaning & Origin</span>
            </div>
          </div>

          <p>The SSA data tells you <strong>how many people</strong> were given a name each year and <strong>when it was most popular</strong>. Our etymological research tells you <strong>why the name exists</strong> and <strong>what it means</strong>. Together, they give you the complete picture.</p>

          <div class="highlight">
            We never fabricate popularity numbers. Every count, rank, and trend chart on this site comes directly from SSA records. If a name doesn't appear in SSA data, we say so explicitly rather than guessing.
          </div>

          <h2>How We Build Each Page</h2>
          <p>Each name page combines a structured article with a live data panel. The article covers the name's etymology, cultural significance, famous bearers, and variations. The data panel displays real SSA statistics — total count, peak year, gender distribution, and an interactive trend chart spanning up to 145 years.</p>

          <p>For common names like James or Mary, articles include more detailed historical analysis, 6–8 notable people, and comprehensive variant lists. For rarer names, we keep it concise but honest — if the origin is uncertain or the name has limited historical record, we tell you rather than inventing filler.</p>

          <div class="about-stats">
            <div class="about-stat">
              <div class="num">105,966</div>
              <div class="label">Unique Names</div>
            </div>
            <div class="about-stat">
              <div class="num">375M+</div>
              <div class="label">SSA Records</div>
            </div>
            <div class="about-stat">
              <div class="num">145</div>
              <div class="label">Years of Data</div>
            </div>
          </div>

          <h2>A Brief History of SSA Name Data</h2>
          <div class="timeline">
            <div class="timeline-item">
              <div class="year">1880</div>
              <div class="desc">Earliest year in our dataset. The Social Security Administration began recording baby names, creating what would become one of the most comprehensive demographic datasets in history.</div>
            </div>
            <div class="timeline-item">
              <div class="year">1936</div>
              <div class="desc">The Social Security Act was signed, formalizing the collection of name data as part of the federal record-keeping system.</div>
            </div>
            <div class="timeline-item">
              <div class="year">1980s–1990s</div>
              <div class="desc">SSA began releasing historical name data to the public, enabling researchers and parents to explore naming trends across decades.</div>
            </div>
            <div class="timeline-item">
              <div class="year">Today</div>
              <div class="desc">The dataset now spans 145 years and over 375 million individual records. Nameverse Hub makes this data accessible alongside etymological context for every name.</div>
            </div>
          </div>

          <h2>What We Don't Do</h2>
          <p>We don't invent name meanings. If a name's etymology is disputed or unclear, we present what established sources say and note the uncertainty. We don't fabricate popularity statistics — every number comes from SSA records. We don't claim expertise we don't have; our etymological content is researched, not invented.</p>

          <p>We also don't rank names or tell you which name is "best." We present the data and the research so you can draw your own conclusions.</p>

          <h2>Contact</h2>
          <p>If you've found an error in our data or etymological content, or if you have a question about the project, reach out at <a href="mailto:hello@nameversehub.com" style="color:var(--gold-dark);text-decoration:none;">hello@nameversehub.com</a>.</p>

        </div>

        <aside class="sidebar">
          <div class="sidebar-card">
            <h3>Quick Facts</h3>
            <ul>
              <li><strong>Names indexed:</strong> 105,966</li>
              <li><strong>Data source:</strong> US SSA (public domain)</li>
              <li><strong>Years covered:</strong> 1880–2025</li>
              <li><strong>Total records:</strong> 375,362,447</li>
              <li><strong>Updated:</strong> Annually, after SSA release</li>
            </ul>
          </div>

          <div class="sidebar-card">
            <h3>How to Use This Site</h3>
            <ul>
              <li>Search any name in the search bar</li>
              <li>Browse by origin, meaning, or popularity</li>
              <li>View interactive trend charts for each name</li>
              <li>Compare names using the data panels</li>
            </ul>
            <a href="/names" class="cta-link">Browse all names →</a>
          </div>

          <div class="sidebar-card">
            <h3>Data Transparency</h3>
            <ul>
              <li>All popularity data: US SSA public records</li>
              <li>Etymology: researched, not fabricated</li>
              <li>Uncertain origins: explicitly noted</li>
              <li>No invented statistics, ever</li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="container">
      <p>&copy; 2026 Nameverse Hub. Name data sourced from the <a href="https://www.ssa.gov/oact/babynames/limits.html" target="_blank">US Social Security Administration</a>.</p>
    </div>
  </footer>

</body>
</html>

`;

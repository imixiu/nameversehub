// Auto-generated homepage HTML for NameverseHub
export const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nameverse Hub - Discover the Story Behind Every Name</title>
  <meta name="description" content="Explore 105,000+ name meanings and origins, backed by real US Social Security data from 1880–2025. Discover the true story and historical popularity behind every name.">
  <meta name="msvalidate.01" content="C396E9907374E29FB46754412E4E3FB7" />
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
      --rose: #C4727F;
      --blue: #5B8DB8;
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

    /* HERO */
    .hero {
      padding: 80px 0 60px;
      text-align: center;
      background: linear-gradient(180deg, var(--white) 0%, var(--ivory) 100%);
    }
    .hero-eyebrow {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 16px;
    }
    .hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: 52px;
      font-weight: 700;
      color: var(--navy);
      line-height: 1.2;
      margin-bottom: 16px;
    }
    .hero-sub {
      font-size: 18px;
      color: var(--text-light);
      max-width: 560px;
      margin: 0 auto 40px;
      line-height: 1.7;
    }

    /* SEARCH */
    .search-wrap {
      max-width: 600px;
      margin: 0 auto;
      position: relative;
    }
    .search-wrap input {
      width: 100%;
      padding: 18px 60px 18px 24px;
      font-size: 17px;
      font-family: 'Inter', sans-serif;
      border: 2px solid var(--border);
      border-radius: 12px;
      background: var(--white);
      color: var(--text);
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .search-wrap input:focus {
      border-color: var(--gold);
      box-shadow: 0 0 0 4px rgba(196, 155, 92, 0.1);
    }
    .search-wrap input::placeholder { color: #B0A89E; }
    .search-btn {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      border: none;
      border-radius: 10px;
      background: var(--gold);
      color: white;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    .search-btn:hover { background: var(--gold-dark); }
    .search-suggestions {
      margin-top: 12px;
      font-size: 13px;
      color: var(--text-light);
    }
    .search-suggestions a {
      color: var(--gold-dark);
      text-decoration: none;
      margin: 0 6px;
    }
    .search-suggestions a:hover { text-decoration: underline; }

    /* STATS BAND */
    .stats-band {
      background: var(--navy);
      padding: 32px 0;
      margin: 0;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      text-align: center;
    }
    .stat-item .stat-num {
      font-family: 'Playfair Display', serif;
      font-size: 32px;
      font-weight: 700;
      color: var(--gold-light);
    }
    .stat-item .stat-label {
      font-size: 13px;
      color: rgba(255,255,255,0.7);
      margin-top: 4px;
    }

    /* BROWSE SECTION */
    .browse-section {
      padding: 64px 0;
    }
    .section-header {
      text-align: center;
      margin-bottom: 48px;
    }
    .section-header h2 {
      font-family: 'Playfair Display', serif;
      font-size: 32px;
      color: var(--navy);
      margin-bottom: 8px;
    }
    .section-header p {
      font-size: 15px;
      color: var(--text-light);
    }

    .browse-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .browse-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 28px;
      text-decoration: none;
      color: var(--text);
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .browse-card:hover {
      border-color: var(--gold);
      box-shadow: 0 4px 20px rgba(196, 155, 92, 0.1);
    }
    .browse-card h3 {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      color: var(--navy);
      margin-bottom: 8px;
    }
    .browse-card p {
      font-size: 14px;
      color: var(--text-light);
      line-height: 1.6;
    }
    .browse-card .card-count {
      display: inline-block;
      margin-top: 12px;
      font-size: 12px;
      font-weight: 600;
      color: var(--gold-dark);
      background: rgba(196, 155, 92, 0.1);
      padding: 4px 10px;
      border-radius: 20px;
    }

    /* TOP NAMES TABLE */
    .top-section {
      padding: 0 0 64px;
    }
    .names-table-wrap {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
    }
    .names-table {
      width: 100%;
      border-collapse: collapse;
    }
    .names-table th {
      background: var(--cream);
      padding: 12px 20px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-light);
      border-bottom: 1px solid var(--border);
    }
    .names-table td {
      padding: 14px 20px;
      font-size: 15px;
      border-bottom: 1px solid var(--border);
    }
    .names-table tr:last-child td { border-bottom: none; }
    .names-table tr:hover td { background: var(--cream); }
    .names-table .name-link {
      font-weight: 600;
      color: var(--navy);
      text-decoration: none;
    }
    .names-table .name-link:hover { color: var(--gold); }
    .names-table .origin-tag {
      font-size: 12px;
      color: var(--gold-dark);
      background: rgba(196, 155, 92, 0.1);
      padding: 2px 8px;
      border-radius: 4px;
    }
    .names-table .count-num {
      font-variant-numeric: tabular-nums;
      color: var(--text-light);
    }
    .names-table .gender-badge {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 6px;
    }
    .gender-f { background: var(--rose); }
    .gender-m { background: var(--blue); }

    /* NAME OF THE DAY */
    .notd-section {
      padding: 0 0 64px;
    }
    .notd-card {
      background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
      border-radius: 16px;
      padding: 48px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
    }
    .notd-left .notd-label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--gold-light);
      margin-bottom: 12px;
    }
    .notd-left .notd-name {
      font-family: 'Playfair Display', serif;
      font-size: 48px;
      font-weight: 700;
      color: white;
      margin-bottom: 8px;
    }
    .notd-left .notd-meaning {
      font-size: 18px;
      color: rgba(255,255,255,0.8);
      margin-bottom: 16px;
    }
    .notd-left .notd-origin {
      font-size: 14px;
      color: rgba(255,255,255,0.6);
    }
    .notd-right {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .notd-stat {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 10px;
      padding: 16px;
      text-align: center;
    }
    .notd-stat .num {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      font-weight: 700;
      color: var(--gold-light);
    }
    .notd-stat .label {
      font-size: 12px;
      color: rgba(255,255,255,0.6);
      margin-top: 4px;
    }
    .notd-link {
      grid-column: 1 / -1;
      text-align: center;
      margin-top: 8px;
    }
    .notd-link a {
      color: var(--gold-light);
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
    }
    .notd-link a:hover { text-decoration: underline; }

    /* DATA CTA */
    .data-cta {
      padding: 0 0 80px;
    }
    .data-cta-inner {
      background: var(--cream);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 48px;
      text-align: center;
    }
    .data-cta-inner h2 {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      color: var(--navy);
      margin-bottom: 12px;
    }
    .data-cta-inner p {
      font-size: 15px;
      color: var(--text-light);
      max-width: 500px;
      margin: 0 auto 24px;
    }
    .data-cta-inner .cta-btn {
      display: inline-block;
      padding: 12px 32px;
      background: var(--navy);
      color: white;
      font-size: 14px;
      font-weight: 600;
      border-radius: 8px;
      text-decoration: none;
      transition: background 0.2s;
    }
    .data-cta-inner .cta-btn:hover { background: var(--navy-light); }

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
      .hero h1 { font-size: 36px; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .browse-grid { grid-template-columns: 1fr; }
      .notd-card { grid-template-columns: 1fr; gap: 32px; padding: 32px; }
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
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <div class="hero-eyebrow">105,966 Names &middot; 145 Years of Data</div>
      <h1>Every Name Has a Story</h1>
      <p class="hero-sub">Discover the meaning, origin, and real historical popularity of any name. Backed by US Social Security data since 1880.</p>
      <div class="search-wrap">
        <input type="text" id="nameSearch" placeholder="Search any name..." autocomplete="off">
        <button class="search-btn" onclick="searchName()">&#8594;</button>
      </div>
      <div class="search-suggestions">
        Try:
        <a href="/names/james">James</a>
        <a href="/names/olivia">Olivia</a>
        <a href="/names/muhammad">Muhammad</a>
        <a href="/names/sakura">Sakura</a>
      </div>
    </div>
  </section>

  <!-- STATS BAND -->
  <section class="stats-band">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-num">105,966</div>
          <div class="stat-label">Unique Names</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">1880–2025</div>
          <div class="stat-label">Years Covered</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">375M+</div>
          <div class="stat-label">Records Analyzed</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">100+</div>
          <div class="stat-label">Cultural Origins</div>
        </div>
      </div>
    </div>
  </section>

  <!-- BROWSE -->
  <section class="browse-section">
    <div class="container">
      <div class="section-header">
        <h2>Browse Names</h2>
        <p>Explore by origin, meaning, or popularity</p>
      </div>
      <div class="browse-grid">
        <a href="/origins" class="browse-card">
          <h3>By Origin</h3>
          <p>Hebrew, Latin, Celtic, Arabic, Japanese, and 100+ cultural origins.</p>
          <span class="card-count">120+ Origins</span>
        </a>
        <a href="/meanings" class="browse-card">
          <h3>By Meaning</h3>
          <p>Find names meaning brave, wisdom, light, nature, love, and more.</p>
          <span class="card-count">200+ Meanings</span>
        </a>
        <a href="/trends" class="browse-card">
          <h3>By Popularity</h3>
          <p>See which names are rising, falling, or timeless across 145 years.</p>
          <span class="card-count">Updated 2025</span>
        </a>
      </div>
    </div>
  </section>

  <!-- TOP NAMES TABLE -->
  <section class="top-section">
    <div class="container">
      <div class="section-header">
        <h2>Most Popular Names of All Time</h2>
        <p>Based on US Social Security data, 1880–2025</p>
      </div>
      <div class="names-table-wrap">
        <table class="names-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Origin</th>
              <th>Meaning</th>
              <th>Total People</th>
              <th>Peak Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><a href="/names/james" class="name-link"><span class="gender-badge gender-m"></span>James</a></td>
              <td><span class="origin-tag">Hebrew</span></td>
              <td>Supplanter</td>
              <td class="count-num">5,274,520</td>
              <td>1947</td>
            </tr>
            <tr>
              <td>2</td>
              <td><a href="/names/john" class="name-link"><span class="gender-badge gender-m"></span>John</a></td>
              <td><span class="origin-tag">Hebrew</span></td>
              <td>God is gracious</td>
              <td class="count-num">5,204,377</td>
              <td>1947</td>
            </tr>
            <tr>
              <td>3</td>
              <td><a href="/names/robert" class="name-link"><span class="gender-badge gender-m"></span>Robert</a></td>
              <td><span class="origin-tag">Germanic</span></td>
              <td>Bright fame</td>
              <td class="count-num">4,869,849</td>
              <td>1947</td>
            </tr>
            <tr>
              <td>4</td>
              <td><a href="/names/michael" class="name-link"><span class="gender-badge gender-m"></span>Michael</a></td>
              <td><span class="origin-tag">Hebrew</span></td>
              <td>Who is like God</td>
              <td class="count-num">4,448,633</td>
              <td>1957</td>
            </tr>
            <tr>
              <td>5</td>
              <td><a href="/names/william" class="name-link"><span class="gender-badge gender-m"></span>William</a></td>
              <td><span class="origin-tag">Germanic</span></td>
              <td>Resolute protector</td>
              <td class="count-num">4,215,725</td>
              <td>1947</td>
            </tr>
            <tr>
              <td>6</td>
              <td><a href="/names/mary" class="name-link"><span class="gender-badge gender-f"></span>Mary</a></td>
              <td><span class="origin-tag">Hebrew</span></td>
              <td>Beloved</td>
              <td class="count-num">4,156,654</td>
              <td>1921</td>
            </tr>
            <tr>
              <td>7</td>
              <td><a href="/names/david" class="name-link"><span class="gender-badge gender-m"></span>David</a></td>
              <td><span class="origin-tag">Hebrew</span></td>
              <td>Beloved</td>
              <td class="count-num">3,689,613</td>
              <td>1955</td>
            </tr>
            <tr>
              <td>8</td>
              <td><a href="/names/joseph" class="name-link"><span class="gender-badge gender-m"></span>Joseph</a></td>
              <td><span class="origin-tag">Hebrew</span></td>
              <td>He will add</td>
              <td class="count-num">2,680,213</td>
              <td>1956</td>
            </tr>
            <tr>
              <td>9</td>
              <td><a href="/names/richard" class="name-link"><span class="gender-badge gender-m"></span>Richard</a></td>
              <td><span class="origin-tag">Germanic</span></td>
              <td>Brave power</td>
              <td class="count-num">2,587,082</td>
              <td>1946</td>
            </tr>
            <tr>
              <td>10</td>
              <td><a href="/names/charles" class="name-link"><span class="gender-badge gender-m"></span>Charles</a></td>
              <td><span class="origin-tag">Germanic</span></td>
              <td>Free man</td>
              <td class="count-num">2,447,135</td>
              <td>1947</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- NAME OF THE DAY -->
  <section class="notd-section">
    <div class="container">
      <div class="notd-card">
        <div class="notd-left">
          <div class="notd-label">Name of the Day</div>
          <div class="notd-name">Aurelia</div>
          <div class="notd-meaning">"The golden one"</div>
          <div class="notd-origin">Latin origin &middot; Female &middot; First recorded 1880</div>
        </div>
        <div class="notd-right">
          <div class="notd-stat">
            <div class="num">18,435</div>
            <div class="label">Total since 1880</div>
          </div>
          <div class="notd-stat">
            <div class="num">1,056</div>
            <div class="label">Peak in 2025</div>
          </div>
          <div class="notd-stat">
            <div class="num">Rising</div>
            <div class="label">All-time high</div>
          </div>
          <div class="notd-stat">
            <div class="num">Latin</div>
            <div class="label">Origin</div>
          </div>
          <div class="notd-link">
            <a href="/names/aurelia">Read the full story &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- DATA CTA -->
  <section class="data-cta">
    <div class="container">
      <div class="data-cta-inner">
        <h2>Backed by Real Data</h2>
        <p>Every name includes actual US Social Security records — not estimates. See exactly how many people share your name and when it was most popular.</p>
        <a href="/names" class="cta-btn">Explore All 105,966 Names</a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="container">
      <p>&copy; 2026 nameversehub.com &middot; Data sourced from <a href="https://www.ssa.gov/oact/babynames/" target="_blank">US Social Security Administration</a> &middot; EST. 2026</p>
    </div>
  </footer>

  <script>
    function searchName() {
      const input = document.getElementById('nameSearch');
      const name = input.value.trim().toLowerCase();
      if (name) {
        window.location.href = '/names/' + encodeURIComponent(name);
      }
    }
    document.getElementById('nameSearch').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') searchName();
    });
  </script>

</body>
</html>

`;

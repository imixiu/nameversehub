import { getTaxonomyCounts, getArticlesByTagFragment, getArticleCountByTagFragment } from "./db";
import { HEADER_HTML, FOOTER_HTML } from "./templates";

// ── Label maps ──

const ORIGIN_LABELS: Record<string, string> = {
  arabic: "Arabic", hebrew: "Hebrew", persian: "Persian", turkish: "Turkish",
  kurdish: "Kurdish", aramaic: "Aramaic", assyrian: "Assyrian", phoenician: "Phoenician",
  german: "German", english: "English", dutch: "Dutch", scandinavian: "Scandinavian",
  norse: "Norse", anglo: "Anglo", latin: "Latin", french: "French",
  italian: "Italian", spanish: "Spanish", portuguese: "Portuguese", romanian: "Romanian",
  celtic: "Celtic", irish: "Irish", scottish: "Scottish", welsh: "Welsh",
  breton: "Breton", cornish: "Cornish", slavic: "Slavic", russian: "Russian",
  polish: "Polish", czech: "Czech", ukrainian: "Ukrainian", serbian: "Serbian",
  bulgarian: "Bulgarian", slovak: "Slovak", lithuanian: "Lithuanian", latvian: "Latvian",
  greek: "Greek", basque: "Basque", hungarian: "Hungarian", albanian: "Albanian",
  estonian: "Estonian", georgian: "Georgian", armenian: "Armenian",
  chinese: "Chinese", japanese: "Japanese", korean: "Korean", mongolian: "Mongolian",
  tibetan: "Tibetan", sanskrit: "Sanskrit", hindi: "Hindi", tamil: "Tamil",
  telugu: "Telugu", bengali: "Bengali", urdu: "Urdu", punjabi: "Punjabi",
  marathi: "Marathi", gujarati: "Gujarati", nepali: "Nepali", sinhalese: "Sinhalese",
  burmese: "Burmese", thai: "Thai", khmer: "Khmer", vietnamese: "Vietnamese",
  malay: "Malay", filipino: "Filipino", kazakh: "Kazakh", uzbek: "Uzbek",
  tajik: "Tajik", pashto: "Pashto",
  african: "African", swahili: "Swahili", yoruba: "Yoruba", igbo: "Igbo",
  hausa: "Hausa", zulu: "Zulu", amharic: "Amharic", somali: "Somali",
  berber: "Berber", akan: "Akan", shona: "Shona",
  polynesian: "Polynesian", aboriginal: "Aboriginal",
  native_american: "Native American", quechua: "Quechua", nahuatl: "Nahuatl", mayan: "Mayan",
};

const MEANING_LABELS: Record<string, string> = {
  light: "Light & Radiance", dark: "Dark & Night", fire: "Fire & Flame",
  water: "Water & Sea", earth: "Earth & Stone", wind: "Wind & Sky",
  nature: "Nature & Wild", flower: "Flowers & Bloom", animal: "Animals & Beasts",
  bird: "Birds & Flight", strength: "Strength & Power", brave: "Bravery & Courage",
  wisdom: "Wisdom & Knowledge", love: "Love & Heart", beauty: "Beauty & Grace",
  peace: "Peace & Calm", joy: "Joy & Happiness", hope: "Hope & Faith",
  victory: "Victory & Triumph", noble: "Noble & Royal", war: "War & Battle",
  god: "Divine & Sacred", moon: "Moon & Stars", gold: "Gold & Treasure",
  music: "Music & Poetry", life: "Life & Vitality", death: "Death & Mortality",
  time: "Time & Eternity", travel: "Travel & Journey", craft: "Craft & Creation",
  healing: "Healing & Care", protection: "Protection & Guard", leadership: "Leadership & Rule",
  freedom: "Freedom & Liberty", honor: "Honor & Glory", purity: "Purity & Innocence",
  abundance: "Abundance & Wealth", swift: "Speed & Swiftness", quiet: "Quiet & Stillness",
};

const TREND_LABELS: Record<string, string> = {
  rising: "Rising Stars", popular: "Popular Picks", timeless: "Timeless Classics",
  classic: "Vintage Classics", declining: "Declining", rare: "Rare & Unique",
  established: "Established", uncommon: "Uncommon",
};

const DIMENSION_META: Record<string, { title: string; description: string; label: string }> = {
  origins: {
    title: "Names by Origin - Hebrew, Latin, Celtic, Arabic & More | NameverseHub",
    description: "Explore baby names organized by cultural origin. Discover names from 100+ cultures worldwide.",
    label: "Names by Origin",
  },
  meanings: {
    title: "Names by Meaning - Brave, Wisdom, Light, Love & More | NameverseHub",
    description: "Find baby names by their meaning. Browse names across 40+ meaning categories.",
    label: "Names by Meaning",
  },
  trends: {
    title: "Name Popularity Trends - Rising, Classic & Rare Names | NameverseHub",
    description: "See which baby names are rising, timeless, or rare based on 145 years of US Social Security data.",
    label: "Name Trends",
  },
};

function getLabelMap(dimension: string): Record<string, string> {
  if (dimension === "origins") return ORIGIN_LABELS;
  if (dimension === "meanings") return MEANING_LABELS;
  return TREND_LABELS;
}

function formatLabel(value: string, labelMap: Record<string, string>): string {
  return labelMap[value] || value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ");
}

// ── Renderers ──

export async function renderTaxonomyIndex(dimension: string, reqUrl: string): Promise<Response> {
  const meta = DIMENSION_META[dimension] || DIMENSION_META.origins;
  const labelMap = getLabelMap(dimension);
  const tagPrefix = dimension === "origins" ? "origin" : dimension === "meanings" ? "meaning" : "trend";

  try {
    const taxonomies = await getTaxonomyCounts(tagPrefix);

    const header = HEADER_HTML
      .replace(/{{TITLE}}/g, meta.title)
      .replace(/{{DESCRIPTION}}/g, meta.description)
      .replace(/{{CANONICAL}}/g, `https://nameversehub.com/${dimension}`)
      .replace(/{{OG_IMAGE}}/g, "");

    let cardsHtml = '<div class="taxonomy-grid">';
    for (const t of taxonomies) {
      const label = formatLabel(t.value, labelMap);
      cardsHtml += `<a href="/${dimension}/${t.value}" class="taxonomy-card">
        <h3>${label}</h3>
        <span class="taxonomy-count">${t.count.toLocaleString()} names</span>
      </a>`;
    }
    cardsHtml += "</div>";

    const totalNames = taxonomies.reduce((s, t) => s + t.count, 0);

    const html = header + `
      <div class="container">
        <div class="breadcrumb"><a href="/">Home</a><span class="sep">/</span>${meta.label}</div>
        <div class="category-header">
          <h1>${meta.label}</h1>
          <p>${meta.description}</p>
        </div>
        <div class="taxonomy-summary">
          <strong>${taxonomies.length}</strong> categories &middot; <strong>${totalNames.toLocaleString()}</strong> total name-tag associations
        </div>
        ${cardsHtml}
      </div>
    ` + FOOTER_HTML;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (e: any) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}

export async function renderTaxonomyValuePage(
  dimension: string,
  value: string,
  page: number,
): Promise<Response> {
  const tagPrefix = dimension === "origins" ? "origin" : dimension === "meanings" ? "meaning" : "trend";
  const tagFragment = `${tagPrefix}:${value}`;
  const labelMap = getLabelMap(dimension);
  const label = formatLabel(value, labelMap);
  const dimMeta = DIMENSION_META[dimension] || DIMENSION_META.origins;

  const title = `${label} Names - ${dimMeta.label} | NameverseHub`;
  const description = `Browse ${label.toLowerCase()} baby names with meanings, origins, and popularity data.`;
  const canonical = page === 1
    ? `https://nameversehub.com/${dimension}/${value}`
    : `https://nameversehub.com/${dimension}/${value}/page/${page}`;

  try {
    const articles = await getArticlesByTagFragment(tagFragment, page);
    const total = await getArticleCountByTagFragment(tagFragment);
    const totalPages = Math.ceil(total / 20);

    const header = HEADER_HTML
      .replace(/{{TITLE}}/g, title)
      .replace(/{{DESCRIPTION}}/g, description)
      .replace(/{{CANONICAL}}/g, canonical)
      .replace(/{{OG_IMAGE}}/g, "");

    let articlesHtml = "";
    if (articles.length === 0) {
      articlesHtml = '<div style="text-align:center;padding:64px 24px;color:var(--text-light)"><h2>No Names Found</h2><p>No names match this category yet.</p></div>';
    } else {
      articlesHtml = '<div class="article-grid">';
      for (const a of articles) {
        const coverImg = a.cover_img ? `<img src="${a.cover_img}" alt="${a.title}" loading="lazy">` : "";
        const excerpt = a.description ? a.description.substring(0, 100) + "..." : "";
        articlesHtml += `<a href="/names/${a.short_title}" class="article-card">
          ${coverImg}
          <div class="card-body">
            <h2>${a.title}</h2>
            <p>${excerpt}</p>
          </div>
        </a>`;
      }
      articlesHtml += "</div>";

      if (totalPages > 1) {
        articlesHtml += '<div class="pagination">';
        const base = `/${dimension}/${value}`;
        if (page > 1) articlesHtml += `<a href="${base}/page/${page - 1}">&larr;</a>`;
        for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
          if (i === page) {
            articlesHtml += `<span class="active">${i}</span>`;
          } else {
            articlesHtml += `<a href="${base}/page/${i}">${i}</a>`;
          }
        }
        if (page < totalPages) articlesHtml += `<a href="${base}/page/${page + 1}">&rarr;</a>`;
        articlesHtml += "</div>";
      }
    }

    const html = header + `
      <div class="container">
        <div class="breadcrumb"><a href="/">Home</a><span class="sep">/</span><a href="/${dimension}">${dimMeta.label}</a><span class="sep">/</span>${label}</div>
        <div class="category-header">
          <h1>${label} Names</h1>
          <p>${total.toLocaleString()} names found</p>
        </div>
        ${articlesHtml}
      </div>
    ` + FOOTER_HTML;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (e: any) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}

// CSS for taxonomy grid (injected into header)
export const TAXONOMY_CSS = `
.taxonomy-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding-bottom: 48px;
}
.taxonomy-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 20px;
  text-decoration: none;
  color: var(--text);
  transition: border-color 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.taxonomy-card:hover {
  border-color: var(--gold);
  box-shadow: 0 4px 16px rgba(196,155,92,0.1);
}
.taxonomy-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 17px;
  color: var(--navy);
  margin: 0;
}
.taxonomy-count {
  font-size: 13px;
  font-weight: 500;
  color: var(--gold-dark);
}
.taxonomy-summary {
  text-align: center;
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 32px;
}
@media (max-width: 768px) {
  .taxonomy-grid { grid-template-columns: repeat(2, 1fr); }
}
`;

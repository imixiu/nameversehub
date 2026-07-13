export const TYPE_SEO: Record<string, { title: string; description: string; label: string }> = {
  "names": {
    title: "All Names - Baby Name Meanings & Origins | NameverseHub",
    description: "Browse 105,000+ baby names with meanings, origins, and real US Social Security popularity data from 1880 to 2025.",
    label: "All Names"
  },
  "origins": {
    title: "Names by Origin - Hebrew, Latin, Celtic, Arabic & More | NameverseHub",
    description: "Explore baby names organized by cultural origin. Discover names from Hebrew, Latin, Celtic, Arabic, Japanese, and 100+ cultures.",
    label: "By Origin"
  },
  "meanings": {
    title: "Names by Meaning - Brave, Wisdom, Light, Love & More | NameverseHub",
    description: "Find baby names by their meaning. Browse names meaning brave, wisdom, light, nature, love, and 200+ other meanings.",
    label: "By Meaning"
  },
  "trends": {
    title: "Name Popularity Trends - Rising & Falling Names | NameverseHub",
    description: "See which baby names are rising, falling, or timeless across 145 years of US Social Security data. Updated for 2025.",
    label: "Trends"
  },
  "about": {
    title: "About NameverseHub - Our Mission & Data Sources",
    description: "Learn about NameverseHub's mission to document every name's story using real US Social Security data from 1880 to 2025.",
    label: "About"
  }
};

export function getTypeSeo(type: string) {
  return TYPE_SEO[type] || {
    title: `${type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ')} | NameverseHub`,
    description: `Explore ${type.replace(/-/g, ' ')} names with meanings, origins, and popularity data.`,
    label: type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ')
  };
}

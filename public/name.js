/* Nameverse Hub - Name Page Scripts
 * Handles: SSA chart rendering, gender bar, dynamic stats, OG image generation
 * Requires: Chart.js (loaded via CDN in page head)
 */

(function() {
  'use strict';

  /* ============================================
     COLOR PALETTE
     ============================================ */
  const COLORS = {
    F: '#E91E8C',
    M: '#3B82F6',
    grid: '#E8E3DC',
    text: '#6B6B6B',
    navy: '#1B2A4A',
    gold: '#C49B5C'
  };

  /* ============================================
     DATA LOADING
     ============================================ */
  const dataCache = {};

  async function loadNameData(slug) {
    if (dataCache[slug]) return dataCache[slug];
    try {
      const resp = await fetch('/data/names/' + slug + '.json');
      if (!resp.ok) return null;
      const data = await resp.json();
      dataCache[slug] = data;
      return data;
    } catch (e) {
      console.warn('[nameversehub] Failed to load SSA data for ' + slug + ':', e);
      return null;
    }
  }

  /* ============================================
     FORMAT HELPERS
     ============================================ */
  function formatCount(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toLocaleString();
  }

  function formatYear(y) {
    return y || 'N/A';
  }

  /* ============================================
     POPULATE STAT CARDS (optional dynamic mode)
     If .ssa-stat-number elements have data-field attributes,
     populate them from the JSON instead of relying on
     server-rendered values.
     ============================================ */
  function populateStats(container, data) {
    const fields = container.querySelectorAll('[data-field]');
    fields.forEach(function(el) {
      const field = el.dataset.field;
      switch (field) {
        case 'total_count':
          el.textContent = formatCount(data.total_count);
          break;
        case 'peak_count':
          el.textContent = formatCount(data.peak_count);
          break;
        case 'peak_year':
          el.textContent = formatYear(data.peak_year);
          break;
        case 'first_appearance':
          el.textContent = formatYear(data.first_appearance);
          break;
        case 'last_appearance':
          el.textContent = formatYear(data.last_appearance);
          break;
        case 'name':
          el.textContent = data.name;
          break;
      }
    });
  }

  /* ============================================
     GENDER SPLIT BAR
     ============================================ */
  function renderGenderBar(container, data) {
    const bar = container.querySelector('.ssa-gender-bar');
    const labels = container.querySelector('.ssa-gender-labels');
    if (!bar || !data.gender_split) return;

    const total = (data.gender_split.F || 0) + (data.gender_split.M || 0);
    if (total === 0) return;

    const fPct = ((data.gender_split.F / total) * 100).toFixed(1);
    const mPct = ((data.gender_split.M / total) * 100).toFixed(1);

    const fBar = bar.querySelector('.ssa-gender-f');
    const mBar = bar.querySelector('.ssa-gender-m');
    if (fBar) fBar.style.width = fPct + '%';
    if (mBar) mBar.style.width = mPct + '%';

    if (labels) {
      labels.innerHTML =
        '<span>Female ' + fPct + '% (' + formatCount(data.gender_split.F || 0) + ')</span>' +
        '<span>Male ' + mPct + '% (' + formatCount(data.gender_split.M || 0) + ')</span>';
    }
  }

  /* ============================================
     CHART RENDERING
     ============================================ */
  function renderChart(canvas, data) {
    if (typeof Chart === 'undefined') {
      console.warn('[nameversehub] Chart.js not loaded');
      return;
    }

    const ctx = canvas.getContext('2d');
    const fData = (data.yearly_data && data.yearly_data.F) || [];
    const mData = (data.yearly_data && data.yearly_data.M) || [];

    // Merge and sort years
    const allYears = new Set();
    fData.forEach(function(d) { allYears.add(d.year); });
    mData.forEach(function(d) { allYears.add(d.year); });
    const years = Array.from(allYears).sort(function(a, b) { return a - b; });

    const fCounts = years.map(function(y) {
      var entry = fData.find(function(d) { return d.year === y; });
      return entry ? entry.count : 0;
    });

    const mCounts = years.map(function(y) {
      var entry = mData.find(function(d) { return d.year === y; });
      return entry ? entry.count : 0;
    });

    // Determine which datasets to show
    const datasets = [];
    const hasF = data.gender_split && data.gender_split.F > 0;
    const hasM = data.gender_split && data.gender_split.M > 0;

    if (hasF) {
      datasets.push({
        label: 'Female',
        data: fCounts,
        borderColor: COLORS.F,
        backgroundColor: COLORS.F + '15',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: COLORS.F,
        borderWidth: 2
      });
    }

    if (hasM) {
      datasets.push({
        label: 'Male',
        data: mCounts,
        borderColor: COLORS.M,
        backgroundColor: COLORS.M + '15',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: COLORS.M,
        borderWidth: 2
      });
    }

    // Detect dark mode
    var isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var gridColor = isDark ? '#2A2D3A' : COLORS.grid;
    var textColor = isDark ? '#9CA3AF' : COLORS.text;

    new Chart(ctx, {
      type: 'line',
      data: { labels: years, datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: datasets.length > 1,
            position: 'top',
            labels: {
              color: textColor,
              usePointStyle: true,
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: isDark ? '#1A1D28' : '#FFFFFF',
            titleColor: isDark ? '#F3EFE9' : COLORS.navy,
            bodyColor: isDark ? '#D1D5DB' : '#3A3A3A',
            borderColor: isDark ? '#2A2D3A' : COLORS.grid,
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
              label: function(ctx) {
                return ctx.dataset.label + ': ' + ctx.parsed.y.toLocaleString() + ' babies';
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year',
              color: textColor
            },
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              maxTicksLimit: 10,
              maxRotation: 0,
              callback: function(val) {
                return this.getLabelForValue(val);
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of babies',
              color: textColor
            },
            grid: { color: gridColor },
            beginAtZero: true,
            ticks: {
              color: textColor,
              callback: function(val) {
                return formatCount(val);
              }
            }
          }
        }
      }
    });
  }

  /* ============================================
     INTERSECTION OBSERVER (lazy render charts)
     Only render charts when they scroll into view
     ============================================ */
  function setupLazyCharts() {
    var canvases = document.querySelectorAll('canvas.ssa-chart');
    if (!canvases.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: render all immediately
      canvases.forEach(function(canvas) {
        var slug = canvas.dataset.name;
        if (!slug) return;
        loadNameData(slug).then(function(data) {
          if (data) renderChart(canvas, data);
        });
      });
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var canvas = entry.target;
          var slug = canvas.dataset.name;
          if (!slug) return;
          loadNameData(slug).then(function(data) {
            if (data) {
              renderChart(canvas, data);
            } else {
              canvas.parentElement.innerHTML =
                '<p style="color:#6B6B6B;font-size:14px;">SSA data not available for this name.</p>';
            }
          });
          observer.unobserve(canvas);
        }
      });
    }, { rootMargin: '200px' });

    canvases.forEach(function(canvas) {
      observer.observe(canvas);
    });
  }

  /* ============================================
     INITIALIZE ALL PANELS
     ============================================ */
  async function initPanels() {
    var panels = document.querySelectorAll('.ssa-panel');

    for (var i = 0; i < panels.length; i++) {
      var panel = panels[i];
      var slug = panel.dataset.slug;
      if (!slug) continue;

      var data = await loadNameData(slug);
      if (!data) continue;

      populateStats(panel, data);
      renderGenderBar(panel, data);
    }
  }

  /* ============================================
     OG IMAGE GENERATOR
     Call generateOGImage() to create an OG image
     from the current page's name data.
     Uses canvas to render a branded image.
     ============================================ */
  function generateOGImage() {
    var canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    var ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, 1200, 630);

    // Top gold accent bar
    ctx.fillStyle = '#C49B5C';
    ctx.fillRect(0, 0, 1200, 6);

    // Brand
    ctx.fillStyle = '#6B6B6B';
    ctx.font = '500 18px Inter, sans-serif';
    ctx.fillText('nameversehub.com', 60, 60);

    // Name title
    var name = document.querySelector('.name-title');
    ctx.fillStyle = '#1B2A4A';
    ctx.font = '700 72px "Playfair Display", serif';
    ctx.fillText(name ? name.textContent : 'Name', 60, 200);

    // Subtitle
    ctx.fillStyle = '#6B6B6B';
    ctx.font = '400 22px Inter, sans-serif';
    ctx.fillText('Meaning, Origin, and Historical Popularity', 60, 250);

    // Divider
    ctx.fillStyle = '#E8E3DC';
    ctx.fillRect(60, 290, 200, 2);

    // Stats
    var slug = document.querySelector('.ssa-panel')?.dataset?.slug;
    if (slug && dataCache[slug]) {
      var data = dataCache[slug];
      ctx.fillStyle = '#3A3A3A';
      ctx.font = '600 20px Inter, sans-serif';

      var y = 340;
      ctx.fillText('Total count: ' + formatCount(data.total_count), 60, y);
      y += 36;
      ctx.fillText('Peak year: ' + formatYear(data.peak_year) + ' (' + formatCount(data.peak_count) + ' babies)', 60, y);
      y += 36;
      ctx.fillText('Data from: US Social Security Administration (1880-2025)', 60, y);
    }

    // Bottom bar
    ctx.fillStyle = '#C49B5C';
    ctx.fillRect(0, 624, 1200, 6);

    // Bottom text
    ctx.fillStyle = '#6B6B6B';
    ctx.font = '400 16px Inter, sans-serif';
    ctx.fillText('Backed by real US Social Security data', 60, 600);

    return canvas.toDataURL('image/png');
  }

  /* ============================================
     PUBLIC API
     ============================================ */
  window.NameverseHub = {
    loadNameData: loadNameData,
    generateOGImage: generateOGImage,
    formatCount: formatCount
  };

  /* ============================================
     AUTO-INIT ON DOM READY
     ============================================ */
  function init() {
    initPanels();
    setupLazyCharts();

    // Generate OG image meta if not already set
    var ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      var slug = document.querySelector('.ssa-panel')?.dataset?.slug;
      if (slug) {
        loadNameData(slug).then(function() {
          var dataUrl = generateOGImage();
          var meta = document.createElement('meta');
          meta.setAttribute('property', 'og:image');
          meta.setAttribute('content', dataUrl);
          document.head.appendChild(meta);
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();


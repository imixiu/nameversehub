/* Nameverse Hub - Name Page Scripts (v2)
 * Reads chart data from canvas data-chart attribute (inline JSON).
 * Requires: Chart.js (loaded via CDN in page head)
 */
(function() {
  'use strict';

  var COLORS = {
    F: '#E91E8C',
    M: '#3B82F6',
    grid: '#E8E3DC',
    text: '#6B6B6B',
    navy: '#1B2A4A'
  };

  function formatCount(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toLocaleString();
  }

  function renderChart(canvas, chartData) {
    if (typeof Chart === 'undefined') {
      console.warn('[nameversehub] Chart.js not loaded');
      return;
    }

    var fData = chartData.F || [];
    var mData = chartData.M || [];

    var allYears = new Set();
    fData.forEach(function(d) { allYears.add(d.year); });
    mData.forEach(function(d) { allYears.add(d.year); });
    var years = Array.from(allYears).sort(function(a, b) { return a - b; });

    var fMap = {}, mMap = {};
    fData.forEach(function(d) { fMap[d.year] = d.count; });
    mData.forEach(function(d) { mMap[d.year] = d.count; });

    var datasets = [];
    var hasF = fData.length > 0 && fData.some(function(d) { return d.count > 0; });
    var hasM = mData.length > 0 && mData.some(function(d) { return d.count > 0; });

    if (hasF) {
      datasets.push({
        label: 'Female',
        data: years.map(function(y) { return fMap[y] || 0; }),
        borderColor: COLORS.F,
        backgroundColor: COLORS.F + '15',
        fill: true, tension: 0.35, pointRadius: 0,
        pointHoverRadius: 5, pointHoverBackgroundColor: COLORS.F,
        borderWidth: 2
      });
    }
    if (hasM) {
      datasets.push({
        label: 'Male',
        data: years.map(function(y) { return mMap[y] || 0; }),
        borderColor: COLORS.M,
        backgroundColor: COLORS.M + '15',
        fill: true, tension: 0.35, pointRadius: 0,
        pointHoverRadius: 5, pointHoverBackgroundColor: COLORS.M,
        borderWidth: 2
      });
    }

    var isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var gridColor = isDark ? '#2A2D3A' : COLORS.grid;
    var textColor = isDark ? '#9CA3AF' : COLORS.text;

    new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: { labels: years, datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: datasets.length > 1,
            position: 'top',
            labels: { color: textColor, usePointStyle: true, padding: 16 }
          },
          tooltip: {
            backgroundColor: isDark ? '#1A1D28' : '#FFFFFF',
            titleColor: isDark ? '#F3EFE9' : COLORS.navy,
            bodyColor: isDark ? '#D1D5DB' : '#3A3A3A',
            borderColor: isDark ? '#2A2D3A' : COLORS.grid,
            borderWidth: 1, padding: 12, displayColors: true,
            callbacks: {
              label: function(ctx) {
                return ctx.dataset.label + ': ' + ctx.parsed.y.toLocaleString() + ' babies';
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Year', color: textColor },
            grid: { color: gridColor },
            ticks: { color: textColor, maxTicksLimit: 10, maxRotation: 0,
              callback: function(val) { return this.getLabelForValue(val); }
            }
          },
          y: {
            title: { display: true, text: 'Number of babies', color: textColor },
            grid: { color: gridColor },
            beginAtZero: true,
            ticks: { color: textColor, callback: function(v) { return formatCount(v); } }
          }
        }
      }
    });
  }

  /* Populate stats from data-field attributes using inline data */
  function populateStats(panel, chartData) {
    var fData = chartData.F || [];
    var mData = chartData.M || [];
    var totalCount = 0;
    fData.forEach(function(d) { totalCount += d.count; });
    mData.forEach(function(d) { totalCount += d.count; });

    var peakCount = 0, peakYear = '';
    fData.forEach(function(d) { if (d.count > peakCount) { peakCount = d.count; peakYear = d.year; } });

    var fields = panel.querySelectorAll('[data-field]');
    fields.forEach(function(el) {
      switch (el.dataset.field) {
        case 'total_count': el.textContent = formatCount(totalCount); break;
        case 'peak_count': el.textContent = formatCount(peakCount); break;
        case 'peak_year': el.textContent = peakYear || 'N/A'; break;
      }
    });
  }

  /* Gender bar rendering */
  function renderGenderBar(panel, chartData) {
    var bar = panel.querySelector('.ssa-gender-bar');
    if (!bar) return;
    var fTotal = 0, mTotal = 0;
    (chartData.F || []).forEach(function(d) { fTotal += d.count; });
    (chartData.M || []).forEach(function(d) { mTotal += d.count; });
    var total = fTotal + mTotal;
    if (total === 0) return;
    var fBar = bar.querySelector('.ssa-gender-f');
    var mBar = bar.querySelector('.ssa-gender-m');
    if (fBar) fBar.style.width = ((fTotal / total) * 100).toFixed(1) + '%';
    if (mBar) mBar.style.width = ((mTotal / total) * 100).toFixed(1) + '%';
    var labels = panel.querySelector('.ssa-gender-labels');
    if (labels) {
      labels.innerHTML =
        '<span>Female: ' + formatCount(fTotal) + ' (' + ((fTotal / total) * 100).toFixed(1) + '%)</span>' +
        '<span>Male: ' + formatCount(mTotal) + ' (' + ((mTotal / total) * 100).toFixed(1) + '%)</span>';
    }
  }

  /* Lazy chart rendering with IntersectionObserver */
  function setupLazyCharts() {
    var canvases = document.querySelectorAll('canvas.ssa-chart');
    if (!canvases.length) return;

    var renderOne = function(canvas) {
      var raw = canvas.getAttribute('data-chart');
      if (!raw) return;
      try {
        var chartData = JSON.parse(raw);
        renderChart(canvas, chartData);
        // Also populate stats and gender bar for parent panel
        var panel = canvas.closest('.ssa-panel');
        if (panel) {
          populateStats(panel, chartData);
          renderGenderBar(panel, chartData);
        }
      } catch (e) {
        console.warn('[nameversehub] Bad chart data:', e);
      }
    };

    if (!('IntersectionObserver' in window)) {
      canvases.forEach(renderOne);
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          renderOne(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });

    canvases.forEach(function(c) { observer.observe(c); });
  }

  function init() {
    setupLazyCharts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

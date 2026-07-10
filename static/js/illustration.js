document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // DATA
  // ==========================================
  const fileNames = [
    "targetpresentation.svg","steppingup.svg","startbuilding.svg","selectproperty.svg",
    "resumefolder.svg","presenting.svg","planning.svg","pairprogramming.svg",
    "logistic.svg","interiordesign.svg","hrpresentation.svg","careerdev.svg",
    "businessdeal.svg","aroundtheworld.svg","agreement.svg","addpost.svg","revenueanalysis.svg"
  ];

  const titleMap = {
    "targetpresentation.svg":"Target Presentation","steppingup.svg":"Stepping Up",
    "startbuilding.svg":"Start Building","selectproperty.svg":"Select Property",
    "resumefolder.svg":"Resume Folder","presenting.svg":"Presenting","planning.svg":"Planning",
    "pairprogramming.svg":"Pair Programming","logistic.svg":"Logistic",
    "interiordesign.svg":"Interior Design","hrpresentation.svg":"HR Presentation",
    "careerdev.svg":"Career Development","businessdeal.svg":"Business Deal",
    "aroundtheworld.svg":"Around The World","agreement.svg":"Agreement",
    "addpost.svg":"Add Post","revenueanalysis.svg":"Revenue Analysis"
  };

  function getCategory(f) {
    const n = f.toLowerCase();
    if (n.includes('hr') || n.includes('resume') || n.includes('career') || n.includes('presenting') || n.includes('steppingup')) return "Human Capital";
    if (n.includes('property') || n.includes('interior') || n.includes('building')) return "Property & SMB Development";
    if (n.includes('logistic') || n.includes('world')) return "Logistic";
    if (n.includes('pairprogramming')) return "Information Technology";
    if (n.includes('post') || n.includes('target')) return "Marketing";
    if (n.includes('deal') || n.includes('agreement') || n.includes('revenue')) return "Finance & Corporate Secretary";
    return "Corporate Affair";
  }

  const illustrationData = fileNames.map((f, i) => ({
    id: i + 1, fileName: f,
    title: titleMap[f] || f.replace('.svg', ''),
    category: getCategory(f)
  }));

  // ==========================================
  // RENDER (with pagination)
  // ==========================================
  const grid = document.getElementById('illustrationGrid');
  const illustrationPagination = document.getElementById('illustrationPagination');
  const ILLUSTRATIONS_PER_PAGE = 12;
  let currentIllustrationPage = 1;
  let currentIllustrationData = [];

  function renderPagination(total, perPage, currentPage, onPageChange) {
    const container = illustrationPagination;
    if (!container) return;
    const totalPages = Math.ceil(total / perPage);
    container.innerHTML = '';
    if (totalPages <= 1) return;

    const btnClass = 'w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition';
    const activeClass = 'bg-alfa-blue text-white';
    const inactiveClass = 'border border-gray-200 text-gray-600 hover:bg-gray-50';
    const disabledClass = 'border border-gray-100 text-gray-300 cursor-not-allowed';

    const prev = document.createElement('button');
    prev.className = `${btnClass} ${currentPage === 1 ? disabledClass : inactiveClass}`;
    prev.disabled = currentPage === 1;
    prev.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>';
    prev.addEventListener('click', () => onPageChange(currentPage - 1));
    container.appendChild(prev);

    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    pages.forEach(p => {
      if (p === '...') {
        const dots = document.createElement('span');
        dots.className = 'w-9 h-9 flex items-center justify-center text-gray-400 text-sm';
        dots.textContent = '…';
        container.appendChild(dots);
      } else {
        const btn = document.createElement('button');
        btn.className = `${btnClass} ${p === currentPage ? activeClass : inactiveClass}`;
        btn.textContent = p;
        btn.addEventListener('click', () => onPageChange(p));
        container.appendChild(btn);
      }
    });

    const next = document.createElement('button');
    next.className = `${btnClass} ${currentPage === totalPages ? disabledClass : inactiveClass}`;
    next.disabled = currentPage === totalPages;
    next.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>';
    next.addEventListener('click', () => onPageChange(currentPage + 1));
    container.appendChild(next);
  }

  function goToIllustrationPage(page) {
    currentIllustrationPage = page;
    const start = (page - 1) * ILLUSTRATIONS_PER_PAGE;
    const pageData = currentIllustrationData.slice(start, start + ILLUSTRATIONS_PER_PAGE);
    _renderIllustrationCards(pageData);
    renderPagination(currentIllustrationData.length, ILLUSTRATIONS_PER_PAGE, currentIllustrationPage, goToIllustrationPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function renderIllustrations(data) {
    currentIllustrationData = data;
    currentIllustrationPage = 1;
    const pageData = data.slice(0, ILLUSTRATIONS_PER_PAGE);
    await _renderIllustrationCards(pageData);
    renderPagination(data.length, ILLUSTRATIONS_PER_PAGE, currentIllustrationPage, goToIllustrationPage);
  }

  async function _renderIllustrationCards(data) {
    if (!grid) return;
    grid.innerHTML = '';
    if (data.length === 0) {
      grid.innerHTML = '<p class="col-span-full text-gray-400 py-16 text-center text-sm">No illustrations found.</p>';
      return;
    }
    for (const item of data) {
      const card = document.createElement('div');
      card.className = 'illustration-card bg-gray-50 rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all';
      card.setAttribute('data-title', item.title);
      card.setAttribute('data-filename', item.fileName);
      card.innerHTML = `
        <div class="illustration-svg-box w-full h-36 flex items-center justify-center"></div>
        <p class="text-sm font-medium text-gray-800 text-center">${item.title}</p>
      `;
      grid.appendChild(card);
      try {
        const res = await fetch(`${ILLS_BASE_URL}${item.fileName}`);
        let svgText = await res.text();
        card.querySelector('.illustration-svg-box').innerHTML = svgText;
        const svgEl = card.querySelector('.illustration-svg-box svg');
        if (svgEl) {
          svgEl.style.maxWidth = '100%';
          svgEl.style.maxHeight = '100%';
          // Mark elements with #e82e2d so we can change them later
          const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--icon-color').trim() || '#e82e2d';
          svgEl.querySelectorAll('[fill]').forEach(el => {
            const fillValue = el.getAttribute('fill');
            if (fillValue && fillValue.toLowerCase() === '#e82e2d') {
              el.setAttribute('data-original-color', '#e82e2d');
              el.setAttribute('data-original-attr', 'fill');
              el.setAttribute('fill', currentColor);
            }
          });
          svgEl.querySelectorAll('[stroke]').forEach(el => {
            const strokeValue = el.getAttribute('stroke');
            if (strokeValue && strokeValue.toLowerCase() === '#e82e2d') {
              el.setAttribute('data-original-color', '#e82e2d');
              el.setAttribute('data-original-attr', 'stroke');
              el.setAttribute('stroke', currentColor);
            }
          });
        }
      } catch (e) { console.error(e); }
    }
  }

  // ==========================================
  // PREVIEW MODAL
  // ==========================================
  let currentSvg = null, currentFilename = 'illustration';
  const previewModal = document.getElementById('previewModal');
  const previewTitle = document.getElementById('previewTitle');
  const previewImage = document.getElementById('previewImage');
  const successModal = document.getElementById('successModal');

  grid.addEventListener('click', e => {
    const card = e.target.closest('.illustration-card');
    if (!card) return;
    const svgEl = card.querySelector('.illustration-svg-box svg');
    if (!svgEl) return;
    previewTitle.textContent = card.getAttribute('data-title');
    previewImage.innerHTML = svgEl.outerHTML;
    currentSvg = previewImage.querySelector('svg');
    currentFilename = card.getAttribute('data-filename').replace('.svg', '');
    previewModal.classList.add('show');
  });

  document.getElementById('closePreviewBtn').addEventListener('click', () => previewModal.classList.remove('show'));
  previewModal.addEventListener('click', e => { if (e.target === previewModal) previewModal.classList.remove('show'); });

  function processDownload(svgNode, format, name) {
    const clone = svgNode.cloneNode(true);
    clone.setAttribute('width', '1024'); clone.setAttribute('height', '1024');
    const color = getComputedStyle(document.documentElement).getPropertyValue('--icon-color').trim() || '#e82e2d';
    // Only replace the original red color, not all colors
    let str = new XMLSerializer().serializeToString(clone);
    str = str.replace(/#e82e2d/gi, color);
    if (format === 'svg') {
      const url = URL.createObjectURL(new Blob([str], { type: 'image/svg+xml' }));
      triggerDownload(url, `${name}.svg`); URL.revokeObjectURL(url);
      showSuccess();
    } else {
      const canvas = Object.assign(document.createElement('canvas'), { width: 1024, height: 1024 });
      const img = new Image();
      img.onload = () => { canvas.getContext('2d').drawImage(img, 0, 0, 1024, 1024); triggerDownload(canvas.toDataURL('image/png'), `${name}.png`); showSuccess(); };
      img.src = 'data:image/svg+xml;base64,' + btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
    }
  }

  document.getElementById('btnDownloadSvg').addEventListener('click', () => currentSvg && processDownload(currentSvg, 'svg', currentFilename));
  document.getElementById('btnDownloadPng').addEventListener('click', () => currentSvg && processDownload(currentSvg, 'png', currentFilename));

  function triggerDownload(url, name) {
    const a = Object.assign(document.createElement('a'), { href: url, download: name });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }
  function showSuccess() { successModal.classList.add('show'); }
  document.getElementById('modalOkBtn').addEventListener('click', () => successModal.classList.remove('show'));
  successModal.addEventListener('click', e => { if (e.target === successModal) successModal.classList.remove('show'); });

  // ==========================================
  // SIDEBAR COLLAPSE
  // ==========================================
  const sidebar = document.getElementById('sidebar');
  const sidebarHeader = document.getElementById('sidebarHeader');
  const sidebarHeaderCollapsed = document.getElementById('sidebarHeaderCollapsed');
  const categoryListEl = document.getElementById('categoryList');

  document.getElementById('closeSidebarBtn').addEventListener('click', () => {
    sidebar.style.width = '60px';
    sidebarHeader.classList.add('hidden');
    sidebarHeaderCollapsed.classList.remove('hidden');
    sidebarHeaderCollapsed.classList.add('flex');
    categoryListEl.classList.add('hidden');
  });

  document.getElementById('openSidebarBtn').addEventListener('click', () => {
    sidebar.style.width = '220px';
    sidebarHeader.classList.remove('hidden');
    sidebarHeaderCollapsed.classList.add('hidden');
    sidebarHeaderCollapsed.classList.remove('flex');
    categoryListEl.classList.remove('hidden');
  });

  // ==========================================
  // CATEGORY FILTER
  // ==========================================
  const categoryItems = document.querySelectorAll('.category-item');
  const pageTitle = document.getElementById('pageTitle');
  const btnReset = document.getElementById('btnReset');
  const searchBar = document.getElementById('searchBar');

  categoryItems.forEach(item => {
    item.addEventListener('click', function () {
      categoryItems.forEach(i => {
        i.classList.remove('active', 'text-gray-900', 'font-semibold', 'bg-gray-100');
        i.classList.add('text-gray-500');
      });
      this.classList.add('active', 'text-gray-900', 'font-semibold', 'bg-gray-100');
      this.classList.remove('text-gray-500');
      pageTitle.textContent = `${this.getAttribute('data-category')} Illustrations`;
      btnReset.classList.remove('hidden');
      if (searchBar) searchBar.value = '';
      renderIllustrations(illustrationData.filter(i => i.category === this.getAttribute('data-category')));
    });
  });

  btnReset && btnReset.addEventListener('click', () => {
    categoryItems.forEach(i => {
      i.classList.remove('active', 'text-gray-900', 'font-semibold', 'bg-gray-100');
      i.classList.add('text-gray-500');
    });
    pageTitle.textContent = 'Result for Illustrations';
    btnReset.classList.add('hidden');
    if (searchBar) searchBar.value = '';
    renderIllustrations(illustrationData);
  });

  searchBar && searchBar.addEventListener('input', function () {
    const term = this.value.toLowerCase().trim();
    categoryItems.forEach(i => {
      i.classList.remove('active', 'text-gray-900', 'font-semibold', 'bg-gray-100');
      i.classList.add('text-gray-500');
    });
    if (!term) { pageTitle.textContent = 'Result for Illustrations'; btnReset.classList.add('hidden'); renderIllustrations(illustrationData); return; }
    const filtered = illustrationData.filter(i => i.title.toLowerCase().includes(term) || i.fileName.toLowerCase().includes(term));
    pageTitle.textContent = `Search results for "${this.value}"`;
    btnReset.classList.remove('hidden');
    renderIllustrations(filtered);
  });

  // ==========================================
  // COLOR PICKER — Canvas-based (HSB picker)
  // ==========================================
  const colorPickerBtn = document.getElementById('colorPickerBtn');
  const colorPickerPopup = document.getElementById('colorPickerPopup');
  const sbCanvas = document.getElementById('sbCanvas');
  const sbThumb = document.getElementById('sbThumb');
  const hueSlider = document.getElementById('hueSlider');
  const colorPreview = document.getElementById('colorPreviewCircle');
  const rInput = document.getElementById('rInput');
  const gInput = document.getElementById('gInput');
  const bInput = document.getElementById('bInput');

  // Initialize with red color (#e82e2d = rgb(232, 46, 45))
  let currentHue = 0; // Red hue
  let sbX = 0.91, sbY = 0.82; // Position for #e82e2d

  function drawSBCanvas(hue) {
    const ctx = sbCanvas.getContext('2d');
    const w = sbCanvas.width, h = sbCanvas.height;
    const gradH = ctx.createLinearGradient(0, 0, w, 0);
    gradH.addColorStop(0, '#ffffff');
    gradH.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
    ctx.fillStyle = gradH; ctx.fillRect(0, 0, w, h);
    const gradV = ctx.createLinearGradient(0, 0, 0, h);
    gradV.addColorStop(0, 'rgba(0,0,0,0)');
    gradV.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = gradV; ctx.fillRect(0, 0, w, h);
  }

  function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  }

  function hsvToRgb(h, s, v) {
    s /= 100;
    v /= 100;
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }
    
    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ];
  }

  function getColorFromSB() {
    const s = sbX * 100; // saturation 0-100
    const v = (1 - sbY) * 100; // value/brightness 0-100
    return hsvToRgb(currentHue, s, v);
  }

  function applyColor(r, g, b) {
    const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
    colorPickerBtn.style.backgroundColor = hex;
    colorPreview.style.backgroundColor = hex;
    rInput.value = r; gInput.value = g; bInput.value = b;
    document.documentElement.style.setProperty('--icon-color', hex);
    // Re-apply color to elements marked with data-original-color
    document.querySelectorAll('.illustration-svg-box svg').forEach(svg => {
      svg.querySelectorAll('[data-original-color]').forEach(el => {
        const attr = el.getAttribute('data-original-attr');
        if (attr) {
          el.setAttribute(attr, hex);
        }
      });
    });
  }

  function updateThumb() {
    const w = sbCanvas.offsetWidth || 280;
    const h = sbCanvas.offsetHeight || 180;
    sbThumb.style.left = `${sbX * w}px`;
    sbThumb.style.top = `${sbY * h}px`;
  }

  hueSlider && hueSlider.addEventListener('input', function () {
    currentHue = parseInt(this.value);
    drawSBCanvas(currentHue);
    const [r, g, b] = getColorFromSB();
    applyColor(r, g, b);
  });

  let isDraggingSB = false;
  function handleSBPick(e) {
    const rect = sbCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    sbX = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    sbY = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    updateThumb();
    const [r, g, b] = getColorFromSB();
    applyColor(r, g, b);
  }

  sbCanvas && sbCanvas.addEventListener('mousedown', e => { isDraggingSB = true; handleSBPick(e); });
  document.addEventListener('mousemove', e => { if (isDraggingSB) handleSBPick(e); });
  document.addEventListener('mouseup', () => isDraggingSB = false);
  sbCanvas && sbCanvas.addEventListener('touchstart', e => { isDraggingSB = true; handleSBPick(e); }, { passive: true });
  document.addEventListener('touchmove', e => { if (isDraggingSB) handleSBPick(e); }, { passive: true });
  document.addEventListener('touchend', () => isDraggingSB = false);

  function onRGBInput() {
    const r = Math.max(0, Math.min(255, parseInt(rInput.value) || 0));
    const g = Math.max(0, Math.min(255, parseInt(gInput.value) || 0));
    const b = Math.max(0, Math.min(255, parseInt(bInput.value) || 0));
    applyColor(r, g, b);
  }
  rInput && rInput.addEventListener('input', onRGBInput);
  gInput && gInput.addEventListener('input', onRGBInput);
  bInput && bInput.addEventListener('input', onRGBInput);

  const eyedropperBtn = document.getElementById('eyedropperBtn');
  eyedropperBtn && eyedropperBtn.addEventListener('click', async () => {
    if (!('EyeDropper' in window)) { alert('Eyedropper not supported in this browser.'); return; }
    try {
      const result = await new window.EyeDropper().open();
      const hex = result.sRGBHex;
      applyColor(parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16));
    } catch {}
  });

  // Initialize color picker with default red
  function initColorPicker() {
    sbCanvas.width = 280;
    sbCanvas.height = 180;
    drawSBCanvas(currentHue);
    updateThumb();
  }

  colorPickerBtn && colorPickerBtn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = colorPickerPopup.classList.toggle('open');
    if (isOpen) {
      requestAnimationFrame(() => {
        if (sbCanvas.width !== 280) {
          sbCanvas.width = 280;
          sbCanvas.height = 180;
        }
        drawSBCanvas(currentHue);
        updateThumb();
      });
    }
  });

  // Initialize on load
  if (colorPickerBtn && sbCanvas) {
    initColorPicker();
  }

  document.addEventListener('click', e => {
    if (colorPickerPopup && !colorPickerBtn.contains(e.target) && !colorPickerPopup.contains(e.target)) {
      colorPickerPopup.classList.remove('open');
    }
  });

  // ==========================================
  // VERSION DROPDOWN
  // ==========================================
  const versionBtn = document.getElementById('versionBtn');
  const versionMenu = document.getElementById('versionMenu');
  if (versionBtn) {
    versionBtn.addEventListener('click', e => { e.stopPropagation(); versionMenu.classList.toggle('active'); });
    document.addEventListener('click', () => versionMenu.classList.remove('active'));
  }

  // ==========================================
  // BACK TO TOP
  // ==========================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        backToTop.style.opacity = '1'; backToTop.style.visibility = 'visible'; backToTop.style.transform = 'translateY(0)';
      } else {
        backToTop.style.opacity = '0'; backToTop.style.visibility = 'hidden'; backToTop.style.transform = 'translateY(16px)';
      }
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ==========================================
  // INITIAL RENDER
  // ==========================================
  const query = new URLSearchParams(window.location.search).get('search');
  if (query && searchBar) {
    searchBar.value = query;
    const filtered = illustrationData.filter(i => i.title.toLowerCase().includes(query.toLowerCase()) || i.fileName.toLowerCase().includes(query.toLowerCase()));
    pageTitle.textContent = `Search results for "${query}"`;
    btnReset.classList.remove('hidden');
    renderIllustrations(filtered);
  } else {
    renderIllustrations(illustrationData);
  }
});

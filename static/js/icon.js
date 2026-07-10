document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // DATA ICONS
  // ==========================================
  const iconList = [
    "material-symbols_folder-rounded.svg","material-symbols_folder-outline.svg","material-symbols_folder-outline-rounded.svg",
    "material-symbols-light_home-rounded.svg","material-symbols_folder.svg","material-symbols-light_home-outline-rounded.svg",
    "material-symbols_home-rounded.svg","material-symbols_home-outline-rounded.svg","material-symbols_home.svg",
    "mdi_account-alert-outline.svg","material-symbols_home-outline.svg","mdi_account.svg","mdi_account-circle.svg",
    "mdi_account-edit.svg","mdi_account-circle-outline.svg","mdi_account-check.svg","mdi_account-check-outline.svg",
    "mdi_alert-decagram.svg","mdi_alert-decagram-outline.svg","mdi_alert-circle.svg","mdi_alert-circle-outline.svg",
    "mdi_account-edit-outline.svg","mdi_alert-outline.svg","mdi_alert-octagram.svg","mdi_alert-octagram-outline.svg",
    "mdi_alert-octagon.svg","mdi_alert-rhombus.svg","mdi_alert-rhombus-outline.svg","mdi_alert-octagon-outline.svg",
    "mdi_access-point.svg","mdi_vector-arrange-above.svg","mdi_chevron-left.svg","mdi_arrow-bottom-left.svg",
    "mdi_arrow-bottom-left-thick.svg","mdi_arrow-bottom-left-bold-outline.svg","mdi_swap-vertical-circle-outline.svg",
    "mdi_chevron-right.svg","mdi_chevron-down-circle.svg","mdi_chevron-down-circle-outline.svg","mdi_chevron-double-right.svg",
    "mdi_chevron-double-left.svg","mdi_swap-vertical-circle.svg","mdi_google.svg","mdi_google-plus.svg",
    "mdi_google-hangouts.svg","mdi_google-drive.svg","mdi_linkedin.svg","mdi_language-php.svg","mdi_language-csharp.svg",
    "mdi_language-cpp.svg","mdi_language-c.svg","mdi_instagram.svg","mdi_twitter.svg","mdi_spotify.svg",
    "mdi_language-javascript.svg","mdi_language-java.svg","mdi_apple.svg","mdi_apple-ios.svg","mdi_tablet-cellphone.svg",
    "mdi_phone.svg","mdi_phone-in-talk.svg","mdi_monitor-cellphone.svg","mdi_cellphone.svg","mdi_volume-off.svg",
    "mdi_volume-mute.svg","mdi_volume-medium.svg","mdi_volume-low.svg","mdi_volume-high.svg","mdi_pencil.svg",
    "mdi_pencil-outline.svg","mdi_palette.svg","mdi_palette-outline.svg","mdi_folder-multiple.svg",
    "mdi_folder-multiple-outline.svg","mdi_folder-account.svg","mdi_folder-account-outline.svg","mdi_file.svg",
    "mdi_file-outline.svg","mdi_close.svg","mdi_close-circle.svg","mdi_check.svg","mdi_check-circle.svg",
    "mdi_check-circle-outline.svg","mdi_map-marker.svg","mdi_map-marker-outline.svg","mdi_map-marker-multiple.svg",
    "mdi_map-marker-multiple-outline.svg","mdi_map-marker-check-outline.svg","mdi_map-marker-account.svg",
    "mdi_map-marker-account-outline.svg","mdi_close-box-outline.svg","mdi_checkbox-multiple-marked.svg",
    "mdi_checkbox-marked.svg","mdi_map-marker-radius.svg","mdi_map-marker-radius-outline.svg","mdi_bell.svg",
    "mdi_bell-ring.svg","mdi_bell-ring-outline.svg","mdi_bell-outline.svg","mdi_lightning-bolt.svg",
    "mdi_information.svg","mdi_information-outline.svg","mdi_hq.svg","mdi_heart.svg",
    "material-symbols_bookmark-rounded.svg","material-symbols_bookmark-outline-rounded.svg","mdi_trash-can.svg",
    "mdi_trash-can-outline.svg","mdi_heart-outline.svg","material-symbols_share.svg","material-symbols_share-outline.svg",
    "material-symbols_padding-outline.svg","material-symbols_copy-all-outline-rounded.svg",
    "material-symbols_background-replace-outline.svg","mdi_shape-plus-outline.svg",
    "material-symbols_insert-text-outline-rounded.svg","ic_sharp-line-weight.svg","ic_round-text-fields.svg",
    "ic_round-rotate-90-degrees-ccw.svg","ic_round-line-style.svg","mdi_notebook-outline.svg",
    "material-symbols_wall-art-outline.svg","material-symbols_shapes-outline-rounded.svg",
    "material-symbols_print-connect-outline-rounded.svg","ic_outline-photo.svg","mdi_eye-off-outline.svg",
    "material-symbols_add-rounded.svg","ic_round-minus.svg","ic_baseline-photo.svg",
    "streamline-flex_health-care-2.svg","simple-icons_uikit.svg","mdi_web.svg","mdi_target.svg",
    "mdi_head-idea-outline.svg","mdi_eye-off.svg","material-symbols_search.svg","material-symbols_mobile-outline.svg",
    "material-symbols_download-rounded.svg","ic_round-web-asset.svg","ic_outline-email.svg",
    "streamline-ultimate-color_color-palette-2.svg","radix-icons_half-2.svg","mi_filter.svg",
    "material-symbols_circle.svg","lucide-lab_floor-plan.svg","icon-park-outline_folder-success-one.svg",
    "file-icons_testcafe.svg","ph_star-half-bold.svg","mingcute_windows-fill.svg",
    "material-symbols_star-rounded.svg","material-symbols_star-outline-rounded.svg","material-symbols_android.svg",
    "icon-park-outline_star-one.svg","ic_baseline-circle.svg","tabler_arrow-right.svg","tabler_arrow-left.svg",
    "pixelarticons_sharp-corner.svg","mingcute_arrow-up-line.svg","mingcute_arrow-down-line.svg",
    "mdi_size-s.svg","mdi_size-m.svg","mdi_size-l.svg","material-symbols_rounded-corner.svg",
    "catppuccin_macos.svg","proicons_corner-radius.svg","lucide_folders.svg","grommet-icons_system.svg",
    "gg_size.svg","fluent_calendar-pattern-16-regular.svg","material-symbols_nature-people-rounded.svg",
    "iconoir_style-border.svg","fluent_orientation-24-regular.svg","vaadin_qrcode.svg",
    "flat-color-icons_lock.svg","mingcute_code-line.svg","material-symbols_logout.svg",
    "material-symbols_area-chart-outline.svg","lucide_file-code.svg","iconamoon_arrow-down-2.svg"
  ];

  function getCategory(f) {
    const n = f.toLowerCase();
    if (n.includes('account') || n.includes('user')) return "Human Capital";
    if (n.includes('map') || n.includes('location') || n.includes('target')) return "Logistic";
    if (n.includes('home') || n.includes('floor') || n.includes('wall')) return "Property & SMB Development";
    if (n.includes('language') || n.includes('code') || n.includes('windows') || n.includes('apple') || n.includes('android') || n.includes('web') || n.includes('mobile')) return "Information Technology";
    if (n.includes('instagram') || n.includes('twitter') || n.includes('linkedin') || n.includes('google') || n.includes('spotify') || n.includes('heart') || n.includes('share') || n.includes('star')) return "Marketing";
    if (n.includes('pencil') || n.includes('palette') || n.includes('shapes') || n.includes('photo') || n.includes('color')) return "Merchandising";
    if (n.includes('alert') || n.includes('check') || n.includes('close') || n.includes('bell') || n.includes('trash')) return "Operation";
    return "Corporate Affair";
  }

  const iconData = iconList.map(f => ({ fileName: f, category: getCategory(f) }));

  // ==========================================
  // RENDER ICONS (with pagination)
  // ==========================================
  const iconGrid = document.getElementById('iconGrid');
  const iconPagination = document.getElementById('iconPagination');
  const ICONS_PER_PAGE = 60;
  let currentIconPage = 1;
  let currentIconData = [];

  function renderPagination(total, perPage, currentPage, onPageChange) {
    const container = iconPagination;
    if (!container) return;
    const totalPages = Math.ceil(total / perPage);
    container.innerHTML = '';
    if (totalPages <= 1) return;

    const btnClass = 'w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition';
    const activeClass = 'bg-alfa-blue text-white';
    const inactiveClass = 'border border-gray-200 text-gray-600 hover:bg-gray-50';
    const disabledClass = 'border border-gray-100 text-gray-300 cursor-not-allowed';

    // Prev
    const prev = document.createElement('button');
    prev.className = `${btnClass} ${currentPage === 1 ? disabledClass : inactiveClass}`;
    prev.disabled = currentPage === 1;
    prev.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>';
    prev.addEventListener('click', () => onPageChange(currentPage - 1));
    container.appendChild(prev);

    // Page numbers
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

    // Next
    const next = document.createElement('button');
    next.className = `${btnClass} ${currentPage === totalPages ? disabledClass : inactiveClass}`;
    next.disabled = currentPage === totalPages;
    next.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>';
    next.addEventListener('click', () => onPageChange(currentPage + 1));
    container.appendChild(next);
  }

  function goToIconPage(page) {
    currentIconPage = page;
    const start = (page - 1) * ICONS_PER_PAGE;
    const pageData = currentIconData.slice(start, start + ICONS_PER_PAGE);
    _renderIconCards(pageData);
    renderPagination(currentIconData.length, ICONS_PER_PAGE, currentIconPage, goToIconPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderIcons(data) {
    currentIconData = data;
    currentIconPage = 1;
    const pageData = data.slice(0, ICONS_PER_PAGE);
    _renderIconCards(pageData);
    renderPagination(data.length, ICONS_PER_PAGE, currentIconPage, goToIconPage);
  }

  function _renderIconCards(data) {
    if (!iconGrid) return;
    iconGrid.innerHTML = '';
    if (data.length === 0) {
      iconGrid.innerHTML = '<p class="col-span-full text-gray-400 py-16 text-center text-sm">No icons found.</p>';
      return;
    }
    data.forEach(({ fileName }) => {
      const box = document.createElement('div');
      box.className = 'icon-box relative flex justify-center items-center p-4 rounded-xl hover:bg-gray-50 cursor-pointer group';
      box.innerHTML = `
        <div class="icon-img" style="-webkit-mask-image:url('${ICON_BASE_URL}${fileName}');mask-image:url('${ICON_BASE_URL}${fileName}');"></div>
        <div class="icon-actions bg-white rounded-lg shadow-md p-1 flex flex-col gap-1 z-10">
          <button class="copy-btn w-7 h-7 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 text-gray-700 text-xs transition" title="Copy SVG Code">
            <i class="fa-solid fa-code"></i>
          </button>
          <div class="relative">
            <button class="download-btn w-7 h-7 flex items-center justify-center bg-alfa-blue rounded hover:bg-blue-800 text-white text-xs transition" title="Download">
              <i class="fa-solid fa-download"></i>
            </button>
            <div class="download-dropdown absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg p-2 w-28 flex-col gap-1.5 shadow-lg z-20">
              <span class="text-[11px] font-semibold text-gray-700 text-center block mb-1">Download asset</span>
              <button class="btn-format w-full bg-alfa-blue text-white text-xs font-semibold py-1.5 rounded hover:bg-blue-800 transition" data-format="svg">SVG</button>
              <button class="btn-format w-full bg-alfa-blue text-white text-xs font-semibold py-1.5 rounded hover:bg-blue-800 transition" data-format="png">PNG</button>
            </div>
          </div>
        </div>
      `;

      // Download dropdown toggle
      const dlBtn = box.querySelector('.download-btn');
      const dlDrop = box.querySelector('.download-dropdown');
      dlBtn.addEventListener('click', e => {
        e.stopPropagation();
        document.querySelectorAll('.download-dropdown.show').forEach(el => { if (el !== dlDrop) el.classList.remove('show'); });
        dlDrop.classList.toggle('show');
      });

      // Format buttons (SVG / PNG)
      box.querySelectorAll('.btn-format').forEach(btn => {
        btn.addEventListener('click', async e => {
          e.stopPropagation();
          dlDrop.classList.remove('show');
          const format = btn.getAttribute('data-format');
          const color = getComputedStyle(document.documentElement).getPropertyValue('--icon-color').trim() || '#000000';
          try {
            const res = await fetch(`${ICON_BASE_URL}${fileName}`);
            const svgText = await res.text();
            const svgEl = new DOMParser().parseFromString(svgText, 'image/svg+xml').documentElement;
            svgEl.setAttribute('fill', color);
            svgEl.querySelectorAll('*').forEach(el => {
              if (el.getAttribute('fill') && el.getAttribute('fill') !== 'none') el.setAttribute('fill', color);
              if (el.getAttribute('stroke') && el.getAttribute('stroke') !== 'none') el.setAttribute('stroke', color);
            });
            svgEl.setAttribute('width', '512'); svgEl.setAttribute('height', '512');
            const newSvg = new XMLSerializer().serializeToString(svgEl);
            if (format === 'svg') {
              const url = URL.createObjectURL(new Blob([newSvg], { type: 'image/svg+xml' }));
              triggerDownload(url, fileName);
              URL.revokeObjectURL(url);
            } else {
              const canvas = document.createElement('canvas');
              canvas.width = 512; canvas.height = 512;
              const img = new Image();
              img.onload = () => {
                canvas.getContext('2d').drawImage(img, 0, 0, 512, 512);
                triggerDownload(canvas.toDataURL('image/png'), fileName.replace('.svg', '.png'));
              };
              img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(newSvg)));
            }
            showSuccessModal();
          } catch (err) { console.error(err); }
        });
      });

      // Copy SVG
      box.querySelector('.copy-btn').addEventListener('click', async e => {
        e.stopPropagation();
        try {
          const color = getComputedStyle(document.documentElement).getPropertyValue('--icon-color').trim() || '#000000';
          const res = await fetch(`${ICON_BASE_URL}${fileName}`);
          const svgText = await res.text();
          const svgEl = new DOMParser().parseFromString(svgText, 'image/svg+xml').documentElement;
          svgEl.setAttribute('fill', color);
          await navigator.clipboard.writeText(new XMLSerializer().serializeToString(svgEl));
          showToast(e.currentTarget, 'SVG Code copied!');
        } catch (err) { console.error(err); }
      });

      iconGrid.appendChild(box);
    });
  }

  function triggerDownload(url, name) {
    const a = Object.assign(document.createElement('a'), { href: url, download: name });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  // ==========================================
  // TOAST
  // ==========================================
  let toastTimeout;
  function showToast(btn, msg) {
    const toast = document.getElementById('copyToast');
    if (!toast) return;
    clearTimeout(toastTimeout);
    toast.querySelector('span').textContent = msg;
    const rect = btn.getBoundingClientRect();
    toast.style.left = `${rect.left + rect.width / 2 - 80}px`;
    toast.style.top = `${rect.top + window.scrollY - 44}px`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    toastTimeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
    }, 2000);
  }

  // ==========================================
  // SUCCESS MODAL
  // ==========================================
  const successModal = document.getElementById('successModal');
  function showSuccessModal() {
    successModal.style.display = 'flex';
  }
  document.getElementById('modalOkBtn').addEventListener('click', () => {
    successModal.style.display = 'none';
  });
  successModal.addEventListener('click', e => {
    if (e.target === successModal) successModal.style.display = 'none';
  });

  // Close download dropdowns on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.icon-box')) {
      document.querySelectorAll('.download-dropdown.show').forEach(el => el.classList.remove('show'));
    }
  });

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
      pageTitle.textContent = `${this.getAttribute('data-category')} Icons`;
      btnReset.classList.remove('hidden');
      if (searchBar) searchBar.value = '';
      renderIcons(iconData.filter(i => i.category === this.getAttribute('data-category')));
    });
  });

  btnReset && btnReset.addEventListener('click', () => {
    categoryItems.forEach(i => {
      i.classList.remove('active', 'text-gray-900', 'font-semibold', 'bg-gray-100');
      i.classList.add('text-gray-500');
    });
    pageTitle.textContent = 'Result for Icons';
    btnReset.classList.add('hidden');
    if (searchBar) searchBar.value = '';
    renderIcons(iconData);
  });

  // ==========================================
  // SEARCH BAR
  // ==========================================
  searchBar && searchBar.addEventListener('input', function () {
    const term = this.value.toLowerCase().trim();
    categoryItems.forEach(i => {
      i.classList.remove('active', 'text-gray-900', 'font-semibold', 'bg-gray-100');
      i.classList.add('text-gray-500');
    });
    if (!term) {
      pageTitle.textContent = 'Result for Icons';
      btnReset.classList.add('hidden');
      renderIcons(iconData);
      return;
    }
    const filtered = iconData.filter(i =>
      i.fileName.toLowerCase().replace(/[-_]/g, ' ').includes(term) ||
      i.fileName.toLowerCase().includes(term)
    );
    pageTitle.textContent = `Search results for "${this.value}"`;
    btnReset.classList.remove('hidden');
    renderIcons(filtered);
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

  // State
  let currentHue = 0;
  let sbX = 0.9; // saturation 0-1
  let sbY = 0.1; // brightness inverted (0=top=bright, 1=bottom=dark)

  // --- Draw SB canvas ---
  function drawSBCanvas(hue) {
    const ctx = sbCanvas.getContext('2d');
    const w = sbCanvas.width;
    const h = sbCanvas.height;

    // Base hue color (left-to-right: white → hue color)
    const hueColor = `hsl(${hue}, 100%, 50%)`;
    const gradH = ctx.createLinearGradient(0, 0, w, 0);
    gradH.addColorStop(0, '#ffffff');
    gradH.addColorStop(1, hueColor);
    ctx.fillStyle = gradH;
    ctx.fillRect(0, 0, w, h);

    // Top-to-bottom: transparent → black
    const gradV = ctx.createLinearGradient(0, 0, 0, h);
    gradV.addColorStop(0, 'rgba(0,0,0,0)');
    gradV.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = gradV;
    ctx.fillRect(0, 0, w, h);
  }

  // --- HSV to RGB (correct for canvas-based SB picker) ---
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

  // --- Get color from SB position + hue ---
  function getColorFromSB() {
    const s = sbX * 100; // saturation 0-100
    const v = (1 - sbY) * 100; // value/brightness 0-100
    return hsvToRgb(currentHue, s, v);
  }

  // --- Apply color to icons + UI ---
  function applyColor(r, g, b) {
    const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
    const color = `rgb(${r},${g},${b})`;
    colorPickerBtn.style.backgroundColor = hex;
    colorPreview.style.backgroundColor = hex;
    rInput.value = r; gInput.value = g; bInput.value = b;
    document.documentElement.style.setProperty('--icon-color', hex);
    document.querySelectorAll('.icon-img').forEach(el => el.style.backgroundColor = hex);
  }

  // --- Update thumb position ---
  function updateThumb() {
    const w = sbCanvas.offsetWidth || 280;
    const h = sbCanvas.offsetHeight || 180;
    sbThumb.style.left = `${sbX * w}px`;
    sbThumb.style.top = `${sbY * h}px`;
  }

  // --- Init canvas ---
  function initPicker() {
    drawSBCanvas(currentHue);
    updateThumb();
    const [r, g, b] = getColorFromSB();
    applyColor(r, g, b);
  }

  // --- Hue slider ---
  hueSlider && hueSlider.addEventListener('input', function () {
    currentHue = parseInt(this.value);
    drawSBCanvas(currentHue);
    const [r, g, b] = getColorFromSB();
    applyColor(r, g, b);
  });

  // --- SB Canvas drag ---
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

  // --- RGB inputs ---
  function onRGBInput() {
    const r = Math.max(0, Math.min(255, parseInt(rInput.value) || 0));
    const g = Math.max(0, Math.min(255, parseInt(gInput.value) || 0));
    const b = Math.max(0, Math.min(255, parseInt(bInput.value) || 0));
    applyColor(r, g, b);
  }
  rInput && rInput.addEventListener('input', onRGBInput);
  gInput && gInput.addEventListener('input', onRGBInput);
  bInput && bInput.addEventListener('input', onRGBInput);

  // --- Eyedropper ---
  const eyedropperBtn = document.getElementById('eyedropperBtn');
  eyedropperBtn && eyedropperBtn.addEventListener('click', async () => {
    if (!window.EyeDropper) { alert('Eyedropper not supported in this browser.'); return; }
    try {
      const result = await new EyeDropper().open();
      const hex = result.sRGBHex;
      const r = parseInt(hex.slice(1,3),16);
      const g = parseInt(hex.slice(3,5),16);
      const b = parseInt(hex.slice(5,7),16);
      applyColor(r, g, b);
    } catch {}
  });

  // --- Toggle popup ---
  colorPickerBtn && colorPickerBtn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = colorPickerPopup.classList.toggle('open');
    if (isOpen) {
      // Draw canvas after popup is visible (needs layout)
      requestAnimationFrame(() => {
        sbCanvas.width = sbCanvas.offsetWidth || 280;
        drawSBCanvas(currentHue);
        updateThumb();
      });
    }
  });

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
    versionBtn.addEventListener('click', e => {
      e.stopPropagation();
      versionMenu.classList.toggle('active');
    });
    document.addEventListener('click', () => versionMenu.classList.remove('active'));
  }

  // ==========================================
  // BACK TO TOP
  // ==========================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
        backToTop.style.transform = 'translateY(0)';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
        backToTop.style.transform = 'translateY(16px)';
      }
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ==========================================
  // INITIAL RENDER (handle URL search param)
  // ==========================================
  const query = new URLSearchParams(window.location.search).get('search');
  if (query && searchBar) {
    searchBar.value = query;
    const term = query.toLowerCase();
    const filtered = iconData.filter(i =>
      i.fileName.toLowerCase().replace(/[-_]/g, ' ').includes(term) ||
      i.fileName.toLowerCase().includes(term)
    );
    pageTitle.textContent = `Search results for "${query}"`;
    btnReset.classList.remove('hidden');
    renderIcons(filtered);
  } else {
    renderIcons(iconData);
  }
});

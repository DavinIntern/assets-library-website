document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // DATA
  // ==========================================
  const baseNames = [
    "business","checked","delivery","finance","it","meeting",
    "noitemfound","packaging","profitgraph","property",
    "recruiting","recruitmenthiring","sales","working","world"
  ];

  const titleMap = {
    "business":"Business","checked":"Check Animation","delivery":"Delivery","finance":"Finance",
    "it":"Programming","meeting":"Meeting","noitemfound":"No Item Found","packaging":"Packaging Product",
    "profitgraph":"Profit Graph","property":"Property Development","recruiting":"Recruiting",
    "recruitmenthiring":"Recruitment Hiring","sales":"Sales Marketing","working":"Working","world":"International"
  };

  function getCategory(n) {
    if (n.includes('recruit')) return "Human Capital";
    if (n.includes('sales')) return "Marketing";
    if (n.includes('packaging')) return "Merchandising";
    if (n.includes('delivery') || n.includes('world')) return "Logistic";
    if (n === 'it') return "Information Technology";
    if (n.includes('profit')) return "Franchise & Investor Relation";
    return "Corporate Affair";
  }

  const lottieData = baseNames.map((b, i) => ({
    id: i + 1, baseName: b,
    title: titleMap[b] || b,
    category: getCategory(b)
  }));

  // ==========================================
  // RENDER (with pagination)
  // ==========================================
  const grid = document.getElementById('lottieGrid');
  const lottiePagination = document.getElementById('lottiePagination');
  const LOTTIES_PER_PAGE = 12;
  let currentLottiePage = 1;
  let currentLottieData = [];

  function renderPagination(total, perPage, currentPage, onPageChange) {
    const container = lottiePagination;
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

  function goToLottiePage(page) {
    currentLottiePage = page;
    const start = (page - 1) * LOTTIES_PER_PAGE;
    const pageData = currentLottieData.slice(start, start + LOTTIES_PER_PAGE);
    _renderLottieCards(pageData);
    renderPagination(currentLottieData.length, LOTTIES_PER_PAGE, currentLottiePage, goToLottiePage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderLotties(data) {
    currentLottieData = data;
    currentLottiePage = 1;
    const pageData = data.slice(0, LOTTIES_PER_PAGE);
    _renderLottieCards(pageData);
    renderPagination(data.length, LOTTIES_PER_PAGE, currentLottiePage, goToLottiePage);
  }

  function _renderLottieCards(data) {
    if (!grid) return;
    grid.innerHTML = '';
    if (data.length === 0) {
      grid.innerHTML = '<p class="col-span-full text-gray-400 py-16 text-center text-sm">No animations found.</p>';
      return;
    }
    grid.innerHTML = data.map(item => `
      <div class="lottie-card bg-gray-50 rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all"
        data-title="${item.title}" data-basename="${item.baseName}">
        <div class="w-full h-36 flex items-center justify-center">
          <lottie-player src="${LOTTIE_BASE_URL}${item.baseName}.json" background="transparent" speed="1" style="width:120px;height:120px;" hover></lottie-player>
        </div>
        <p class="text-sm font-medium text-gray-800 text-center">${item.title}</p>
      </div>
    `).join('');
  }

  // ==========================================
  // PREVIEW MODAL
  // ==========================================
  let currentBase = '', currentTitle = '';
  const previewModal = document.getElementById('previewModal');
  const previewTitle = document.getElementById('previewTitle');
  const previewAnimation = document.getElementById('previewAnimation');
  const successModal = document.getElementById('successModal');

  grid.addEventListener('click', e => {
    const card = e.target.closest('.lottie-card');
    if (!card) return;
    currentTitle = card.getAttribute('data-title');
    currentBase = card.getAttribute('data-basename');
    previewTitle.textContent = currentTitle;
    previewAnimation.innerHTML = `<lottie-player src="${LOTTIE_BASE_URL}${currentBase}.json" background="transparent" speed="1" style="width:100%;height:100%;" loop autoplay></lottie-player>`;
    previewModal.classList.add('show');
  });

  function closePreview() {
    previewModal.classList.remove('show');
    setTimeout(() => previewAnimation.innerHTML = '', 300);
  }

  document.getElementById('closePreviewBtn').addEventListener('click', closePreview);
  previewModal.addEventListener('click', e => { if (e.target === previewModal) closePreview(); });

  async function processDownload(url, format, name) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Not found');
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement('a'), { href: blobUrl, download: `${name}.${format}` });
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      successModal.classList.add('show');
    } catch {
      if (format === 'gif') alert(`File ${name}.gif belum tersedia di folder assets/Lottie/.`);
      else alert(`File ${name}.${format} tidak ditemukan.`);
    }
  }

  document.getElementById('btnDownloadJson').addEventListener('click', () => processDownload(`${LOTTIE_BASE_URL}${currentBase}.json`, 'json', currentBase));
  document.getElementById('btnDownloadGif').addEventListener('click', () => processDownload(`${LOTTIE_BASE_URL}${currentBase}.gif`, 'gif', currentBase));

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
      pageTitle.textContent = `${this.getAttribute('data-category')} Lottie`;
      btnReset.classList.remove('hidden');
      if (searchBar) searchBar.value = '';
      renderLotties(lottieData.filter(i => i.category === this.getAttribute('data-category')));
    });
  });

  btnReset && btnReset.addEventListener('click', () => {
    categoryItems.forEach(i => {
      i.classList.remove('active', 'text-gray-900', 'font-semibold', 'bg-gray-100');
      i.classList.add('text-gray-500');
    });
    pageTitle.textContent = 'Result for Lottie Animation';
    btnReset.classList.add('hidden');
    if (searchBar) searchBar.value = '';
    renderLotties(lottieData);
  });

  searchBar && searchBar.addEventListener('input', function () {
    const term = this.value.toLowerCase().trim();
    categoryItems.forEach(i => {
      i.classList.remove('active', 'text-gray-900', 'font-semibold', 'bg-gray-100');
      i.classList.add('text-gray-500');
    });
    if (!term) { pageTitle.textContent = 'Result for Lottie Animation'; btnReset.classList.add('hidden'); renderLotties(lottieData); return; }
    const filtered = lottieData.filter(i => i.title.toLowerCase().includes(term) || i.baseName.toLowerCase().includes(term));
    pageTitle.textContent = `Search results for "${this.value}"`;
    btnReset.classList.remove('hidden');
    renderLotties(filtered);
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
    const filtered = lottieData.filter(i => i.title.toLowerCase().includes(query.toLowerCase()) || i.baseName.toLowerCase().includes(query.toLowerCase()));
    pageTitle.textContent = `Search results for "${query}"`;
    btnReset.classList.remove('hidden');
    renderLotties(filtered);
  } else {
    renderLotties(lottieData);
  }
});

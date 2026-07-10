document.addEventListener('DOMContentLoaded', function () {

  // --- Dropdown Kategori ---
  const dropdown = document.getElementById('categoryDropdown');
  const selectedText = document.getElementById('selectedText');
  const optionsList = document.getElementById('dropdownOptions');
  const searchInput = document.getElementById('searchInput');

  dropdown.addEventListener('click', function (e) {
    e.stopPropagation();
    optionsList.classList.toggle('show');
  });

  optionsList.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', function () {
      selectedText.textContent = this.getAttribute('data-value');
      searchInput.placeholder = `Search your ${this.getAttribute('data-value').toLowerCase()}...`;
      optionsList.classList.remove('show');
    });
  });

  document.addEventListener('click', () => optionsList.classList.remove('show'));

  // --- Search Redirect ---
  function performSearch() {
    const keyword = searchInput.value.trim();
    const category = selectedText.textContent.trim();
    const pages = { Icons: '/icon', Illustrations: '/illustration', Lottie: '/lottie', Templates: '/template' };
    const target = pages[category] || '/icon';
    window.location.href = keyword ? `${target}?search=${encodeURIComponent(keyword)}` : target;
  }

  document.getElementById('searchBtn').addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(); });

  // --- Copy CDN Buttons ---
  function setupCopy(btnId, text) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(text);
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Copied!';
      btn.classList.add('text-green-600', 'border-green-500');
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.classList.remove('text-green-600', 'border-green-500');
      }, 3000);
    });
  }

  setupCopy('copyCssBtn', '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DavinIntern/assets-library-website@1.0.0/dist/alfa-icons.css">');
  setupCopy('copyJsBtn', '<script src="https://cdn.jsdelivr.net/gh/DavinIntern/assets-library-website@1.0.0/dist/assets.js"><\/script>');
});

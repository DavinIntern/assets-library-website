document.addEventListener('DOMContentLoaded', function () {

  // Filter Pills
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.t-item-card');

  pills.forEach(pill => {
    pill.addEventListener('click', function () {
      const isActive = this.classList.contains('bg-red-100');
      // Reset semua
      pills.forEach(p => {
        p.classList.remove('bg-red-100', 'text-red-600', 'border-red-200');
        p.classList.add('bg-gray-100', 'text-gray-500', 'border-transparent');
      });
      cards.forEach(c => c.style.display = 'block');

      if (!isActive) {
        this.classList.add('bg-red-100', 'text-red-600', 'border-red-200');
        this.classList.remove('bg-gray-100', 'text-gray-500', 'border-transparent');
        const filter = this.getAttribute('data-filter');
        cards.forEach(c => { c.style.display = c.getAttribute('data-category') === filter ? 'block' : 'none'; });
      }
    });
  });

  // Drag to scroll filter track
  const slider = document.getElementById('filterTrack');
  if (slider) {
    let isDown = false, startX, scrollLeft;
    slider.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
    slider.addEventListener('mouseleave', () => isDown = false);
    slider.addEventListener('mouseup', () => isDown = false);
    slider.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      slider.scrollLeft = scrollLeft - (e.pageX - slider.offsetLeft - startX) * 2;
    });
  }

  // Back to Top
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) { backToTop.style.opacity = '1'; backToTop.style.visibility = 'visible'; backToTop.style.transform = 'translateY(0)'; }
      else { backToTop.style.opacity = '0'; backToTop.style.visibility = 'hidden'; backToTop.style.transform = 'translateY(20px)'; }
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});

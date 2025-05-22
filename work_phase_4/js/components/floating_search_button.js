const toggleBtn = document.getElementById('toggleSearch');
const floatingSearch = document.querySelector('.floating-search');

toggleBtn.addEventListener('click', () => {
  floatingSearch.classList.toggle('active');
});

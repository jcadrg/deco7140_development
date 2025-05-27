const toggleBtn = document.getElementById('toggleSearch');
const floatingSearch = document.querySelector('.floating-search');

toggleBtn.addEventListener('click', () => {
  floatingSearch.classList.toggle('active');
});

// Make the floating box draggable
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

floatingSearch.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - floatingSearch.getBoundingClientRect().left;
  offsetY = e.clientY - floatingSearch.getBoundingClientRect().top;
  floatingSearch.style.transition = 'none'; // Disable transition while dragging
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    floatingSearch.style.left = `${x}px`;
    floatingSearch.style.top = `${y}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  floatingSearch.style.transition = ''; // Re-enable transition
});
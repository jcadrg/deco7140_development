document.addEventListener('DOMContentLoaded', () => {
  // --- HERO CAROUSEL LOGIC ---
  const slides = document.querySelectorAll('.carousel-slide');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  dots?.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  showSlide(currentIndex);

  // --- DYNAMIC PROJECT LOADING ---
  const grid = document.getElementById("projectGrid");
  let allProjects = [];

  fetch("data/projects.json")
    .then((res) => res.json())
    .then((projects) => {
      allProjects = projects;
      renderProjects(allProjects);
    })
    .catch((err) => console.error("Failed to load projects:", err));

  function renderProjects(projectList) {
    grid.innerHTML = '';
    projectList.forEach((project) => {
      const card = document.createElement("div");
      card.classList.add("project-card");
      card.setAttribute("data-category", project.category);
      card.setAttribute("data-subcategory", project.subcategory);

      card.innerHTML = `
        <div class="project-thumb"></div>
        <div class="project-info">
          <h4>${project.title}</h4>
          <small>by ${project.creator} in ${project.subcategory}</small>
        </div>
      `;

      // 🔗 Make it clickable
      card.addEventListener("click", () => {
        window.location.href = "project.html";
      });

      grid.appendChild(card);
    });
  }


  // --- FILTER TAB + DROPDOWN LOGIC ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const dropdown = document.getElementById('subcategory-dropdown');
  let currentCategory = 'circuits';
  let currentSubcategory = null;

  const subcategories = {
    circuits: [
      'Apple', 'Arduino', 'Digital Art', 'Assistive Tech', 'Audio',
      'Cameras', 'Clocks', 'Computers', 'Electronics', 'Gadgets',
      'LEDs', 'Raspberry Pi', 'Remote Controls', 'Sensors', 'Tools',
      'Wearables', 'Websites'
    ],
    workshop: [
      '3D Printing', 'Design', 'Cars', 'Furniture', 'Home Improvement',
      'Hydroponics', 'Metalworking', 'Organizing', 'Woodcraft', 'Science Experiments'
    ],
    craft: [
      'Costumes & Cosplay', 'Paper Crafts', 'Sewing', 'Knitting', 'Embroidery',
      'Crochet', 'Beading', 'Upcycling', 'Handmade Gifts', 'Decor'
    ]
  };

  filterTabs?.forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelector('.filter-tab.active')?.classList.remove('active');
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      populateDropdown(category);

      // Filter cards
      const selectedCategory = tab.getAttribute('data-category');
      const selectedSub = dropdown.value;

      document.querySelectorAll('.project-card').forEach(card => {
        const matchesCat = selectedCategory === "all" || card.dataset.category === selectedCategory;
        const matchesSub = selectedSub === "Select a subcategory" || card.dataset.subcategory === selectedSub;
        card.style.display = matchesCat && matchesSub ? "" : "none";
      });

      handleNoResults();
    });
  });

  dropdown?.addEventListener('change', () => {
    const selectedCategory = document.querySelector('.filter-tab.active')?.getAttribute('data-category') || 'all';
    const selectedSub = dropdown.value;

    document.querySelectorAll('.project-card').forEach(card => {
      const matchesCat = selectedCategory === "all" || card.dataset.category === selectedCategory;
      const matchesSub = selectedSub === "Select a subcategory" || card.dataset.subcategory === selectedSub;
      card.style.display = matchesCat && matchesSub ? "" : "none";
    });

    handleNoResults();
  });

  function populateDropdown(category) {
    if (!dropdown) return;
    dropdown.innerHTML = '<option>Select a subcategory</option>';
    subcategories[category]?.forEach(sub => {
      const option = document.createElement('option');
      option.value = sub;
      option.textContent = sub;
      dropdown.appendChild(option);
    });
  }

  function handleNoResults() {
    const grid = document.getElementById("projectGrid");
    let noResults = document.getElementById("noResults");

    const visibleCards = Array.from(grid.children).filter(card => card.style.display !== "none");

    if (visibleCards.length === 0) {
      if (!noResults) {
        noResults = document.createElement("p");
        noResults.id = "noResults";
        noResults.textContent = "No results found for the selected filters.";
        noResults.style.textAlign = "center";
        noResults.style.padding = "2rem";
        noResults.style.color = "var(--color-subtle)";
        grid.parentElement.appendChild(noResults);
      }
    } else {
      if (noResults) {
        noResults.remove();
      }
    }
  }


  function applyFilters() {
    let filtered = allProjects.filter(p => {
      return (currentCategory === 'all' || p.category === currentCategory) &&
             (!currentSubcategory || p.subcategory === currentSubcategory);
    });
    renderProjects(filtered);
  }

  populateDropdown('circuits');
});

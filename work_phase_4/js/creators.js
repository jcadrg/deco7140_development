// creators.js

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("creatorGrid");
  const filterTabs = document.querySelectorAll(".filter-tab");

  // Sample data for creators
  const creators = [
    {
      name: "Orange Digital Center",
      role: "Project Creator",
      avatar: "assets/img/avatar.png",
    },
    {
      name: "Maria Gutierrez",
      role: "Tutor",
      avatar: "assets/img/avatar2.png",
    },
    {
      name: "John Smith",
      role: "Project Creator",
      avatar: "assets/img/avatar3.png",
    },
    {
      name: "Elaine Wu",
      role: "Tutor",
      avatar: "assets/img/avatar4.png",
    },
  ];

  // Function to render cards
  function renderCreators(list) {
    grid.innerHTML = "";
    list.forEach((creator) => {
      const link = document.createElement("a");
      link.href = "creator.html";
      link.classList.add("creator-card-link");

      const card = document.createElement("div");
      card.classList.add("creator-card");
      card.setAttribute("data-role", creator.role.toLowerCase());

      card.innerHTML = `
        <div class="creator-thumb">
            <img src="${creator.avatar}" alt="${creator.name}" class="responsive-img" />
        </div>
        <div class="creator-info">
            <h4>${creator.name}</h4>
            <small>${creator.role}</small>
        </div>
        `;

      link.appendChild(card);
      grid.appendChild(link);
    });
  }

  // Initial render
  renderCreators(creators);

  // Filtering logic
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelector(".filter-tab.active")?.classList.remove("active");
      tab.classList.add("active");

      const category = tab.getAttribute("data-category");

      if (category === "all") {
        renderCreators(creators);
      } else {
        const filtered = creators.filter(
          (c) => c.role.toLowerCase() === category
        );
        renderCreators(filtered);
      }
    });
  });
});

// const initGalleryViewer = () => {
//     const viewer = document.getElementById("viewer");
//     const viewerImg = document.getElementById("viewer-img");
//     const viewerCaption = document.getElementById("viewer-caption");
//     const closeBtn = document.getElementById("close-viewer");

//     // Click on gallery image to open viewer
//     document.querySelectorAll(".gallery img").forEach((img) => {
//         img.addEventListener("click", () => {
//             viewerImg.src = img.src;
//             viewerImg.alt = img.alt;
//             viewerCaption.textContent = img.alt;

//             viewer.classList.add("open");
//             viewer.setAttribute("aria-hidden", "false");
//             document.body.style.overflow = "hidden";
//         });
//     });

//     // Close button hides the viewer
//     closeBtn.addEventListener("click", () => {
//         viewer.classList.remove("open");
//         viewer.setAttribute("aria-hidden", "true");
//         document.body.style.overflow = "auto";
//     });
// };

// export { initGalleryViewer };

const initGalleryViewer = () => {
    const viewer = document.getElementById("viewer");
    const viewerImg = document.getElementById("viewer-img");
    const viewerCaption = document.getElementById("viewer-caption");
    const closeBtn = document.getElementById("close-viewer");
  
    // ✅ Open viewer on image click
    document.querySelectorAll(".gallery img").forEach((img) => {
      img.addEventListener("click", (event) => {
        event.stopPropagation(); // prevent this click from triggering doc listener
        viewerImg.src = img.src;
        viewerImg.alt = img.alt;
        viewerCaption.textContent = img.alt;
  
        viewer.classList.add("open");
        viewer.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });
  
    // ✅ Close viewer via ✱ button
    closeBtn.addEventListener("click", () => {
      viewer.classList.remove("open");
      viewer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "auto";
    });
  
    // ✅ Close viewer on outside click
    document.addEventListener("click", (event) => {
      if (
        viewer.classList.contains("open") &&
        !viewer.contains(event.target)
      ) {
        viewer.classList.remove("open");
        viewer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";
      }
    });
  
    // ✅ Prevent clicks inside viewer from bubbling up
    viewer.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  };
  
  export { initGalleryViewer };
  


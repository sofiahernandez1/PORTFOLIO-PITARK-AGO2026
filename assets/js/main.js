document.addEventListener("DOMContentLoaded", () => {
  // --- PRELOADER ---
  const preloader = document.getElementById("preloader");
  const preloaderText = document.getElementById("preloaderText");

  if (preloader && preloaderText) {
    const finalWord = "PITARK";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=-!?";
    let iterations = 0;
    const maxIterations = 25;

    document.body.style.overflow = "hidden"; // Bloquea el scroll

    const scrambleInterval = setInterval(() => {
      preloaderText.innerText = finalWord
        .split("")
        .map((letter, index) => {
          if (
            index < Math.floor(iterations / (maxIterations / finalWord.length))
          ) {
            return finalWord[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      iterations++;

      if (iterations > maxIterations) {
        clearInterval(scrambleInterval);
        preloaderText.innerText = finalWord;

        setTimeout(() => {
          preloader.classList.add("hidden");
          document.body.style.overflow = ""; // Recupera el scroll
          setTimeout(() => preloader.remove(), 800);
        }, 600);
      }
    }, 50);
  }

  // --- LÓGICA DEL MENÚ DESPLEGABLE ---
  const dropdownBtn = document.getElementById("dropdownBtn");
  const dropdownList = document.getElementById("dropdownList");

  if (dropdownBtn && dropdownList) {
    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownList.classList.toggle("is-open");
    });

    document.addEventListener("click", (e) => {
      if (!dropdownBtn.contains(e.target) && !dropdownList.contains(e.target)) {
        dropdownList.classList.remove("is-open");
      }
    });

    const links = dropdownList.querySelectorAll(".dropdown-link");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        dropdownList.classList.remove("is-open");
      });
    });
  }

  // --- EFECTO SCROLL EN BIG TYPE ---
  const bigTypeSection = document.querySelector("#bigType");
  const bigTypeLines = document.querySelector("#bigTypeLines");
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function updateBigType() {
    if (!bigTypeSection || !bigTypeLines) return;
    const rect = bigTypeSection.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = bigTypeSection.offsetHeight - vh;
    const scrolled = clamp(-rect.top, 0, total);
    const t = total > 0 ? scrolled / total : 0;
    bigTypeLines.style.setProperty("--ty", `${(0.5 - t) * (vh * 0.45)}px`);
  }

  window.addEventListener("scroll", updateBigType, { passive: true });
  window.addEventListener("resize", updateBigType);
  updateBigType();

  // --- LÓGICA DE LAS SECCIONES DE PROYECTOS ---
  const thumbs = document.querySelectorAll(".sc-thumb");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      const section = this.closest(".showcase-section");
      section
        .querySelectorAll(".sc-thumb")
        .forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const type = this.getAttribute("data-type");
      const mediaSrc = this.getAttribute("data-src");
      const descHTML = this.getAttribute("data-desc");

      const leftContainer = section.querySelector(".showcase-left");
      
      // NUEVO: Compatibilidad con el Collage
      if (type === "img") {
        leftContainer.innerHTML = `<img class="sc-main-media" src="${mediaSrc}" alt="Selected Work">`;
      } else if (type === "vid") {
        leftContainer.innerHTML = `<video class="sc-main-media" autoplay controls loop playsinline src="${mediaSrc}"></video>`;
      } else if (type === "collage") {
        const template = document.getElementById("font-collage-template");
        if (template) leftContainer.innerHTML = template.innerHTML;
      }

      const descContainer = section.querySelector(".sc-desc");
      if (descContainer) {
        descContainer.innerHTML = descHTML;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const preloader = document.getElementById("preloader");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-navigation");
  const navLinks = document.querySelectorAll('#main-nav-wrap a[href^="#"]');
  const sections = document.querySelectorAll("section[id]");
  const goTop = document.getElementById("go-top");

  /* Preloader */
  window.addEventListener("load", () => {
    if (preloader) {
      preloader.classList.add("is-hidden");
      setTimeout(() => {
        preloader.remove();
      }, 600);
    }
  });

  /* Menú */
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      menuToggle.classList.toggle("is-clicked");

      const expanded = menuToggle.classList.contains("is-clicked");
      menuToggle.setAttribute("aria-expanded", String(expanded));
      nav.style.display = expanded ? "block" : "none";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          nav.style.display = "none";
          menuToggle.classList.remove("is-clicked");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* Smooth scroll */
  const smoothLinks = document.querySelectorAll('a.smoothscroll[href^="#"]');
  smoothLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      history.replaceState(null, "", targetId);
    });
  });

  /* Link activo */
  const setActiveNavLink = () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 160 && rect.bottom >= 160) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.parentElement.classList.remove("current");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.parentElement.classList.add("current");
      }
    });
  };

  window.addEventListener("scroll", setActiveNavLink);
  window.addEventListener("load", setActiveNavLink);

  /* Botón volver arriba */
  const toggleGoTop = () => {
    if (!goTop) return;
    goTop.style.display = window.scrollY > 300 ? "block" : "none";
  };

  window.addEventListener("scroll", toggleGoTop);
  window.addEventListener("load", toggleGoTop);
});
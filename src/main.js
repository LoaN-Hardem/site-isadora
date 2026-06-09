document.addEventListener("DOMContentLoaded", () => {
  // Elementos das seções
  const btnStart = document.getElementById("btn-start");
  const btnContinue = document.getElementById("btn-continue");

  const coverSection = document.getElementById("cover-section");
  const introSection = document.getElementById("intro-section");
  const journeySection = document.getElementById("journey-section");

  const introTexts = document.querySelectorAll(".intro-text");

  // Transição 1: Cover -> Introdução
  btnStart.addEventListener("click", () => {
    coverSection.classList.add("opacity-0", "pointer-events-none");

    setTimeout(() => {
      coverSection.classList.remove("z-10");
      introSection.classList.remove("z-0");
      introSection.classList.add("z-10");
      introSection.classList.remove("opacity-0", "pointer-events-none");

      introTexts.forEach((text) => {
        text.classList.remove("translate-y-4", "opacity-0");
      });
    }, 800);
  });

  // Transição 2: Introdução -> Jornada Principal
  btnContinue.addEventListener("click", () => {
    introSection.classList.add("opacity-0", "pointer-events-none");

    setTimeout(() => {
      introSection.classList.remove("z-10");

      // Remove o display:none
      journeySection.classList.remove("hidden");

      // Aguarda um pequeno ciclo para aplicar a transição de opacidade
      requestAnimationFrame(() => {
        journeySection.classList.remove("opacity-0");
      });
    }, 800);
  });

  // Animação de Scroll (Fade In) para os Capítulos
  const observerOptions = {
    root: journeySection, // O scroll acontece dentro desta section
    threshold: 0.25, // Dispara quando 25% do elemento estiver visível
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Revela o conteúdo
        entry.target.classList.remove("opacity-0", "translate-y-12");
      }
    });
  }, observerOptions);

  // Observa todos os conteúdos dos capítulos
  document.querySelectorAll(".chapter-content").forEach((chapter) => {
    observer.observe(chapter);
  });
});

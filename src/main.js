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

  // Elementos da Seção 4
  const btnNextPhase = document.getElementById("btn-next-phase");
  const transitionSection = document.getElementById("transition-section");
  const transitionTexts = document.querySelectorAll(".transition-text");

  // Transição 3: Jornada Principal -> Transição Pré-Final
  btnNextPhase.addEventListener("click", () => {
    // Inicia o fade out da jornada de fotos
    journeySection.classList.add("opacity-0");

    setTimeout(() => {
      journeySection.classList.add("hidden");

      // Ativa a seção de transição (tela quase vazia)
      transitionSection.classList.remove("hidden");

      // Pequeno frame de espera para o navegador processar o display block antes do fade in
      requestAnimationFrame(() => {
        transitionSection.classList.remove("opacity-0");

        // Revela as frases e o botão final respeitando os "delays" definidos no HTML
        transitionTexts.forEach((text) => {
          text.classList.remove("opacity-0");
        });
      });
    }, 1000); // Aguarda o fade out da jornada terminar
  });

  // Elementos da Transição para o Encerramento
  const btnTriggerFinal = document.getElementById("btn-trigger-final");
  const finalSection = document.getElementById("final-section");

  // Transição 4: Pré-Final -> Encerramento e Extras
  btnTriggerFinal.addEventListener("click", () => {
    transitionSection.classList.add("opacity-0", "pointer-events-none");

    setTimeout(() => {
      transitionSection.classList.add("hidden");
      transitionSection.classList.remove("z-30");

      finalSection.classList.remove("hidden");

      // Delay para garantir a renderização antes do fade in
      requestAnimationFrame(() => {
        finalSection.classList.remove("opacity-0");
      });
    }, 2000); // Aguarda o fade out bem lento
  });

  // Animação de Scroll para a Seção de Encerramento (Revelação em cascata)
  const finalObserverOptions = {
    root: finalSection,
    threshold: 0.15,
  };

  const finalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-10");

        // Se o elemento revelado for o container da lista, anima os itens um por um
        if (entry.target.querySelector("ul")) {
          const listItems = entry.target.querySelectorAll(".list-item-anim");
          listItems.forEach((item) => {
            item.classList.remove("opacity-0", "-translate-x-5");
          });
        }

        // Desobserva o elemento após revelá-lo (anima apenas uma vez)
        finalObserver.unobserve(entry.target);
      }
    });
  }, finalObserverOptions);

  // Seleciona e observa todos os blocos de conteúdo na seção final
  document.querySelectorAll(".reveal-element").forEach((el) => {
    finalObserver.observe(el);
  });

  // Listener para o botão que levará à verdadeira última seção
  const btnGoToEnd = document.getElementById("btn-go-to-end");
  btnGoToEnd.addEventListener("click", () => {
    console.log("Iniciando a seção final absoluta...");
    // A lógica para a seção final entrará aqui

    // Elementos da Tela Final Absoluta
    const btnGoToEnd = document.getElementById("btn-go-to-end");
    const absoluteFinalSection = document.getElementById(
      "absolute-final-section",
    );
    const absoluteFinalTexts = document.querySelectorAll(
      ".absolute-final-text",
    );

    // Transição 5: Encerramento -> Tela Final Absoluta
    btnGoToEnd.addEventListener("click", () => {
      // Inicia o fade out da Seção 5 (Encerramento e Extras)
      finalSection.classList.add("opacity-0", "pointer-events-none");

      setTimeout(() => {
        finalSection.classList.add("hidden");

        // Ativa a Seção 6 (Tela Final)
        absoluteFinalSection.classList.remove("hidden");

        // Pequeno frame de espera para o navegador aplicar o display block
        requestAnimationFrame(() => {
          // Revela o fundo da última tela
          absoluteFinalSection.classList.remove("opacity-0");

          // Revela as frases e o coração com os tempos perfeitamente calculados (delays do HTML)
          absoluteFinalTexts.forEach((text) => {
            text.classList.remove("opacity-0", "translate-y-4");
          });
        });
      }, 1000); // Tempo para a seção 5 desaparecer completamente
    });
  });
});

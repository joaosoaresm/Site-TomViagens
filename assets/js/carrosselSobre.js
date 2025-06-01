let slideIndex = 0;
const slides = document.querySelectorAll(".carrossel-sobre .slide");
let slideInterval;

function mostrarSlide(n) {
  slideIndex = (n + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.remove("ativo");
    if (i === slideIndex) {
      slide.classList.add("ativo");
    }
  });
}

function mudarSlide(n) {
  mostrarSlide(slideIndex + n);
  resetarAutoPlay();
}

function iniciarAutoPlay() {
  slideInterval = setInterval(() => {
    mostrarSlide(slideIndex + 1);
  }, 5000);
}

function resetarAutoPlay() {
  clearInterval(slideInterval);
  iniciarAutoPlay();
}

// Inicia
mostrarSlide(slideIndex);
iniciarAutoPlay();

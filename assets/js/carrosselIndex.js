const images = document.querySelector(".carrossel-images");
const total = images.children.length;
let index = 0;
let intervalId;

function showSlide(i) {
  index = (i + total) % total;
  images.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  showSlide(index + 1);
}

function prevSlide() {
  showSlide(index - 1);
}

document.querySelector(".next").onclick = () => {
  nextSlide();
  resetAutoPlay();
};

document.querySelector(".prev").onclick = () => {
  prevSlide();
  resetAutoPlay();
};

function startAutoPlay() {
  intervalId = setInterval(nextSlide, 5000);
}

function resetAutoPlay() {
  clearInterval(intervalId);
  startAutoPlay();
}


fetch('destinos.json')
  .then(res => res.json())
  .then(destinos => {
    const destaque = destinos.find(d => d.destaque === true);
    if (!destaque) return;

    document.getElementById('destaque-titulo').textContent = destaque.titulo;

    const container = document.getElementById('destaque-imagens');
    const imagens = destaque.imgs ?? [destaque.img];

    imagens.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = destaque.titulo;
      container.appendChild(img);
    });

    // Inicializa o carrossel DEPOIS que as imagens foram inseridas
    startAutoPlay();
  });

function iniciarCarrossel() {
  // ... seu código do carrossel aqui ...
}

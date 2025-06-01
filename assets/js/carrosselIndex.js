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

startAutoPlay();
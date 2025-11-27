const wrapper = document.getElementById("slider-wrapper");
const track = document.getElementById("logo-track");

// Clone track untuk efek infinite
const clone = track.cloneNode(true);
wrapper.appendChild(clone);

wrapper.style.overflowX = "hidden";
wrapper.scrollLeft = 0;

let scrollPos = 0;
const speed = 0.3;

function animateSlider() {
  scrollPos += speed;
  wrapper.scrollLeft = scrollPos;

  if (scrollPos >= track.scrollWidth) {
    scrollPos = 0;
  }

  requestAnimationFrame(animateSlider);
}

animateSlider();

// carousel
const carousels = document.getElementById("carouselwrap");
let index = 0;
let pembagi = 0;

function updateHeight() {
  console.log("updateHeight called");
  const cards = document.querySelectorAll(".cards");
  const activeCard = cards[index];
  if (window.innerWidth >= 1024) {
    console.log("dekstop");
    carousels.style.height = "auto";
    carousels.style.transform = "none";
    return;
  }
  console.log("mobile");
  const h = activeCard.offsetHeight + 60;
  carousels.style.height = h + "px";
}

carousels.addEventListener("scroll", () => {
  pembagi = (carousels.scrollWidth - carousels.clientWidth) / 4;
  index = Math.floor((carousels.scrollLeft + carousels.scrollLeft / 4) / pembagi);
  console.log(index);
  updateHeight();
});
window.onload = updateHeight;

let resizeTimeout;

window.addEventListener("resize", () => {
  updateHeight();
});

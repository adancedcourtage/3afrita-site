const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(item);
});

const heroImage = document.querySelector(".hero-media img");
const cards = document.querySelectorAll(".collection-card, .product-dossier, .gallery-item, .signature-card");

window.addEventListener(
  "scroll",
  () => {
    if (!heroImage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const y = Math.min(window.scrollY, window.innerHeight);
    heroImage.style.transform = `scale(${1.03 + y / 9000}) translateY(${y * 0.025}px)`;
  },
  { passive: true }
);

cards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  });
});

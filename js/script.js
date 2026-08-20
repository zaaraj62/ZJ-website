// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Sticky header shadow/border on scroll
const siteHeader = document.getElementById("siteHeader");
const progressBar = document.getElementById("progressBar");

function onScroll() {
  siteHeader.classList.toggle("scrolled", window.scrollY > 8);

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + "%";
}
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Scroll-spy: highlight active nav link
const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinkEls.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
);
sections.forEach((section) => spyObserver.observe(section));

// Scroll reveal animation
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Copy email to clipboard (mailto: alone is unreliable without a configured mail client)
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll(".email-link").forEach((link) => {
  link.addEventListener("click", async (e) => {
    const email = "zaarajaved62@gmail.com";
    if (!navigator.clipboard) return; // let mailto: proceed as-is
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied to clipboard");
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
});

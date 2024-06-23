/*=============== Active Link =============== */
const navlink = document.querySelectorAll(".nav__link");

function activeLink() {
  navlink.forEach((a) => a.classList.remove("active-link"));
  this.classList.add("active-link");
}

navlink.forEach((a) => a.addEventListener("click", activeLink));

/*=============== Mixitup Filter =============== */
let mixerProjects = mixitup(".projects__container", {
  selectors: {
    target: ".project__item",
  },
  animation: {
    duration: 300,
  },
});

/* Active Work */
const linkWork = document.querySelectorAll(".category__btn");

function activeWork() {
  linkWork.forEach((a) => a.classList.remove("active-work"));
  this.classList.add("active-work");
}

linkWork.forEach((a) => a.addEventListener("click", activeWork));

/*=============== Testimonials Swiper =============== */
var testiSwiper = new Swiper(".testimonial__container", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
});

/*scroll to top*/
let isScrolling;

window.addEventListener("scroll", () => {
  const scrollButton = document.getElementById("scroll-to-top");
  scrollButton.style.visibility = "hidden";

  window.clearTimeout(isScrolling);

  isScrolling = setTimeout(() => {
    if (window.scrollY > 300) {
      scrollButton.style.visibility = "visible";
    } else {
      scrollButton.style.visibility = "hidden";
    }
  }, 500);
});

document.getElementById("scroll-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*Cookie*/
document
  .getElementById("accept-cookies")
  .addEventListener("click", function () {
    document.getElementById("cookie-banner").style.display = "none";
    localStorage.setItem("cookiesAccepted", true);
  });

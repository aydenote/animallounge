"use strict";

//새로고침 시 항상 top:0 위치로 이동된다.
history.scrollRestoration = "manual";

// Navbar 투명화
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

// Navbar 메뉴 클릭시 스크롤 이동
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const link = event.target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// navbar 토글 버튼
const toggleBtn = document.querySelector(".navbar__toggle__button");

toggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// 스크롤시 HOME content 투명화

const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 이래로 스크롤시 arrow top button 활성화
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// arrow top button 클릭시 페이지 맨 위로 이동.
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// 스크롤시 해당 Menu item들 색 표시.
const sectionIds = ["#home", "#story", "#audition", "#contact"];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  console.log(selected);
  if (selected.dataset.link === "#story") {
    carousel__content[0].classList.add("fadein");
    let text = Array.from(text__container[0].children);
    text.forEach((item) => {
      item.style.animation = `fade 1s ${(timer += 1000)}ms forwards`;
    });
    timer = 1000;
    backgroundImg[0].classList.add("mainImg");
  } else {
    carousel__content[0].classList.remove("fadein");
  }
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

// 스크롤 이동
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

window.addEventListener("wheel", () => {
  // 스크롤이 제일 위에 이동시
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  }
  // 제일 밑으로 스크롤 이동시
  else if (
    Math.round(window.scrollY + window.innerHeight) ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

// carousel
const carousel__content = document.querySelectorAll(".carousel__content");
const carousel__left = document.querySelector(".carousel__left");
const carousel__right = document.querySelector(".carousel__right");
const text__container = document.querySelectorAll(".text__container");
const inner__img = document.querySelectorAll(".inner img");
const backgroundImg = document.querySelectorAll(".background__img");
let backgrouondArr = Array.from(backgroundImg);

let imgSrc = ["mainImg", "whaleImg", "albatrossImg", "crocodileImg", "crabImg"];

let move = 0;
let index = 0;
let timer = 0;

carousel__left.addEventListener("click", function () {
  move += 100;
  if (move == 100) {
    move = -400;
    index = 5;
  }
  document.querySelector(
    ".carousel__container"
  ).style.transform = `translate(${move}%)`;

  carousel__content[(index -= 1)].classList.add("fadein");
  backgrouondArr[index].classList.add(imgSrc[index]);
  let text = Array.from(text__container[index].children);
  text.forEach((item) => {
    item.style.animation = `fade 1s ${(timer += 1000)}ms forwards`;
  });
  timer = 1000;
});

carousel__right.addEventListener("click", function () {
  move -= 100;
  if (move == -500) {
    move = 0;
    index = -1;
  }
  document.querySelector(
    ".carousel__container"
  ).style.transform = `translate(${move}%)`;

  carousel__content[(index += 1)].classList.add("fadein");
  backgrouondArr[index].classList.add(imgSrc[index]);

  let text = Array.from(text__container[index].children);
  text.forEach((item) => {
    item.style.animation = `fade 1s ${(timer += 1000)}ms forwards`;
  });
  timer = 1000;
});

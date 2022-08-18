"use strict";

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
const sectionIds = ["#home", "#notice", "#story", "#audition", "#contact"];
const sections = sectionIds.map((id) => document.querySelector(id));

const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
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

// 캐러셀
// const center = document.querySelector(".list-item");
// const story = `태고신은 자신을 본따 인간을 만들고
// 자신의 추종자를 본따 짐승들을 만들어냈다.

// 시간이 흘러 태고신은 영면에 들게되었고
// 후계자에게 자리를 물려주었지만
// 친 인간파 였던 후계자는 금기사항을 어기고
// 짐승들의 영성을 빼앗았다

// 친 인간파인 후계자에게 대항하기 위해
// 태고신의 추종자는 그 어디에도 속하지못하고 배척받은

// 짐승들에게 태고신의 힘을 빌려
// 영성을 돌려주고 애니멀 라운지라는 단체를 개설해
// 인간과 동물의 화합을 추진하도록 한다
// `;

// const story1 = `그 중 첫번째 이야기,
// 일각고래 일족, 그 일족은 태고부터 내려온 신비한 힘이
// 그 뿔에 담긴 일족이다. 그들은 바다의 유니콘이라 불리우며
// 바다의 생태를 정화하는것을 업으로 삼았었다. 하지만 영성을 빼앗긴 후,
// 무분별한 사냥과 포획으로 그들의 개체는 80프로 이상 사라지고
// 그들은 인간들을 피해 바다 깊숙한 해저의 자리를 트고
// 더 이상 인간계에선 보이지 않았었다. 그렇게 숨어살던 일각고래 일족의
// 한 아이는 인간에게 호기심이 생겨 인간에게 가까이 다가갔었다.
// 이 아이는 인간의 위험성을 모르고 다가갔다가 되려 뿔이 잘리게 되었다.
// 그로인해 금기를 어겨 일족으로부터 버려진 한 일각고래의 이야기이다.`;

// const story2 = `그 중 두번째 이야기,
// 알바트로스 일족, 알바트로스 일족은 세상에서 가장 큰 새 일족으로,
// 태고의 알바트로스 일족은 그 위엄이 하늘을 덮을 정도였다.
// 그 모습을 본 과거의 인간들은 마치 크나큰 검은 날개를 보고
// 신성시 여기었었다. 그 후로 많은 시간이 흐르고
// 발전하고 발달한 인간과는 달리 점점 도태되어가고
// 그 수도 줄어들고 있었다. 그 중에서도 너무 작은 아이가 태어나
// 멸족의 징조라며 모두 그 아이를 미워하고 싫어하게 되었다.
// 이것은 가장 작은 알바트로스의 이야기이다.`;

// const story3 = `그 중 세번째 이야기,
// 악어 일족, 이들은 앞서 다룬 일족들과는 달리 그리 희귀하진 않다.
// 이들의 개체수는 정말 차고 넘칠정도로 많고, 인간사회에도 스며들었다.
// 하지만 그들중에서도 정말 낮은 확률로 특이한 개체가 태어난다.
// 인간들에게는 정말 신성시 여겨지고 희귀하게 여겨지는 알비노들이다.
// 하지만 그들 악어 일족에게는 그저 저주받은 아이로 취급받기 일수였다.
// 저주받은 아이라며 손가락질 받고 배척당한 알비노 악어의 이야기이다.`;

// const story4 = `그 중 네번째 이야기 ,
// 랍스터 일족, 이들은 큰 집게를 가진것을 자부심으로 생각하는 일족이다.
// 가장 큰 집게를 지닌 랍스터가 족장이 되는 전통을 가지고 있었다.
// 당시 가장 큰 집게를 가진 선대 족장이 자식을 낳았는데,
// 그 아이는 한쪽 집게만 족장을 닮고 나머지 한쪽은 정말 볼품없을 정도로
// 작았다. 부모와 비교할수록 정말 작은 한쪽 집게 때문에 그 아이는
// 일족 내에서도 무시를 당해왔었다.
// 결국 일족들에게 버림받고 외톨이가 된 한 랍스터에 관한 이야기이다.`;

// const arrPic = [
//   "/images/dark-g4d46c1a07_1920.png",
//   "/images/dark-g4d46c1a07_1920.png",
//   "/images/dark-g4d46c1a07_1920.png",
//   "/images/dark-g4d46c1a07_1920.png",
//   "/images/dark-g4d46c1a07_1920.png",
// ];

// const storyArr = [story, story1, story2, story3, story4];

// storyArr.forEach((item) => {
//   const elLi = document.createElement("li");
//   elLi.innerHTML = `<p>${item}</p>`;
//   center.appendChild(elLi);
// });

// arrPic.forEach((item) => {
//   const elLi = document.createElement("li");
//   elLi.innerHTML = `<img src=${item} alt="">`;
//   center.appendChild(elLi);
// });

// const items = document.querySelectorAll(".list-item li");
// const radius = (items[0].offsetWidth * items.length) / 3.14 / 2;
// items.forEach((item, index) => {
//   item.style.transform = `rotateY(${
//     (360 / items.length) * index
//   }deg) translateZ(${radius}px)`;
// });

// const angle = 360 / items.length;
// let curr_angle = 0;

// const storySection = document.querySelector("#story");
// let currentIndex = 0;
// storySection.addEventListener("click", (event) => {
//   const currentContent = Array.from(items).at(currentIndex);
//   if (window.innerWidth / 2 < event.clientX) {
//     curr_angle -= angle;
//     currentIndex += 1;
//   } else {
//     curr_angle += angle;
//     currentIndex -= 1;
//   }
//   center.style.transform = `translate(-50%, -50%) rotateY(${curr_angle}deg)`;
//   // currentContent.classList.add("center");
// });

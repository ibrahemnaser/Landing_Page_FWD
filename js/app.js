/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const navUl = document.getElementById("navbar__list");
const mainContainer = document.querySelector("main");
const mainSections = document.querySelectorAll("main section");

const p2Text = `Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar
gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam.
Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum
consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget
elementum tortor mollis non.`;

const p1Text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
fermentum metus faucibus lectus pharetra dapibus. Suspendisse
potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget
lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed
convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla
eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam
nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis
lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a
tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus
vitae elit. Integer nec libero venenatis libero ultricies molestie
semper in tellus. Sed congue et odio sed euismod.`;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

function buildMenu() {
  const fragment = document.createDocumentFragment();
  const sections = document.querySelectorAll("main section");
  for (ele of sections) {
    const liItem = document.createElement("li");
    const anchorItem = document.createElement("a");
    anchorItem.textContent = ele.dataset.nav;
    anchorItem.classList.add("menu__link");
    anchorItem.setAttribute("href", `#${ele.id}`);
    liItem.appendChild(anchorItem);
    fragment.appendChild(liItem);
  }
  return fragment;
}

function scrollingAction() {
  navUl.addEventListener("click", (e) => {
    e.preventDefault();
    const sec = document.querySelector(e.target.hash);
    sec.scrollIntoView({ behavior: "smooth" });
  });
}

function buildMoreSections(nums) {
  const frag = document.createDocumentFragment();
  for (let i = 1; i <= nums; i++) {
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const h2 = document.createElement("h2");
    const div = document.createElement("div");
    const sec = document.createElement("section");
    p2.textContent = p2Text;
    p1.textContent = p1Text;
    h2.textContent = `Section ${mainSections.length + i}`;
    div.classList.add("landing__container");
    sec.dataset.nav = `Section ${mainSections.length + i}`;
    sec.setAttribute("id", `section${mainSections.length + i}`);
    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2);
    sec.appendChild(div);
    frag.appendChild(sec);
  }
  mainContainer.appendChild(frag);
}

// build more sections in the HTML
buildMoreSections(2);

// build the nav
navUl.appendChild(buildMenu());

// Scroll to section on link click
scrollingAction();

// Set sections as active and Add class 'active' to section when near top of viewport
window.addEventListener("scroll", () => {
  const anchors = document.querySelectorAll(".menu__link");
  const activeSection = document.getElementsByClassName("section__active")[0];
  const sections = document.querySelectorAll("main section");

  for (ele of sections) {
    if (
      Math.abs(ele.getBoundingClientRect().top) <= 50 &&
      ele.getBoundingClientRect().bottom >= 150
    ) {
      activeSection.classList.remove("section__active");
      ele.classList.add("section__active");
    }
  }
  for (item of anchors) {
    item.classList.remove("active");
    if (activeSection.dataset.nav == item.textContent) {
      item.classList.add("active");
    }
  }
});

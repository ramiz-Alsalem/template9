/* Get color from localStorage */
if (localStorage.getItem("main-color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    `${localStorage.getItem("main-color")}`
  );
  document.querySelectorAll(".colors-list li").forEach((li) => {
    li.classList.remove("active");
  });
  document.querySelector(
    `.colors-list [data-color="${localStorage.getItem("main-color")}"]`
  ).className = "active";
}

let backgroundOption = true;
let theBackgroundInterval;

// check if there is localStorage rondomBackground item
if (localStorage.getItem("background-option")) {
  // backgroundOption = localStorage.getItem("background-option");
  document.querySelectorAll(".random-backgrounds button").forEach((btn) => {
    btn.classList.remove("active");
  });
  if (localStorage.getItem("background-option") === "true") {
    backgroundOption = true;
    document.querySelector("[data-background='yes']").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector("[data-background='no']").classList.add("active");
  }
}

/* Toggle spin class on icon and open on settings-box */
let icon = document.querySelector(".toggle-settings .settings-box__icon");
let settingsBox = document.querySelector(".settings-box");

icon.onclick = function () {
  icon.classList.toggle("fa-spin");
  settingsBox.classList.toggle("open");
  settingsBox.classList.toggle("box-shadow");
};

// Style lis (add colors) and switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.style.backgroundColor = li.dataset["color"];
});

colorsLi.forEach((li) => {
  li.addEventListener("click", function (e) {
    addActiveClass(colorsLi, e);
    // Add color To Local Storage
    localStorage.setItem("main-color", `${this.dataset["color"]}`);
    // Set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      `${localStorage.getItem("main-color")}`
    );
  });
});

// Switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrounds button");

randomBackEl.forEach((button) => {
  button.addEventListener("click", function (e) {
    addActiveClass(randomBackEl, e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(theBackgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

// Select Landing page element
let landingPage = document.querySelector(".landing-page");

// get array of images
let imgsArray = [];

for (let i = 1; i <= 5; i++) {
  imgsArray.push(`0${i}.jpg`);
}

function randomizeImgs() {
  // Change background image url (Random)
  if (backgroundOption) {
    theBackgroundInterval = setInterval(() => {
      let randomNumber = parseInt(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 10000);
  }
}

randomizeImgs();

/* Select Skills selector */
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height
  let windowHeight = this.innerHeight;

  // window scroll Top
  let windowScrollTop = scrollY;

  if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windowHeight) {
    document.querySelectorAll("[data-progress]").forEach((prog) => {
      prog.style.width = `${prog.dataset.progress}`;
      prog.style.transition = "1s ease-in-out";
    });
  }
};

// Create popup with the image
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup";
    let popupImage = document.createElement("img");
    popupImage.src = `${e.target.src}`;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    if (popupImage.alt !== null) {
      let imgHeading = document.createElement("h3");
      imgHeading.classList.add("text-align-center");
      imgHeading.innerText = e.target.alt;
      popupBox.prepend(imgHeading);
    }
    let closeBtn = document.createElement("span");
    closeBtn.innerText = "X";
    popupBox.append(closeBtn);
    closeBtn.className = "close-btn";
    closeBtn.onclick = function () {
      overlay.remove();
      popupBox.remove();
    };
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup-overlay")) {
    e.target.remove();
    document.querySelector(".popup").remove();
  }
});

// Automatic bullets

const sections = document.querySelectorAll("section");
let navBullets = document.querySelector(".nav-bullets");
sections.forEach((sec) => {
  if (sec.hasAttribute("class") && sec.className !== "") {
    let bullet = document.createElement("div");
    bullet.classList.add("bullets", "transition");
    bullet.setAttribute("data-section", `.${sec.className}`);
    let tooltip = document.createElement("div");
    tooltip.classList.add("tooltip", "transition");

    let tooltipContent = sec.className.split("-").join(" ");
    for (let i = 0; i < tooltipContent.length; i++) {
      if (i === 0) {
        tooltipContent =
          tooltipContent.slice(0, 1).toUpperCase() +
          tooltipContent.slice(i + 1);
      }
      if (i < tooltipContent.length - 1) {
        if (tooltipContent[i] === " ") {
          tooltipContent =
            tooltipContent.slice(0, i + 1) +
            tooltipContent.slice(i + 1, i + 2).toUpperCase() +
            tooltipContent.slice(i + 2);
        }
      }
    }

    tooltip.innerText = `${tooltipContent}`;
    navBullets.appendChild(bullet);
    bullet.appendChild(tooltip);
  }
});

// Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullets");

scrollToSection(allBullets);

// Select navigation items

const links = document.querySelectorAll(".links a");

links.forEach((link) => {
  link.onclick = function (e) {
    addActiveClass(links, e);
  };
});

scrollToSection(links);

function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(`${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function addActiveClass(elements, e) {
  elements.forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}

let bulletsBtn = document.querySelectorAll(".bullets-option button");

let bulletsContainer = document.querySelector(".nav-bullets");

if (localStorage.getItem("bullets-option")) {
  bulletsBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`[data-display="${localStorage.getItem("bullets-option")}"]`)
    .classList.add("active");

  if (localStorage.getItem("bullets-option") === "show") {
    bulletsContainer.style.visibility = "visible";
    bulletsContainer.style.opacity = "1";
  } else {
    bulletsContainer.style.visibility = "hidden";
    bulletsContainer.style.opacity = "0";
  }
}

bulletsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    addActiveClass(bulletsBtn, e);
    if (e.target.dataset.display === "show") {
      bulletsContainer.style.visibility = "visible";
      bulletsContainer.style.opacity = "1";
      localStorage.setItem("bullets-option", `${e.target.dataset.display}`);
    } else {
      bulletsContainer.style.visibility = "hidden";
      bulletsContainer.style.opacity = "0";
      localStorage.setItem("bullets-option", `${e.target.dataset.display}`);
    }
  });
});

document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("main-color");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets-option");
  localStorage.removeItem("show-header");
  location.reload();
};

/* Toggle menu */
let menuBtn = document.querySelector(".links-container .toggle-menu");
let menuLinks = document.querySelector(".links-container .links");

menuBtn.onclick = function (e) {
  e.stopPropagation();
  menuLinks.classList.toggle("open");
  this.classList.toggle("show-before");
};

menuLinks.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("click", function (e) {
  if (
    menuBtn.classList.contains("show-before") &&
    menuLinks.classList.contains("open")
  ) {
    if (e.target !== menuBtn && e.target !== menuLinks) {
      menuLinks.classList.remove("open");
      menuBtn.classList.remove("show-before");
    }
  }
});

/* show Header on scroll */

let headerNav = document.querySelector(".container:has(header)");

let headerOptions = document.querySelectorAll(".header-option button");

if (localStorage.getItem("show-header")) {
  if (localStorage.getItem("show-header") === "show") {
    window.addEventListener("scroll", function () {
      if (scrollY > headerNav.offsetHeight) {
        headerNav.classList.add("show-header");
      } else {
        headerNav.classList.remove("show-header");
      }
    });
  } else {
    headerNav.classList.remove("show-header");
  }
  headerOptions.forEach((opt) => {
    opt.classList.remove("active");
  });
  document
    .querySelector(`[data-header=${localStorage.getItem("show-header")}]`)
    .classList.add("active");
}

headerOptions.forEach((opt) => {
  opt.addEventListener("click", function (e) {
    addActiveClass(headerOptions, e);
    if (e.target.dataset.header === "show") {
      window.addEventListener("scroll", function () {
        if (scrollY > headerNav.offsetHeight) {
          headerNav.classList.add("show-header");
        } else {
          headerNav.classList.remove("show-header");
        }
      });
      location.reload();
    } else {
      window.addEventListener("scroll", function () {
        if (scrollY > headerNav.offsetHeight) {
          headerNav.classList.remove("show-header");
        } else {
          headerNav.classList.remove("show-header");
        }
      });
      location.reload();
    }
    localStorage.setItem("show-header", `${e.target.dataset.header}`);
  });
});


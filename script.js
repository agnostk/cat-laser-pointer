const header = document.querySelector("header");

const pointerColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
];
const pointerColorIntensity = { normal: 500, highlight: 600 };
const defaultPointerColor = pointerColors[0];
const pointerColorLabel = document.querySelector("#pointer-color-label");
const pointerSize = 48;
let selectedPointerColor = defaultPointerColor;
let activePointers = [];

const pointerCounts = [1, 2, 3, 4];
const defaultPointerCount = pointerCounts[0];
const pointerCountLabel = document.querySelector("#pointer-count-label");
let selectedPointerCount = defaultPointerCount;

const colorDropdown = document.querySelector("#colorDropdown > div");
const countDropdown = document.querySelector("#countDropdown > div");

const main = document.querySelector("main");

function updateMenu() {
  function updateCountLabel() {
    pointerCountLabel.textContent = selectedPointerCount;
  }
  function updateColorLabel() {
    pointerColorLabel.classList.replace(
      Object.values(pointerColorLabel.classList).filter((cssClass) =>
        cssClass.startsWith("bg-")
      ),
      `bg-${selectedPointerColor}-${pointerColorIntensity.normal}`
    );
  }

  colorDropdown.innerHTML = "";
  countDropdown.innerHTML = "";

  updateCountLabel();
  updateColorLabel();

  pointerColors.forEach(
    (pointerColor, i) =>
      (colorDropdown.innerHTML += `<button class="h-6 w-6 ${
        i !== pointerColors.indexOf(selectedPointerColor) ? "hover:" : ""
      }border-2 border-slate-200 rounded-full bg-${pointerColor}-${
        pointerColorIntensity.normal
      }"
      onclick="changePointerColor(${i})"></button>`)
  );

  pointerCounts.forEach(
    (pointerCount, i) =>
      (countDropdown.innerHTML += `<button class="h-6 w-6 ${
        i !== pointerCounts.indexOf(selectedPointerCount) ? "hover:" : ""
      }border-2 border-slate-200 rounded-full bg-slate-600 text-sm font-semibold"
      onclick="changePointerCount(${i})">${pointerCount}</button>`)
  );

  clearPointers();
  renderPointer();
}

function changePointerColor(colorIndex) {
  selectedPointerColor = pointerColors[colorIndex];
  updateMenu();
}

function changePointerCount(countIndex) {
  selectedPointerCount = pointerCounts[countIndex];
  updateMenu();
}

function clearPointers() {
  main.innerHTML = "";
  activePointers = [];
}

function toggleHeader() {
  const zIndex = Object.values(header.classList).filter((cssClass) =>
    cssClass.includes("z-")
  )[0];
  header.classList.replace(zIndex, zIndex.startsWith("-") ? "z-10" : "-z-10");
}

function renderPointer() {
  const pointerId = +Date.now() + Math.random().toString(36).substring(2);
  main.innerHTML += `
  <div id="pointer-${pointerId}" class="w-[${pointerSize}px] h-[${pointerSize}px] bg-${selectedPointerColor}-${pointerColorIntensity.normal} rounded-full shadow-[0_0_30px_10px] shadow-${selectedPointerColor}-${pointerColorIntensity.highlight} absolute"></div>`;
  const pointer = document.querySelector(`#pointer-${pointerId}`);
  activePointers.push(pointer);
  pointer.style.top = `${main.offsetHeight / 4}px`;
  pointer.style.left = `${main.offsetWidth / 2}px`;
}

function movePointer(event) {
  activePointers.forEach((pointer) => {
    pointer.style.top = `${event.clientY - pointerSize / 2}px`;
    pointer.style.left = `${event.clientX - pointerSize / 2}px`;
  });
}

updateMenu();

main.style.cursor = "none";

document.addEventListener(
  "keydown",
  (event) => event.code === "KeyH" && toggleHeader()
);

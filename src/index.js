import "./styles/main.css";

const switcher = document.querySelector("#theme-switcher");

switcher.addEventListener("change", () => {
  const html = document.querySelector("html");
  html.classList.toggle("dark");
});

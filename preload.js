const { exec } = require("child_process");
const { uIOhook, UiohookKey } = require("uiohook-napi");

let backgroundColor;

uIOhook.on("keydown", (e) => {
  if (e.keycode === UiohookKey.Q) {
    timeout = setTimeout(alertFunc, 3000);
    backgroundColor.style.backgroundColor = "black";
  }
});

uIOhook.on("keyup", (e) => {
  if (e.keycode === UiohookKey.Q) {
    backgroundColor.style.backgroundColor = "green";
  }
});

const colorChanger = () =>{
    backgroundColor.style.backgroundColor.togg
}

window.addEventListener("DOMContentLoaded", () => {
  backgroundColor = document.getElementById('bg');
  const buttonTest = document.getElementById("test");
  buttonTest.addEventListener("click", () => {});
});

uIOhook.start();

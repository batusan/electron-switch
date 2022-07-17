/*
  TODO 
  -MOUSE SUPPORT (inş)
*/
const { exec } = require("child_process");
const { uIOhook, UiohookKey } = require("uiohook-napi");

let isSwitching = false; // Secure timeout
let delay = 3000; //ms
let switchKey = UiohookKey.Q; // Default Q

let sound = new Audio("mc.mp3"); // nam nam sound

uIOhook.on("keydown", (e) => {
  if (!isSwitching) {
    if (e.keycode === switchKey) {
      switchIt();
      timeout = setTimeout(switchIt, delay);
    }
  }
});

const switchIt = () => {
  if (!isSwitching) {
    sound.play();
    execute(
      "netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound",
      (output) => {
        console.log(output);
      }
    );
  } else {
    execute(
      "netsh advfirewall set allprofiles firewallpolicy blockinbound,allowoutbound",
      (output) => {
        console.log(output);
      }
    );
  }
  isSwitching = !isSwitching;
};

window.addEventListener("DOMContentLoaded", () => {
  let saveBtn = document.querySelector("#btn_save");
  let keys = document.querySelector("#keys");
  let msDelay = document.querySelector("#msdelay");

  //Save Key
  saveBtn.addEventListener("click", () => {
    if (msDelay.value > 0) {
      delay = msDelay.value;
    } else {
      alert("set ms delay to higher than 0");
    }
    switchKey = parseInt(keys.value);
  });

  //Insert keys to select input
  if (UiohookKey) {
    for (key in UiohookKey) {
      var opt = document.createElement("option");
      opt.value = UiohookKey[key];
      opt.innerHTML = key;
      keys.appendChild(opt);
    }
  }
});

//execute powershell commands from this func
function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
}

uIOhook.start();

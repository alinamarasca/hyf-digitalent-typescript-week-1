import { encryptText } from "./modules/encrypt.js";

let plainText = "";
let shift = "";
let encryptedValue = "";

const getText = () => {
  let text = document.getElementById("plaintext").value;
  plainText = text;
  encryptedValue = encryptText(plainText, shift);
  document.getElementById("encryptedtext").value = encryptedValue;
};
const getShift = () => {
  let select = document.getElementById("shift");
  let shiftValue = select.options[select.selectedIndex].text;
  shift = shiftValue;
  encryptedValue = encryptText(plainText, shift);
  document.getElementById("encryptedtext").value = encryptedValue;
};
const cleanInput = () => {
  document.getElementById("plaintext").value = "";
  document.getElementById("encryptedtext").value = "";
};
document.getElementById("plaintext").addEventListener("change", getText);
document.getElementById("plaintext").addEventListener("click", cleanInput);
document.getElementById("shift").addEventListener("change", getShift);

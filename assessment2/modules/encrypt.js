// letter is replaced with a letter by some fixed number of positions down the alphabetical series
//  (e.g., a shift of 1 replaces the letter a with b, the letter e with f, the word hello with ifmmp, etc.).
// Text from the textarea is encrypted and rendered for the user
// Encryption happens when the “shift” value is set
// Encryption of the text is updated which each new
// character typed by the user given there is a value set for “shift”

// export const encrypt = (str, num) => {
//   // you can comment this line
//   str = str.toLowerCase();

//   var result = "";
//   var charcode = 0;

//   for (var i = 0; i < str.length; i++) {
//     charcode = str[i].charCodeAt() + num;
//     result += String.fromCharCode(charcode);
//   }
//   return result;
// };

export const encryptText = (plainText, shift) => {
  let cipherArr = [];
  let cipherLetter;

  plainText.split("").map(letter => {
    let code = letter.charCodeAt(letter);
    if (letter === " ") {
      return cipherArr.push(letter);
    }
    // Uppercase letters
    if (code >= 65 && code <= 90) {
      cipherLetter = String.fromCharCode(((code - 65 + shift) % 26) + 65);
    }
    // Lowercase letters
    else if (code >= 97 && code <= 122) {
      cipherLetter = String.fromCharCode(((code - 97 + shift) % 26) + 97);
    }
    return cipherArr.push(cipherLetter);
  });
  return cipherArr.join("");
};

export default { encryptText };

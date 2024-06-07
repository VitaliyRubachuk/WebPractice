
var userInput = prompt("Скільки вам років?");

var isAdult = parseInt(userInput, 10) >= 18;

if (isAdult)
     {
    console.log("Ви досягли повнолітнього віку.");
} else {
    console.log("Ви ще надто молоді.");
}

var userInput = prompt("Введіть будь-яке число:");

if (userInput % 2 === 0 && userInput > 0) {
    console.log(userInput + " є парним додатним числом.");
} else {
    console.log(userInput + " не є парним додатним числом.");
}

if (userInput % 7 === 0) {
    console.log(userInput + " кратне числу 7.");
} else {
    console.log(userInput + " не кратне числу 7.");
}

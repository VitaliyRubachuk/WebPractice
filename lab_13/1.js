
var sideA = parseFloat(prompt("Введіть довжину сторони A:"));
var sideB = parseFloat(prompt("Введіть довжину сторони B:"));
var sideC = parseFloat(prompt("Введіть довжину сторони C:"));


if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC) || sideA <= 0 || sideB <= 0 || sideC <= 0) {
    console.log("Incorrect data");
} else {

    var semiPerimeter = (sideA + sideB + sideC) / 2;

    var triangleArea = Math.sqrt(semiPerimeter * (semiPerimeter - sideA) * (semiPerimeter - sideB) * (semiPerimeter - sideC));

    console.log("Площа трикутника:", triangleArea.toFixed(3));

    var isRightTriangle = (sideA * sideA + sideB * sideB === sideC * sideC) || 
                          (sideA * sideA + sideC * sideC === sideB * sideB) || 
                          (sideB * sideB + sideC * sideC === sideA * sideA);

    console.log("Чи є трикутник прямокутним:", isRightTriangle ? "Так" : "Ні");
}

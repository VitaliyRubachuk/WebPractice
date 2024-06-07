
let car =
 {
    engine: 
    {
        cylinders: 4,
        horsepower: 200
    }
};

let { engine: { cylinders: engineCylinders, horsepower: engineHorsepower } } = car;

console.log("Кількість циліндрів двигуна:", engineCylinders);
console.log("Потужність двигуна (кінські сили):", engineHorsepower);

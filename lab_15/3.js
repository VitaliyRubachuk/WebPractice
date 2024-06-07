
let student = 
{
    name: "Віталій",
    age: 18,
    gender: "male"
};

let { name: studentName, age: studentAge, gender: studentGender } = student;

console.log("Ім'я студента:", studentName);
console.log("Вік студента:", studentAge);
console.log("Стать студента:", studentGender);

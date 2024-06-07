
var currentTime = new Date().getHours();

switch (true) 
{
    case (currentTime >= 23 || currentTime < 5):
        alert("Доброї ночі");
        console.log("Доброго ночі");
        break;
    case (currentTime >= 5 && currentTime < 11):
        alert("Доброго ранку");
        console.log("Доброго ранку");
        break;
    case (currentTime >= 11 && currentTime < 17):
        alert("Доброго дня");
        console.log("Доброго дня");
        break;
    default:
        alert("Доброго вечора");
        console.log("Доброго вечора");
}

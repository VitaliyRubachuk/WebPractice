function findUnique(arr) {

    var uniqueArr = arr.filter(function(value, index, self)
     {
        return self.indexOf(value) === index;
    });
    
    return arr.length === uniqueArr.length;
}

var inputArray = prompt("Введіть елементи масиву через кому (наприклад, 1,2,3):").split(",").map(Number);
var isUnique = findUnique(inputArray);

if (isUnique)
     {
    alert("Усі елементи масиву є унікальними!");
} else {
    alert("Масив містить дублі!");
}

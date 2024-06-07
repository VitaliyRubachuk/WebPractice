
var shoppingList = [];

function displayShoppingList()
 {
    var unpurchasedItems = shoppingList.filter(item => !item.bought);
    var purchasedItems = shoppingList.filter(item => item.bought);

    console.log("Некуплені продукти:");
    unpurchasedItems.forEach(item => console.log(item.name + " - " + item.quantity));

    console.log("Куплені продукти:");
    purchasedItems.forEach(item => console.log(item.name + " - " + item.quantity));
}


function addItemToShoppingList(name, quantity) 
{
    var existingItem = shoppingList.find(item => item.name === name);

    if (existingItem)
         {
        existingItem.quantity += quantity;
    } else { 
        shoppingList.push({ name: name, quantity: quantity, bought: false });
    }
}

function buyItem(name)
 {

    var item = shoppingList.find(item => item.name === name);


    if (item) {
        item.bought = true;
        console.log(name + " був придбаний.");
    } else {
        console.log("Продукт не знайдений у списку покупок.");
    }
}


addItemToShoppingList("Молоко", 1);
addItemToShoppingList("Хліб", 2);
addItemToShoppingList("Масло", 1);
addItemToShoppingList("Молоко", 2); 
displayShoppingList();

buyItem("Хліб");
displayShoppingList();

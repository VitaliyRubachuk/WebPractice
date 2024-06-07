
const editableDiv = document.getElementById('editableDiv');

editableDiv.addEventListener('click', function()
 {
    const newText = prompt('Введіть новий текст для елементу div:');
    if (newText !== null)
         {
        editableDiv.textContent = newText;
    }
});

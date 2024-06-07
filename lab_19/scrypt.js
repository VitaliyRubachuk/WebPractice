document.getElementById('createProductBtn').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'block';
});

document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'none';
});

document.getElementById('myModal').addEventListener('click', function(event) {
    if (event.target === this) {
        document.getElementById('myModal').style.display = 'none';
    }
});

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const discount = document.getElementById('discount').value;
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').value;

    if (!title || !description || !price || !category || !image) {
        document.getElementById('errorMessage').style.display = 'block';
        return;
    }

    if (price < 0) {
        document.getElementById('errorMessage').style.display = 'block';
        return;
    }

    const product = {
        title,
        description,
        price,
        discount,
        category,
        image
    };

    console.log(product);

    clearForm();
    document.getElementById('myModal').style.display = 'none';
});

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('discount').value = '';
    document.getElementById('category').value = '';
    document.getElementById('image').value = '';
}

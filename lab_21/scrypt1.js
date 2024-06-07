document.getElementById('createProductBtn').addEventListener('click', function() 
{
    document.getElementById('myModal').style.display = 'block';
});

document.getElementsByClassName('close')[0].addEventListener('click', function()
 {
    document.getElementById('myModal').style.display = 'none';
});

document.getElementById('myModal').addEventListener('click', function(event) 
{
    if (event.target === this) {
        document.getElementById('myModal').style.display = 'none';
    }
});

document.getElementById('productForm').addEventListener('submit', function(event)
 {
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

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    clearForm();
    document.getElementById('myModal').style.display = 'none';

    renderProductCard(product);
});

document.getElementById('editProductForm').addEventListener('submit', function(event) 
{
    event.preventDefault();

    const editedTitle = document.getElementById('editTitle').value;
    const editedDescription = document.getElementById('editDescription').value;
    const editedPrice = document.getElementById('editPrice').value;
    const editedDiscount = document.getElementById('editDiscount').value;
    const editedCategory = document.getElementById('editCategory').value;
    const editedImage = document.getElementById('editImage').value;

    const editedProduct =
     {
        title: editedTitle,
        description: editedDescription,
        price: editedPrice,
        discount: editedDiscount,
        category: editedCategory,
        image: editedImage
    };

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const index = products.findIndex(product => product.title === editedTitle);

    if (index !== -1) 
        {
        products[index] = editedProduct;
        localStorage.setItem('products', JSON.stringify(products));

 
        updateProductCard(editedProduct, index);
    }

    document.getElementById('editModal').style.display = 'none';
});

function clearForm()
 {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('discount').value = '';
    document.getElementById('category').value = '';
    document.getElementById('image').value = '';
}

if (localStorage.getItem('products'))
     {
    const products = JSON.parse(localStorage.getItem('products'));
    renderProductCards(products);
}

function renderProductCards(products)
 {
    
    document.getElementById('productContainer').innerHTML = '';

   
    products.forEach(product => {
        renderProductCard(product);
    });
}

function renderProductCard(product) 
{
    const card = document.createElement('div');
    card.classList.add('product-card');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function() 
    {
        card.remove();
        let products = JSON.parse(localStorage.getItem('products'));
        products = products.filter(p => p.title !== product.title);
        localStorage.setItem('products', JSON.stringify(products));
    });

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.textContent = 'Редагувати';
    editButton.addEventListener('click', function()
     {
        openEditModal(product);
    });

    const title = document.createElement('h2');
    title.textContent = product.title;

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.textContent = `Ціна: $${product.price}`;

    const category = document.createElement('p');
    category.textContent = `Категорія: ${product.category}`;

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;

    const discountFlag = document.createElement('div');
    discountFlag.classList.add('discount-flag');
    if (product.discount) {
        discountFlag.textContent = `${product.discount}% ЗНИЖКА`;
    } else {
        discountFlag.style.display = 'none';
    }
    
    card.appendChild(closeButton);
    card.appendChild(editButton);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(category);
    imageContainer.appendChild(image);
    imageContainer.appendChild(discountFlag);
    card.appendChild(imageContainer);

    document.getElementById('productContainer').appendChild(card);
}

function openEditModal(product)
 {
    document.getElementById('editTitle').value = product.title;
    document.getElementById('editDescription').value = product.description;
    document.getElementById('editPrice').value = product.price;
    document.getElementById('editDiscount').value = product.discount || '';
    document.getElementById('editCategory').value = product.category;
    document.getElementById('editImage').value = product.image;

    document.getElementById('editModal').style.display = 'block';
}

function updateProductCard(editedProduct, index) 
{
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, i) => {
        if (i === index) {
            card.querySelector('h2').textContent = editedProduct.title;
            card.querySelector('p:nth-of-type(1)').textContent = editedProduct.description;
            card.querySelector('p:nth-of-type(2)').textContent = `Ціна: $${editedProduct.price}`;
            card.querySelector('p:nth-of-type(3)').textContent = `Категорія: ${editedProduct.category}`;
            const image = card.querySelector('img');
            image.src = editedProduct.image;
            image.alt = editedProduct.title;
            const discountFlag = card.querySelector('.discount-flag');
            if (editedProduct.discount) {
                discountFlag.textContent = `${editedProduct.discount}% ЗНИЖКА`;
                discountFlag.style.display = 'block';
            } else {
                discountFlag.style.display = 'none';
            }
        }
    });
}

function closeModal() 
{
    document.getElementById('myModal').style.display = 'none';
}

function closeEditModal() 
{
    document.getElementById('editModal').style.display = 'none';
}

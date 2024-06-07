document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('products')) {
        document.getElementById('startBtn').style.display = 'block';
    } else {
        renderProductCards(JSON.parse(localStorage.getItem('products')));
    }

    document.getElementById('startBtn').addEventListener('click', fetchProducts);

    document.getElementById('clearLocalStorageBtn').addEventListener('click', () => {
        localStorage.removeItem('products');
        document.getElementById('productContainer').innerHTML = '';
        document.getElementById('startBtn').style.display = 'block';
    });

    document.getElementById('createProductBtn').addEventListener('click', () => {
        document.getElementById('myModal').style.display = 'block';
    });

    document.getElementById('productForm').addEventListener('submit', (event) => {
        event.preventDefault();
        createProduct();
    });

    document.getElementsByClassName('close')[0].addEventListener('click', () => {
        document.getElementById('myModal').style.display = 'none';
    });

    document.getElementById('filterForm').addEventListener('submit', (event) => {
        event.preventDefault();
        applyFilters();
    });
});

function fetchProducts() {
    fetch('https://dummyjson.com/products?limit=100&skip=0')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            localStorage.setItem('products', JSON.stringify(products));
            renderProductCards(products);
            document.getElementById('startBtn').style.display = 'none';
        })
        .catch(error => console.error('Error fetching products:', error));
}

function createProduct() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const discount = document.getElementById('discount').value;
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').value;

    const newProduct = {
        id: Date.now(),
        title,
        description,
        price: parseFloat(price),
        discountPercentage: parseFloat(discount),
        category,
        thumbnail: image
    };

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    renderProductCards(products);

    document.getElementById('productForm').reset();
    document.getElementById('myModal').style.display = 'none';
}

function renderProductCards(products) {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const productTitle = document.createElement('h2');
        productTitle.textContent = product.title;

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Price: $${product.price.toFixed(2)}`;

        const productDiscount = document.createElement('p');
        productDiscount.textContent = `Discount: ${product.discountPercentage}%`;

        const productCategory = document.createElement('p');
        productCategory.textContent = `Category: ${product.category}`;

        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        const productImage = document.createElement('img');
        productImage.src = product.thumbnail;
        imageContainer.appendChild(productImage);

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = () => deleteProduct(product.id);

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => openEditModal(product);

        productCard.appendChild(productTitle);
        productCard.appendChild(productDescription);
        productCard.appendChild(productPrice);
        productCard.appendChild(productDiscount);
        productCard.appendChild(productCategory);
        productCard.appendChild(imageContainer);
        productCard.appendChild(closeBtn);
        productCard.appendChild(editBtn);

        container.appendChild(productCard);
    });
}

function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    renderProductCards(products);
}

function openEditModal(product) {
    document.getElementById('editTitle').value = product.title;
    document.getElementById('editDescription').value = product.description;
    document.getElementById('editPrice').value = product.price;
    document.getElementById('editDiscount').value = product.discountPercentage;
    document.getElementById('editCategory').value = product.category;
    document.getElementById('editImage').value = product.thumbnail;
    document.getElementById('editProductForm').onsubmit = (event) => {
        event.preventDefault();
        saveProductChanges(product.id);
    };
    document.getElementById('editModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveProductChanges(productId) {
    const title = document.getElementById('editTitle').value;
    const description = document.getElementById('editDescription').value;
    const price = document.getElementById('editPrice').value;
    const discount = document.getElementById('editDiscount').value;
    const category = document.getElementById('editCategory').value;
    const image = document.getElementById('editImage').value;

    let products = JSON.parse(localStorage.getItem('products')) || [];
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        products[productIndex] = {
            ...products[productIndex],
            title,
            description,
            price: parseFloat(price),
            discountPercentage: parseFloat(discount),
            category,
            thumbnail: image
        };

        localStorage.setItem('products', JSON.stringify(products));
        renderProductCards(products);
        closeEditModal();
    }
}

function applyFilters() {
    const filterCategory = document.getElementById('filterCategory').value.toLowerCase();
    const searchTerm = document.getElementById('searchTerm').value.toLowerCase();
    const sortMethod = document.getElementById('sortMethod').value;

    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (filterCategory) {
        products = products.filter(product => product.category.toLowerCase().includes(filterCategory));
    }

    if (searchTerm) {
        products = products.filter(product => product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm));
    }

    if (sortMethod === 'priceAsc') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortMethod === 'priceDesc') {
        products.sort((a, b) => b.price - a.price);
    } else if (sortMethod === 'nameAsc') {
        products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortMethod === 'nameDesc') {
        products.sort((a, b) => b.title.localeCompare(a.title));
    }

    renderProductCards(products);
}

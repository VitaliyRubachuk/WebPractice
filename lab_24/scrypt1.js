$(document).ready(function() {
    $('#createProductBtn').click(function() {
        $('#myModal').css('display', 'block');
    });

    $('.close').click(function() {
        $('#myModal').css('display', 'none');
    });

    $('#myModal').click(function(event) {
        if (event.target === this) {
            $('#myModal').css('display', 'none');
        }
    });

    $('#productForm').submit(function(event) {
        event.preventDefault();

        const title = $('#title').val();
        const description = $('#description').val();
        const price = $('#price').val();
        const discount = $('#discount').val();
        const category = $('#category').val();
        const image = $('#image').val();

        if (!title || !description || !price || !category || !image) {
            $('#errorMessage').css('display', 'block');
            return;
        }

        if (price < 0) {
            $('#errorMessage').css('display', 'block');
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
        $('#myModal').css('display', 'none');

        renderProductCard(product);
    });

    $('#editProductForm').submit(function(event) {
        event.preventDefault();

        const editedTitle = $('#editTitle').val();
        const editedDescription = $('#editDescription').val();
        const editedPrice = $('#editPrice').val();
        const editedDiscount = $('#editDiscount').val();
        const editedCategory = $('#editCategory').val();
        const editedImage = $('#editImage').val();

        const editedProduct = {
            title: editedTitle,
            description: editedDescription,
            price: editedPrice,
            discount: editedDiscount,
            category: editedCategory,
            image: editedImage
        };

        const products = JSON.parse(localStorage.getItem('products')) || [];
        const index = products.findIndex(product => product.title === editedTitle);

        if (index !== -1) {
            products[index] = editedProduct;
            localStorage.setItem('products', JSON.stringify(products));

            updateProductCard(editedProduct, index);
        }

        $('#editModal').css('display', 'none');
    });

    $('#filterForm').submit(function(event) {
        event.preventDefault();
        applyFiltersAndSort();
    });

    function clearForm() {
        $('#title').val('');
        $('#description').val('');
        $('#price').val('');
        $('#discount').val('');
        $('#category').val('');
        $('#image').val('');
    }

    if (localStorage.getItem('products')) {
        const products = JSON.parse(localStorage.getItem('products'));
        renderProductCards(products);
    }

    function renderProductCards(products) {
        $('#productContainer').empty();

        products.forEach(product => {
            renderProductCard(product);
        });
    }

    function renderProductCard(product) {
        const card = $('<div>').addClass('product-card');
        const closeButton = $('<span>').addClass('close-btn').html('&times;');
        closeButton.click(function() {
            card.remove();
            let products = JSON.parse(localStorage.getItem('products'));
            products = products.filter(p => p.title !== product.title);
            localStorage.setItem('products', JSON.stringify(products));
        });

        const editButton = $('<button>').addClass('edit-btn').text('Edit');
        editButton.click(function() {
            openEditModal(product);
        });

        const title = $('<h2>').text(product.title);
        const description = $('<p>').text(product.description);
        const price = $('<p>').text(`Price: $${product.price}`);
        const category = $('<p>').text(`Category: ${product.category}`);
        const imageContainer = $('<div>').addClass('image-container');
        const image = $('<img>').attr('src', product.image);

        card.append(closeButton, editButton, title, description, price, category, imageContainer.append(image));
        $('#productContainer').append(card);
    }

    function openEditModal(product) {
        $('#editTitle').val(product.title);
        $('#editDescription').val(product.description);
        $('#editPrice').val(product.price);
        $('#editDiscount').val(product.discount);
        $('#editCategory').val(product.category);
        $('#editImage').val(product.image);

        $('#editModal').css('display', 'block');
    }

    function updateProductCard(product, index) {
        const cards = $('.product-card');
        const card = cards.eq(index);

        card.find('h2').text(product.title);
        card.find('p:nth-of-type(1)').text(product.description);
        card.find('p:nth-of-type(2)').text(`Price: $${product.price}`);
        card.find('p:nth-of-type(3)').text(`Category: ${product.category}`);
        card.find('img').attr('src', product.image);
    }

    function applyFiltersAndSort() {
        const filterCategory = $('#filterCategory').val().toLowerCase();
        const searchTerm = $('#searchTerm').val().toLowerCase();
        const sortMethod = $('#sortMethod').val();

        let products = JSON.parse(localStorage.getItem('products')) || [];

        if (filterCategory) {
            products = products.filter(product => product.category.toLowerCase().includes(filterCategory));
        }

        if (searchTerm) {
            products = products.filter(product => product.title.toLowerCase().includes(searchTerm));
        }

        switch (sortMethod) {
            case 'priceAsc':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'nameAsc':
                products.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'nameDesc':
                products.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }

        renderProductCards(products);
    }
});

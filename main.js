document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    const saveFavBtn = document.getElementById("save-fav-btn");
    const applyFavBtn = document.getElementById("apply-fav-btn");
    const clearTable = document.getElementById("clear-table");

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    const products = [
        { name: "Paracetamol", price: 9.00, image: "1.PNG.png" },
        { name: "Aspirin", price: 10.00, image: "1.1.PNG.png" },
        { name: "Ibuprofen", price: 5.00, image: "1.2.PNG.png" },
        { name: "Morphine", price: 12.00, image: "1.3.PNG.png" },
        { name: "Codeine", price: 12.00, image: "1.4.PNG.png" },
        { name: "Naproxen", price: 12.00, image: "1.5.PNG.png" }
    ];

    const products2 = [
        { name: "Amoxillin", price: 10.00, image: "Amoxicilin.png" },
        { name: "Metronidazole", price: 10.00, image: "Metronidazole.png" },
        { name: "Ciprofloxacin", price: 5.00, image: "Ciprofloxacin.png" },
        { name: "Azithromycin", price: 12.00, image: "Azithromycin.png" },
        { name: "Doxycycline", price: 12.00, image: "Doxycycline.png" },
        { name: "Cephalexin", price: 12.00, image: "Cephalexin.png" }
    ];

    const products3 = [
        { name: "Fluoxetine", price: 10.00, image: "fluoxetine.png" },
        { name: "Sertraline", price: 10.00, image: "setraline.png" },
        { name: "Citalopram", price: 5.00, image: "citalopram.png" },
        { name: "Escitalopram", price: 12.00, image: "Escitalopram.png" },
        { name: "Amitriptyline", price: 12.00, image: "Amitriptyline.png" },
        { name: "Venlafaxine", price: 12.00, image: "Venlafaxine.png" }
    ];

    const products4 = [
        { name: "Diphenhydramine", price: 10.00, image: "Diphenhydramine.png" },
        { name: "Loratadine", price: 10.00, image: "Lortadine.png" },
        { name: "Cetirizine", price: 5.00, image: "Cetirizine.png" },
        { name: "Fexofenadine", price: 12.00, image: "Fexofenadine.png" },
        { name: "Chlorpheniramine", price: 12.00, image: "Chlorpheniramine.png" },
        { name: "Levocetirizine", price: 12.00, image: "levocetirizine.png" }
    ];

    const products5 = [
        { name: "Lisinopril", price: 10.00, image: "lisinopril.png" },
        { name: "Amlodipine", price: 10.00, image: "amlodipine.png" },
        { name: "Losartan", price: 5.00, image: "losartan.png" },
        { name: "Metoprolol", price: 12.00, image: "metoprolol.png" },
        { name: "Hydrochlorothiazide", price: 12.00, image: "hydrochlorothiazide.png" },
        { name: "Clonidine", price: 12.00, image: "clonidine.png" }
    ];


    const productListElement = document.getElementById('product-list');
    const productListElement2 = document.getElementById('product-list-2');
    const productListElement3 = document.getElementById('product-list-3');
    const productListElement4 = document.getElementById('product-list-4');
    const productListElement5 = document.getElementById('product-list-5');
    const cartItemsElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const payButton = document.getElementById('pay-button');


    let cart = [];

    // Function to update the cart display
    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>
                    <button onclick="changeQuantity(${cart.indexOf(item)}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQuantity(${cart.indexOf(item)}, 1)">+</button>
                </td>
                <td>$${item.price * item.quantity}</td>
                <td><button onclick="removeFromCart(${cart.indexOf(item)})">Remove</button></td>
            `;
            cartItemsElement.appendChild(row);
        });
        totalElement.textContent = total.toFixed(2);
    }

    // Function to change quantity
    function changeQuantity(index, delta) {
        if (cart[index].quantity + delta > 0) {
            cart[index].quantity += delta;
            updateCart();
        }
    }

    // Function to add an item to the cart
    function addToCart(product) {
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    // Function to remove an item from the cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    addProducts(products, productListElement);
    addProducts(products2, productListElement2);
    addProducts(products3, productListElement3);
    addProducts(products4, productListElement4);
    addProducts(products5, productListElement5);

    function addProducts(array, element) {
        // Create product list dynamically
        array.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('item');
            productDiv.innerHTML = `
            <img src="./pictures/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart({ name: '${product.name}', price: ${product.price}, image: '${product.image}' })">Add to Table</button>
        `;
            element.appendChild(productDiv);
        });
    }


    
    window.changeQuantity = changeQuantity;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;

    payButton.addEventListener('click', () => {
        !cart.length && alert('Please add some items to your cart before proceeding to payment.');
        if (!cart.length) return;

        const userConfirmed = confirm('Are you sure you want to proceed with the payment?');

        if (userConfirmed) {
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'payment/payment.html';
        }
    });

    // Save Order to Favourites
    saveFavBtn.addEventListener("click", () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Order has been saved to favourites!");
    });

    // Apply Favourites to Order
    applyFavBtn.addEventListener("click", () => {
        const favouriteOrder = JSON.parse(localStorage.getItem("cart"));
        if (!favouriteOrder) {
            alert("No favourites saved!");
            return;
        }
        favouriteOrder.forEach((item) => cart.push(item));
        updateCart();
        alert("Favourites applied to the order!");
    });

    // Clear Order Table
    clearTable.addEventListener("click", () => {
        window.location.reload();
    });
});

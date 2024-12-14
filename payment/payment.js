document.addEventListener("DOMContentLoaded", () => {
    const orderItems = JSON.parse(localStorage.getItem("cart")) || [];
    const orderTableBody = document.getElementById("order-items");
    const paymentForm = document.getElementById("payment-form");

    // Populate Order Table
    function populateOrderTable() {
        orderTableBody.innerHTML = "";
        orderItems.forEach(({ name, quantity, price }) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${name}</td>
                <td>${quantity}</td>
                <td>$${(price * quantity).toFixed(2)}</td>
            `;
            orderTableBody.appendChild(row);
        });
    }

    populateOrderTable();


    // Submit Payment Form
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const paymentMethod = document.getElementById("payment").value;

        if (!name || !email || !address || !paymentMethod) {
            alert("Please fill in all fields.");
            return;
        }

        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7); // Add 7 days for delivery
        localStorage.setItem("favouriteOrder", JSON.stringify(orderItems));

        alert(`Thank you for your purchase, ${name}!\nYour order will be delivered by ${deliveryDate.toDateString()}.`);
        localStorage.removeItem("cart");
        window.location.reload();
    });


});

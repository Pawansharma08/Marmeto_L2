document.addEventListener("DOMContentLoaded", () => {
    fetchCartData();
});

async function fetchCartData() {
    try {
        const response = await fetch("https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889");
        const data = await response.json();

        console.log("API Response:", data);

        if (data && data.items) {
            displayCartItems(data.items);
            updateTotals(data.original_total_price,data);
            console.log(data.original_total_price)
        } else {
            console.error("No items found in the API response");
        }
    } catch (error) {
        console.error("Error fetching cart data:", error);
    }
}

function displayCartItems(items) {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ''; 

    items.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item"; 
        
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image" />
            <div class="product-name">${item.title}</div>
            <div class="product-price">₹${(item.price / 100).toFixed(2)}</div>
            <input type="number" value="${item.quantity}" min="1" class="product-quantity" />
            <div class="product-subtotal">Rs. ${((item.price * item.quantity) / 100).toFixed(2)}</div>
            <button onclick="removeItem(${item.id})" class="delete-button">
            </button>`;
        cartItemsContainer.appendChild(itemElement);
    });
}




function updateTotals(originalTotal) {
    const subtotalElement = document.getElementById("sub-total");
    const totalElement = document.getElementById("total");
    const subTotal = subtotalElement.querySelector('sub-amount');
    const amountElement = totalElement.querySelector('.amount'); 

    console.log("Original Total Price:", originalTotal);

    subtotalElement.innerHTML = `Subtotal Rs.${(originalTotal).toFixed(2)}`; 
    amountElement.innerHTML = `Rs.${(originalTotal).toFixed(2)}`; 
}


function removeItem(itemId) {
    console.log("Remove item with ID:", itemId);
}

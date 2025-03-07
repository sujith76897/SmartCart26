document.addEventListener('DOMContentLoaded', () => {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    // Get products from localStorage
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) {
        window.location.href = 'shop.html';
        return;
    }

    // Update product details
    document.getElementById('productImage').src = product.image;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;

    // Initialize price calculations
    const shipping = 9.99;
    const taxRate = 0.08; // 8% tax rate

    function updatePrices() {
        const quantity = parseInt(document.getElementById('quantity').value);
        const subtotal = product.price * quantity;
        const tax = subtotal * taxRate;
        const total = subtotal + shipping + tax;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    // Quantity controls
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.querySelector('.decrease');
    const increaseBtn = document.querySelector('.increase');

    decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
            updatePrices();
        }
    });

    increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
            updatePrices();
        }
    });

    quantityInput.addEventListener('change', () => {
        const value = parseInt(quantityInput.value);
        if (value < 1) quantityInput.value = 1;
        if (value > 10) quantityInput.value = 10;
        updatePrices();
    });

    // Form submission
    const shippingForm = document.getElementById('shippingForm');
    shippingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const size = document.getElementById('size').value;
        if (!size) {
            alert('Please select a size');
            return;
        }

        // Here you would typically send the order to a backend server
        // For now, we'll just show an alert
        alert('Proceeding to payment...');
        
        // You could redirect to a payment page here
        // window.location.href = 'payment.html';
    });

    // Initialize prices
    updatePrices();
});
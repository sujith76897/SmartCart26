class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.updateCartDisplay();
        this.updateCartCount();
        this.attachEventListeners();
    }

    attachEventListeners() {
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, newQuantity);
            if (item.quantity === 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    calculateTotals() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 10 : 0;
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + shipping + tax;

        return {
            subtotal: subtotal.toFixed(2),
            shipping: shipping.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2)
        };
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    <p>Your cart is empty</p>
                    <a href="shop.html" class="continue-shopping">Continue Shopping</a>
                </div>
            `;
        } else {
            cartItems.innerHTML = this.items.map(item => this.createCartItemHTML(item)).join('');
        }

        this.updateTotals();
        this.attachItemEventListeners();
    }

    createCartItemHTML(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase">+</button>
                    </div>
                    <button class="remove-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    attachItemEventListeners() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;

        cartItems.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            if (!cartItem) return;

            const productId = parseInt(cartItem.dataset.id);

            if (e.target.closest('.increase')) {
                const item = this.items.find(item => item.id === productId);
                if (item) this.updateQuantity(productId, item.quantity + 1);
            }

            if (e.target.closest('.decrease')) {
                const item = this.items.find(item => item.id === productId);
                if (item) this.updateQuantity(productId, item.quantity - 1);
            }

            if (e.target.closest('.remove-btn')) {
                this.removeItem(productId);
            }
        });
    }

    updateTotals() {
        const totals = this.calculateTotals();
        
        document.getElementById('subtotal').textContent = `$${totals.subtotal}`;
        document.getElementById('shipping').textContent = `$${totals.shipping}`;
        document.getElementById('tax').textContent = `$${totals.tax}`;
        document.getElementById('total').textContent = `$${totals.total}`;
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Here you would typically integrate with a payment processor
        alert('Proceeding to checkout...');
        // After successful checkout:
        // this.items = [];
        // this.saveCart();
        // this.updateCartDisplay();
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Make cart globally available
window.cart = cart;
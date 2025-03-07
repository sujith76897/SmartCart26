// Product data
const products = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        rating: 4.8,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'High-quality wireless headphones with noise cancellation',
        details: {
            colors: ['Black', 'White', 'Silver'],
            images: [
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
            ],
            description: 'Premium wireless headphones featuring advanced noise cancellation technology, superior sound quality, and comfortable design for extended use.',
            specifications: {
                'Brand': 'TechPro',
                'Model': 'X-2023',
                'Warranty': '1 Year',
                'In Box': 'Headphones, Carrying Case, Charging Cable, Manual'
            }
        }
    },
    {
        id: 2,
        name: 'Smart Watch Series X',
        price: 399.99,
        rating: 4.9,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
        description: 'Advanced smartwatch with health monitoring',
        details: {
            colors: ['Black', 'Silver', 'Gold'],
            images: [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'
            ],
            description: 'Advanced smartwatch with comprehensive health monitoring features and seamless connectivity.',
            specifications: {
                'Brand': 'TechPro',
                'Model': 'Watch X',
                'Warranty': '2 Years',
                'In Box': 'Watch, Charging Dock, Manual'
            }
        }
    }
];

// Utility Functions
function generateStarRating(rating) {
    return Array.from({ length: 5 }).map((_, index) => `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${index < Math.floor(rating) ? 'currentColor' : 'none'}" 
             stroke="currentColor" stroke-width="2" class="star${index < Math.floor(rating) ? ' filled' : ''}">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    `).join('');
}

// Shopping Cart Class
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
        this.showNotification('Product added to cart!');
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
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }, 100);
    }

    calculateTotals() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 10 : 0;
        const tax = subtotal * 0.1;
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
        alert('Proceeding to checkout...');
    }
}

// Product Details Class
class ProductDetails {
    constructor() {
        this.currentProduct = null;
        this.currentImageIndex = 0;
        this.createModal();
        this.setupEventListeners();
    }

    createModal() {
        if (document.getElementById('productDetailsModal')) return;

        const modal = document.createElement('div');
        modal.id = 'productDetailsModal';
        modal.className = 'product-details-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <div class="product-details-container">
                    <div class="product-gallery">
                        <div class="main-image">
                            <img src="" alt="" id="mainImage">
                            <button class="gallery-nav prev">&lt;</button>
                            <button class="gallery-nav next">&gt;</button>
                        </div>
                        <div class="thumbnail-container"></div>
                    </div>
                    <div class="product-details">
                        <h2 class="product-title"></h2>
                        <div class="product-rating"></div>
                        <div class="product-price"></div>
                        <div class="color-options">
                            <h3>Available Colors</h3>
                            <div class="color-buttons"></div>
                        </div>
                        <div class="product-description"></div>
                        <div class="product-specifications"></div>
                        <button class="buy-now-btn">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    setupEventListeners() {
        const modal = document.getElementById('productDetailsModal');
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        modal.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        modal.querySelector('.buy-now-btn').addEventListener('click', () => {
            alert('Proceeding to checkout...');
        });

        this.setupGalleryNavigation(modal);
    }

    setupGalleryNavigation(modal) {
        modal.querySelector('.gallery-nav.prev').onclick = () => {
            if (!this.currentProduct) return;
            this.currentImageIndex = (this.currentImageIndex - 1 + this.currentProduct.details.images.length) % this.currentProduct.details.images.length;
            this.updateGallery();
        };

        modal.querySelector('.gallery-nav.next').onclick = () => {
            if (!this.currentProduct) return;
            this.currentImageIndex = (this.currentImageIndex + 1) % this.currentProduct.details.images.length;
            this.updateGallery();
        };
    }

    openModal(productId) {
        this.currentProduct = products.find(p => p.id === productId);
        if (!this.currentProduct) return;

        const modal = document.getElementById('productDetailsModal');
        modal.classList.add('active');
        this.currentImageIndex = 0;
        this.updateProductDetails();
        this.updateGallery();
    }

    closeModal() {
        const modal = document.getElementById('productDetailsModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    updateProductDetails() {
        const modal = document.getElementById('productDetailsModal');
        
        modal.querySelector('.product-title').textContent = this.currentProduct.name;
        modal.querySelector('.product-rating').innerHTML = generateStarRating(this.currentProduct.rating);
        modal.querySelector('.product-price').textContent = `$${this.currentProduct.price.toFixed(2)}`;
        
        this.updateColorOptions(modal);
        this.updateDescription(modal);
        this.updateSpecifications(modal);
    }

    updateColorOptions(modal) {
        const colorButtons = modal.querySelector('.color-buttons');
        colorButtons.innerHTML = this.currentProduct.details.colors.map(color => `
            <button class="color-btn" style="background-color: ${color.toLowerCase()}"
                    data-color="${color}">${color}</button>
        `).join('');
    }

    updateDescription(modal) {
        modal.querySelector('.product-description').innerHTML = `
            <h3>Product Description</h3>
            <p>${this.currentProduct.details.description}</p>
        `;
    }

    updateSpecifications(modal) {
        const specs = Object.entries(this.currentProduct.details.specifications)
            .map(([key, value]) => `
                <div class="spec-item">
                    <span class="spec-label">${key}:</span>
                    <span class="spec-value">${value}</span>
                </div>
            `).join('');

        modal.querySelector('.product-specifications').innerHTML = `
            <h3>Specifications</h3>
            <div class="specs-grid">${specs}</div>
        `;
    }

    updateGallery() {
        const modal = document.getElementById('productDetailsModal');
        const mainImage = modal.querySelector('#mainImage');
        const thumbnailContainer = modal.querySelector('.thumbnail-container');
        
        mainImage.src = this.currentProduct.details.images[this.currentImageIndex];
        mainImage.alt = this.currentProduct.name;

        thumbnailContainer.innerHTML = this.currentProduct.details.images.map((img, index) => `
            <div class="thumbnail ${index === this.currentImageIndex ? 'active' : ''}"
                 onclick="shop.productDetails.setMainImage(${index})">
                <img src="${img}" alt="${this.currentProduct.name} view ${index + 1}">
            </div>
        `).join('');
    }

    setMainImage(index) {
        this.currentImageIndex = index;
        this.updateGallery();
    }
}

// Shop Class
class Shop {
    constructor() {
        this.products = products;
        this.cart = new ShoppingCart();
        this.productDetails = new ProductDetails();
        this.init();
    }

    init() {
        this.renderProducts(this.products);
        this.setupEventListeners();
    }

    renderProducts(products) {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        productsGrid.innerHTML = products.map(product => `
            <div class="product-card" data-aos="fade-up">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-buttons">
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <button class="add-to-cart" onclick="shop.cart.addItem(${JSON.stringify(product)})">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                                <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        ${generateStarRating(product.rating)}
                        <span>(${product.rating})</span>
                    </div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                </div>
            </div>
        `).join('');

        this.updateProductCount(products.length);
    }

    updateProductCount(count) {
        const productCount = document.getElementById('productCount');
        if (productCount) {
            productCount.textContent = `${count} Products`;
        }
    }

    setupEventListeners() {
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                const sortedProducts = this.sortProducts(this.products, sortSelect.value);
                this.renderProducts(sortedProducts);
            });
        }

        this.setupFilterListeners();
    }

    setupFilterListeners() {
        document.querySelectorAll('#categoryFilters input').forEach(input => {
            input.addEventListener('change', () => this.filterProducts());
        });

        document.querySelectorAll('#ratingFilters input').forEach(input => {
            input.addEventListener('change', () => this.filterProducts());
        });

        const rangeMin = document.querySelector('.range-min');
        const rangeMax = document.querySelector('.range-max');
        if (rangeMin && rangeMax) {
            rangeMin.addEventListener('input', () => this.filterProducts());
            rangeMax.addEventListener('input', () => this.filterProducts());
        }
    }

    filterProducts() {
        const selectedCategories = Array.from(document.querySelectorAll('#categoryFilters input:checked'))
            .map(input => input.value);
        
        const selectedRatings = Array.from(document.querySelectorAll('#ratingFilters input:checked'))
            .map(input => Number(input.value));
        
        const minPrice = Number(document.querySelector('.range-min')?.value || 0);
        const maxPrice = Number(document.querySelector('.range-max')?.value || 1000);

        const filtered = this.products.filter(product => {
            const matchesCategory = selectedCategories.length === 0 || 
                selectedCategories.includes(product.category);
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
            const matchesRating = selectedRatings.length === 0 || 
                selectedRatings.some(rating => product.rating >= rating);
            
            return matchesCategory && matchesPrice && matchesRating;
        });

        const sortSelect = document.getElementById('sortSelect');
        const sortedProducts = this.sortProducts(filtered, sortSelect?.value || 'featured');
        this.renderProducts(sortedProducts);
    }

    sortProducts(products, sortValue) {
        const sortedProducts = [...products];
        
        switch (sortValue) {
            case 'price-low':
                return sortedProducts.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sortedProducts.sort((a, b) => b.price - a.price);
            case 'rating':
                return sortedProducts.sort((a, b) => b.rating - a.rating);
            default:
                return sortedProducts;
        }
    }
}

// Initialize shop when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.shop = new Shop();
});
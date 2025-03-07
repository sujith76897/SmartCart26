// Product data
const products = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        rating: 4.8,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'High-quality wireless headphones with noise cancellation'
    },
    {
        id: 2,
        name: 'Smart Watch Series X',
        price: 399.99,
        rating: 4.9,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
        description: 'Advanced smartwatch with health monitoring'
    },
    {
        id: 3,
        name: 'Ultra HD Camera',
        price: 799.99,
        rating: 4.7,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80',
        description: 'Professional grade camera for photography enthusiasts'
    },
    {
        id: 4,
        name: 'Designer Leather Bag',
        price: 199.99,
        rating: 4.5,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
        description: 'Elegant leather bag for everyday use'
    },
    {
        id: 5,
        name: 'Running Shoes Pro',
        price: 129.99,
        rating: 4.6,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
        description: 'Professional running shoes for athletes'
    },
    {
        id: 6,
        name: 'Smart Home Speaker',
        price: 249.99,
        rating: 4.4,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=1000&q=80',
        description: 'Voice-controlled smart speaker'
    },
    {
        id: 7,
        name: 'Yoga Mat Premium',
        price: 49.99,
        rating: 4.3,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=1000&q=80',
        description: 'Extra thick yoga mat for comfort'
    },
    {
        id: 8,
        name: 'Mechanical Keyboard',
        price: 159.99,
        rating: 4.7,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
        description: 'RGB mechanical gaming keyboard'
    },
    {
        id: 9,
        name: 'Minimalist Watch',
        price: 89.99,
        rating: 4.5,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
        description: 'Elegant minimalist design watch'
    },
    {
        id: 10,
        name: 'Wireless Gaming Mouse',
        price: 79.99,
        rating: 4.6,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80',
        description: 'High-precision wireless gaming mouse'
    },
    {
        id: 11,
        name: 'Fitness Tracker',
        price: 89.99,
        rating: 4.4,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1557858310-9052820906f7?auto=format&fit=crop&w=1000&q=80',
        description: 'Advanced fitness tracking device'
    },
    {
        id: 12,
        name: 'Leather Wallet',
        price: 49.99,
        rating: 4.3,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
        description: 'Genuine leather wallet with RFID protection'
    }
];

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
}


// Cart functionality
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

// Shop functionality
function generateStarRating(rating) {
    return Array.from({ length: 5 }).map((_, index) => `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${index < Math.floor(rating) ? 'currentColor' : 'none'}" 
             stroke="currentColor" stroke-width="2" class="star${index < Math.floor(rating) ? ' filled' : ''}">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    `).join('');
}

function createProductCard(product) {
    return `
        <div class="product-card" data-aos="fade-up">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <button class="view-details-btn" onclick="openProductDetails(${product.id})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        View Details
                </button>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                        <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    Add to Cart
                </button>
                
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
    `;
}

// Filter and sort functionality
function filterProducts(products, filters) {
    return products.filter(product => {
        const matchesCategory = filters.categories.length === 0 || 
            filters.categories.includes(product.category);
        const matchesPrice = product.price >= filters.priceRange.min && 
            product.price <= filters.priceRange.max;
        const matchesRating = filters.ratings.length === 0 || 
            filters.ratings.some(rating => product.rating >= rating);
        
        return matchesCategory && matchesPrice && matchesRating;
    });
}

function sortProducts(products, sortValue) {
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

// Initialize shop
const cart = new ShoppingCart();
let activeFilters = {
    categories: [],
    priceRange: { min: 0, max: 1000 },
    ratings: [],
    search: ''
};

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const productCount = document.getElementById('productCount');
const sortSelect = document.getElementById('sortSelect');
const priceSlider = document.getElementById('priceSlider');
const minPriceDisplay = document.getElementById('minPrice');
const maxPriceDisplay = document.getElementById('maxPrice');

// Price range slider elements
const rangeMin = priceSlider.querySelector('.range-min');
const rangeMax = priceSlider.querySelector('.range-max');
const sliderTrack = priceSlider.querySelector('.slider-track');

function updateSliderTrack() {
    const percent1 = (rangeMin.value / rangeMin.max) * 100;
    const percent2 = (rangeMax.value / rangeMax.max) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #e5e7eb ${percent1}%, var(--primary) ${percent1}%, var(--primary) ${percent2}%, #e5e7eb ${percent2}%)`;
}

function filterAndRenderProducts() {
    let filtered = filterProducts(products, activeFilters);
    filtered = sortProducts(filtered, sortSelect.value);
    renderProducts(filtered);
} 

function renderProducts(products) {
    productCount.textContent = `${products.length} Products`;
    productsGrid.innerHTML = products.map(createProductCard).join('');

    document.querySelectorAll('.product-card').forEach(card => {
        const addToCartBtn = card.querySelector('.add-to-cart');
        
        card.addEventListener('mouseenter', () => {
            addToCartBtn.style.opacity = '1';
            addToCartBtn.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', () => {
            addToCartBtn.style.opacity = '0';
            addToCartBtn.style.transform = 'translateY(10px)';
        });
    });
}

// Event Listeners
rangeMin.addEventListener('input', () => {
    const minVal = parseInt(rangeMin.value);
    const maxVal = parseInt(rangeMax.value);
    if (minVal > maxVal - 50) {
        rangeMin.value = maxVal - 50;
        return;
    }
    activeFilters.priceRange.min = minVal;
    minPriceDisplay.textContent = `$${minVal}`;
    updateSliderTrack();
    filterAndRenderProducts();
});

rangeMax.addEventListener('input', () => {
    const minVal = parseInt(rangeMin.value);
    const maxVal = parseInt(rangeMax.value);
    if (maxVal < minVal + 50) {
        rangeMax.value = minVal + 50;
        return;
    }
    activeFilters.priceRange.max = maxVal;
    maxPriceDisplay.textContent = `$${maxVal}`;
    updateSliderTrack();
    filterAndRenderProducts();
});

sortSelect.addEventListener('change', filterAndRenderProducts);

document.querySelectorAll('#categoryFilters input').forEach(input => {
    input.addEventListener('change', (e) => {
        const value = e.target.value;
        const index = activeFilters.categories.indexOf(value);
        
        if (index === -1) {
            activeFilters.categories.push(value);
        } else {
            activeFilters.categories.splice(index, 1);
        }
        
        filterAndRenderProducts();
    });
});

document.querySelectorAll('#ratingFilters input').forEach(input => {
    input.addEventListener('change', (e) => {
        const value = parseInt(e.target.value);
        const index = activeFilters.ratings.indexOf(value);
        
        if (index === -1) {
            activeFilters.ratings.push(value);
        } else {
            activeFilters.ratings.splice(index, 1);
        }N
        
        filterAndRenderProducts();
    });
});

// Initialize
updateSliderTrack();
filterAndRenderProducts();

// Make functions globally available
window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
};
window.cart = cart;
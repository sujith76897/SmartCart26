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
            images: [
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
            ],
            description: 'Experience premium sound quality with our wireless headphones. Features include:\n\n' +
                '• Active Noise Cancellation\n' +
                '• 30-hour battery life\n' +
                '• Bluetooth 5.0\n' +
                '• Built-in voice assistant',
            specifications: {
                'Battery Life': '30 hours',
                'Bluetooth': '5.0',
                'Noise Cancellation': 'Active',
                'Driver Size': '40mm',
                'Weight': '250g'
            },
            colors: ['Black', 'Silver', 'Blue']
        }
    },
    
];


// Update the ProductDetails class methods
class ProductDetails {
    constructor() {
        this.currentProduct = null;
        this.currentImageIndex = 0;
        this.setupEventListeners();
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
            if (!this.currentProduct || !this.currentProduct.details) return;
            this.currentImageIndex = (this.currentImageIndex - 1 + this.currentProduct.details.images.length) % this.currentProduct.details.images.length;
            this.updateGallery();
        };

        modal.querySelector('.gallery-nav.next').onclick = () => {
            if (!this.currentProduct || !this.currentProduct.details) return;
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
        modal.classList.remove('active');
    }

    updateProductDetails() {
        const modal = document.getElementById('productDetailsModal');
        const product = this.currentProduct;
        
        modal.querySelector('.product-title').textContent = product.name;
        modal.querySelector('.product-rating').innerHTML = generateStarRating(product.rating);
        modal.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;
        
        // Update detailed description
        if (product.details) {
            modal.querySelector('.product-description').innerHTML = product.details.description.replace(/\n/g, '<br>');
            
            // Update specifications
            const specsContainer = modal.querySelector('.product-specifications');
            specsContainer.innerHTML = '<h3>Specifications</h3>';
            const specsList = document.createElement('dl');
            Object.entries(product.details.specifications).forEach(([key, value]) => {
                specsList.innerHTML += `
                    <dt>${key}</dt>
                    <dd>${value}</dd>
                `;
            });
            specsContainer.appendChild(specsList);

            // Update color options
            const colorButtons = modal.querySelector('.color-buttons');
            colorButtons.innerHTML = product.details.colors.map(color => `
                <button class="color-btn" style="background-color: ${color.toLowerCase()}" data-color="${color}">
                    <span class="color-name">${color}</span>
                </button>
            `).join('');

            // Setup color selection
            colorButtons.querySelectorAll('.color-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    colorButtons.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                });
            });
        }
    }

    updateGallery() {
        const modal = document.getElementById('productDetailsModal');
        const mainImage = modal.querySelector('#mainImage');
        const thumbnailContainer = modal.querySelector('.thumbnail-container');
        
        if (this.currentProduct.details && this.currentProduct.details.images) {
            mainImage.src = this.currentProduct.details.images[this.currentImageIndex];
            mainImage.alt = this.currentProduct.name;

            // Update thumbnails
            thumbnailContainer.innerHTML = this.currentProduct.details.images.map((img, index) => `
                <div class="thumbnail ${index === this.currentImageIndex ? 'active' : ''}" 
                     onclick="productDetails.setImage(${index})">
                    <img src="${img}" alt="${this.currentProduct.name} - Image ${index + 1}">
                </div>
            `).join('');
        } else {
            mainImage.src = this.currentProduct.image;
            mainImage.alt = this.currentProduct.name;
            thumbnailContainer.innerHTML = '';
        }
    }

    setImage(index) {
        this.currentImageIndex = index;
        this.updateGallery();
    }
    
    openModal(productId) {
        this.currentProduct = products.find(p => p.id === productId);
        if (!this.currentProduct) return;

        const modal = document.getElementById('productDetailsModal');
        modal.classList.add('active');
        this.currentImageIndex = 0;
        this.updateProductDetails();
        this.updateGallery();

        // Add Buy Now button click handler
        modal.querySelector('.buy-now-btn').onclick = () => {
            // Store products in localStorage for checkout page
            localStorage.setItem('products', JSON.stringify(products));
            window.location.href = `checkout.html?productId=${productId}`;
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

        // Add Buy Now button click handler
        modal.querySelector('.buy-now-btn').onclick = () => {
            // Store products in localStorage for checkout page
            localStorage.setItem('products', JSON.stringify(products));
            window.location.href = `checkout.html?productId=${productId}`;
        };
    }

}


class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.updateCartCount();
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
        this.showNotification('Product added to cart!');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
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
}

function generateStarRating(rating) {
    return Array.from({ length: 5 }).map((_, index) => `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${index < Math.floor(rating) ? 'currentColor' : 'none'}" 
             stroke="currentColor" stroke-width="2" class="star${index < Math.floor(rating) ? ' filled' : ''}">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    `).join('');
}

function createProductCard(product) {
    const template = document.getElementById('productCardTemplate');
    const card = template.content.cloneNode(true);
    
    const img = card.querySelector('img');
    img.src = product.image;
    img.alt = product.name;
    
    card.querySelector('h3').textContent = product.name;
    card.querySelector('.product-description').textContent = product.description;
    card.querySelector('.product-rating').innerHTML = generateStarRating(product.rating);
    card.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;
    
    card.querySelector('.view-details-btn').onclick = () => productDetails.openModal(product.id);
    card.querySelector('.add-to-cart').onclick = () => cart.addItem(product);
    
    return card;
}

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
const productDetails = new ProductDetails();
let activeFilters = {
    categories: [],
    priceRange: { min: 0, max: 1000 },
    ratings: []
};

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const productCount = document.getElementById('productCount');
const sortSelect = document.getElementById('sortSelect');
const priceSlider = document.getElementById('priceSlider');
const rangeMin = priceSlider.querySelector('.range-min');
const rangeMax = priceSlider.querySelector('.range-max');
const sliderTrack = priceSlider.querySelector('.slider-track');

function updateSliderTrack() {
    const percent1 = (rangeMin.value / rangeMin.max) * 100;
    const percent2 = (rangeMax.value / rangeMax.max) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #e5e7eb ${percent1}%, var(--primary) ${percent1}%, var(--primary) ${percent2}%, #e5e7eb ${percent2}%)`;
}

function renderProducts(filteredProducts) {
    productsGrid.innerHTML = '';
    productCount.textContent = `${filteredProducts.length} Products`;
    
    filteredProducts.forEach(product => {
        productsGrid.appendChild(createProductCard(product));
    });
}

function filterAndRenderProducts() {
    const filtered = filterProducts(products, activeFilters);
    const sorted = sortProducts(filtered, sortSelect.value);
    renderProducts(sorted);
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
    document.getElementById('minPrice').textContent = `$${minVal}`;
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
    document.getElementById('maxPrice').textContent = `$${maxVal}`;
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
        }
        
        filterAndRenderProducts();
    });
});

// Initialize the shop
updateSliderTrack();
filterAndRenderProducts();

// Make necessary functions and objects globally available
window.productDetails = productDetails;
window.cart = cart;
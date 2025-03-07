class ProductSearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.searchSuggestions = document.getElementById('searchSuggestions');
        this.noResults = document.getElementById('noResults');
        
        this.setupEventListeners();
        this.showAllProducts();
    }

    setupEventListeners() {
        // Real-time search as user types
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            this.handleSearch(query);
        });

        // Handle suggestion clicks
        this.searchSuggestions.addEventListener('click', (e) => {
            const item = e.target.closest('.suggestion-item');
            if (item) {
                const productId = parseInt(item.dataset.id);
                const product = products.find(p => p.id === productId);
                if (product) {
                    this.searchInput.value = product.name;
                    this.handleSearch(product.name);
                    this.hideSuggestions();
                }
            }
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchSuggestions.contains(e.target) && e.target !== this.searchInput) {
                this.hideSuggestions();
            }
        });
    }

    handleSearch(query) {
        const results = this.searchProducts(query);
        this.renderResults(results, query);
        this.updateSuggestions(results.slice(0, 5), query);
    }

    searchProducts(query) {
        if (!query) return products;

        return products
            .filter(product => {
                const searchText = [
                    product.name,
                    product.category,
                    product.description
                ].join(' ').toLowerCase();
                
                return this.matchQuery(searchText, query);
            })
            .sort((a, b) => {
                const scoreA = this.calculateSearchScore(a, query);
                const scoreB = this.calculateSearchScore(b, query);
                return scoreB - scoreA;
            });
    }

    matchQuery(text, query) {
        text = text.toLowerCase();
        query = query.toLowerCase();
        
        let index = 0;
        for (let char of query) {
            index = text.indexOf(char, index);
            if (index === -1) return false;
            index++;
        }
        return true;
    }

    calculateSearchScore(product, query) {
        const name = product.name.toLowerCase();
        const category = product.category.toLowerCase();
        const description = product.description.toLowerCase();
        query = query.toLowerCase();
        
        let score = 0;
        
        // Exact match
        if (name === query) score += 100;
        
        // Starts with query
        if (name.startsWith(query)) score += 50;
        
        // Contains query
        if (name.includes(query)) score += 25;
        if (category.includes(query)) score += 15;
        if (description.includes(query)) score += 10;
        
        return score;
    }

    highlightText(text, query) {
        if (!query) return text;
        
        const textLower = text.toLowerCase();
        const queryLower = query.toLowerCase();
        let result = '';
        let lastIndex = 0;
        
        for (let char of queryLower) {
            const index = textLower.indexOf(char, lastIndex);
            if (index !== -1) {
                result += text.slice(lastIndex, index);
                result += `<mark>${text[index]}</mark>`;
                lastIndex = index + 1;
            }
        }
        
        result += text.slice(lastIndex);
        return result;
    }

    createProductCard(product, query) {
        return `
        <div class="product-card" data-aos="fade-up">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
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

    renderResults(products, query) {
        if (!products.length) {
            this.searchResults.innerHTML = '';
            this.noResults.classList.remove('hidden');
            this.searchResults.classList.remove('visible');
            return;
        }

        this.noResults.classList.add('hidden');
        this.searchResults.innerHTML = products
            .map(product => this.createProductCard(product, query))
            .join('');
        this.searchResults.classList.add('visible');

        // Add hover effects
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

    updateSuggestions(products, query) {
        if (!query || !products.length) {
            this.hideSuggestions();
            return;
        }

        this.searchSuggestions.innerHTML = products
            .map(product => `
                <div class="suggestion-item" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="suggestion-image">
                    <div>
                        <div>${this.highlightText(product.name, query)}</div>
                        <div class="suggestion-category">${product.category}</div>
                        <div class="suggestion-price">$${product.price.toFixed(2)}</div>
                    </div>
                </div>
            `)
            .join('');
        
        this.searchSuggestions.style.display = 'block';
    }

    hideSuggestions() {
        this.searchSuggestions.style.display = 'none';
    }

    showAllProducts() {
        this.renderResults(products, '');
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductSearch();
});
class Gallery {
    constructor() {
        this.modal = document.getElementById('galleryModal');
        this.mainImage = document.getElementById('mainImage');
        this.thumbnailsContainer = document.getElementById('thumbnailsContainer');
        this.closeBtn = document.getElementById('galleryClose');
        this.prevBtn = document.getElementById('prevButton');
        this.nextBtn = document.getElementById('nextButton');
        
        this.images = [];
        this.currentIndex = 0;
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.prevBtn.addEventListener('click', () => this.showPrevious());
        this.nextBtn.addEventListener('click', () => this.showNext());
        
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.showPrevious();
            if (e.key === 'ArrowRight') this.showNext();
        });
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
    }
    
    open(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        this.images = product.images;
        this.currentIndex = 0;
        this.modal.classList.add('active');
        this.updateGallery();
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateGallery();
    }
    
    showPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateGallery();
    }
    
    updateGallery() {
        // Update main image
        this.mainImage.src = this.images[this.currentIndex];
        this.mainImage.alt = `View ${this.currentIndex + 1}`;
        
        // Update thumbnails
        this.thumbnailsContainer.innerHTML = this.images
            .map((img, idx) => `
                <div class="thumbnail ${idx === this.currentIndex ? 'active' : ''}"
                     onclick="gallery.setImage(${idx})">
                    <img src="${img}" alt="Thumbnail ${idx + 1}">
                </div>
            `).join('');
    }
    
    setImage(index) {
        this.currentIndex = index;
        this.updateGallery();
    }
}

const gallery = new Gallery();
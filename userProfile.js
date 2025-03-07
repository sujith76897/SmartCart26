// User Profile Management
class UserProfile {
    constructor() {
        this.sidebarVisible = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.updateLoginButton();
                this.createSidebar();
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        this.setupEventListeners();
    }

    updateLoginButton() {
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn && this.currentUser) {
            loginBtn.innerHTML = `
                <div class="user-initial">
                    ${this.currentUser.name.charAt(0).toUpperCase()}
                </div>
            `;
            loginBtn.classList.add('user-profile-btn');
            loginBtn.href = '#';
        }
    }

    createSidebar() {
        // Create sidebar if it doesn't exist
        if (!document.getElementById('userSidebar')) {
            const sidebar = document.createElement('div');
            sidebar.id = 'userSidebar';
            sidebar.className = 'user-sidebar';
            
            sidebar.innerHTML = `
                <div class="sidebar-header">
                    <div class="user-avatar">
                        ${this.currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="user-info">
                        <h3>${this.currentUser.name}</h3>
                        <p>${this.currentUser.email}</p>
                    </div>
                    <button class="close-sidebar">×</button>
                </div>
                <nav class="sidebar-nav">
                    <a href="#profile">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        My Profile
                    </a>
                    <a href="#orders">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                            <path d="M3 6h18"></path>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        My Orders
                    </a>
                    <a href="#wishlist">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                        Wishlist
                    </a>
                    <a href="#settings">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        Settings
                    </a>
                    <a href="#" class="logout-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                    </a>
                </nav>
            `;
            
            document.body.appendChild(sidebar);
            
            // Add overlay
            const overlay = document.createElement('div');
            overlay.id = 'sidebarOverlay';
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
        }
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const userProfileBtn = e.target.closest('.user-profile-btn');
            const closeSidebarBtn = e.target.closest('.close-sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            const logoutBtn = e.target.closest('.logout-btn');
            
            if (userProfileBtn) {
                this.toggleSidebar();
            } else if ((closeSidebarBtn || e.target === overlay) && this.sidebarVisible) {
                this.toggleSidebar();
            } else if (logoutBtn) {
                this.logout();
            }
        });
    }

    toggleSidebar() {
        const sidebar = document.getElementById('userSidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (sidebar && overlay) {
            this.sidebarVisible = !this.sidebarVisible;
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = this.sidebarVisible ? 'hidden' : '';
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.currentUser = null;
        this.toggleSidebar();
        window.location.href = 'login.html';
    }
}

// Initialize user profile
const userProfile = new UserProfile();
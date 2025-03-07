// Shipping Steps Data
const shippingSteps = [
    {
        id: 'order',
        title: 'Order Placed',
        description: 'Your order has been confirmed',
        status: 'completed',
        icon: 'package'
    },
    {
        id: 'processing',
        title: 'Processing',
        description: 'Your order is being prepared',
        status: 'completed',
        icon: 'clock'
    },
    {
        id: 'shipping',
        title: 'In Transit',
        description: 'Your package is on its way',
        status: 'current',
        icon: 'truck'
    },
    {
        id: 'delivered',
        title: 'Delivered',
        description: 'Package will arrive at destination',
        status: 'pending',
        icon: 'home'
    }
];

// Icons
const icons = {
    package: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    truck: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><path d="M15 18H9"/><circle cx="17" cy="18" r="2"/></svg>`,
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initProgressTracker();
    initCountdown();
    initAccordion();
    initChat();
    initNotifications();
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        setTheme(prefersDark.matches);
    }
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(!isDark);
    });
    
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches);
        }
    });
}

// Progress Tracker
function initProgressTracker() {
    const progressTracker = document.getElementById('progressTracker');

    function createStep(step, isLast) {
        const stepElement = document.createElement('div');
        stepElement.className = `step ${step.status}`;

        const iconContainer = document.createElement('div');
        iconContainer.className = 'step-icon';
        iconContainer.innerHTML = step.status === 'completed' ? icons.check : icons[step.icon];

        const content = document.createElement('div');
        content.className = 'step-content';

        const title = document.createElement('div');
        title.className = 'step-title';
        title.textContent = step.title;

        const description = document.createElement('div');
        description.className = 'step-description';
        description.textContent = step.description;

        content.appendChild(title);
        content.appendChild(description);

        if (!isLast) {
            const line = document.createElement('div');
            line.className = 'step-line';
            stepElement.appendChild(line);
        }

        stepElement.appendChild(iconContainer);
        stepElement.appendChild(content);

        return stepElement;
    }

    shippingSteps.forEach((step, index) => {
        const stepElement = createStep(step, index === shippingSteps.length - 1);
        progressTracker.appendChild(stepElement);
    });
}

// Countdown Timer
function initCountdown() {
    const countdownElement = document.getElementById('deliveryCountdown');
    const deliveryDate = new Date('2024-03-15T15:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const difference = deliveryDate - now;
        
        if (difference <= 0) {
            countdownElement.textContent = 'Delivery time has passed';
            return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        countdownElement.textContent = `${days}d ${hours}h ${minutes}m until delivery`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// Accordion
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            
            content.classList.toggle('active');
            icon.textContent = content.classList.contains('active') ? '−' : '+';
            
            if (content.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
}

// Chat Widget
function initChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendMessage');
    const chatSupport = document.getElementById('chatSupport');
    const closeChat = document.getElementById('closeChat');
    
    function addMessage(message, isUser = true) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${isUser ? 'user' : 'support'}`;
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    chatSupport.addEventListener('click', () => {
        chatWidget.classList.add('active', 'slide-in');
        addMessage('Hello! How can I help you today?', false);
    });
    
    closeChat.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });
    
    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message);
            messageInput.value = '';
            
            setTimeout(() => {
                addMessage('Thank you for your message. A support agent will respond shortly.', false);
            }, 1000);
        }
    });
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
}

// Notifications
function initNotifications() {
    const notifyBtn = document.getElementById('notifyBtn');
    
    async function requestNotifications() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                notifyBtn.textContent = '🔔 Notifications On';
                notifyBtn.classList.add('active');
                
                new Notification('Shipping Updates Enabled', {
                    body: 'You will receive updates about your package delivery.',
                    icon: '/icon.png'
                });
            }
        }
    }
    
    notifyBtn.addEventListener('click', requestNotifications);
}
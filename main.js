// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });
    
    // Initialize all components
    initNavbar();
    initProductGrid();
    initCart();
    initScrollToTop();
    initNewsletterForm();
    initSmoothScroll();
});

// Product Data
const products = [
    // Computers
    {
        id: 1,
        name: "MacBook Pro M3",
        description: "Ordinateur portable haut de gamme avec puce M3",
        price: 2499,
        oldPrice: 2699,
        image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "computers",
        badge: "Nouveau"
    },
    {
        id: 2,
        name: "Dell XPS 15",
        description: "Laptop premium pour les professionnels",
        price: 1899,
        oldPrice: 2099,
        image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "computers",
        badge: "Promo"
    },
    {
        id: 3,
        name: "Gaming PC RTX 4080",
        description: "PC gaming haute performance",
        price: 2299,
        image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "computers",
        badge: "Populaire"
    },
    
    // Phones
    {
        id: 4,
        name: "iPhone 15 Pro",
        description: "Le dernier smartphone Apple avec titanium",
        price: 1299,
        oldPrice: 1399,
        image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "phones",
        badge: "Nouveau"
    },
    {
        id: 5,
        name: "Samsung Galaxy S24",
        description: "Smartphone Android flagship",
        price: 899,
        image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "phones",
        badge: "Top Vente"
    },
    {
        id: 6,
        name: "Google Pixel 8",
        description: "Photo exceptionnelle avec IA Google",
        price: 699,
        oldPrice: 799,
        image: "https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "phones",
        badge: "Promo"
    },
    
    // Accessories
    {
        id: 7,
        name: "AirPods Pro 2",
        description: "Écouteurs sans fil avec réduction de bruit",
        price: 279,
        image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "accessories",
        badge: "Bestseller"
    },
    {
        id: 8,
        name: "Magic Keyboard",
        description: "Clavier sans fil premium",
        price: 199,
        oldPrice: 229,
        image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "accessories"
    },
    {
        id: 9,
        name: "Webcam 4K Pro",
        description: "Caméra professionnelle pour streaming",
        price: 149,
        image: "https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "accessories"
    },
    
    // Storage
    {
        id: 10,
        name: "SSD NVMe 2TB",
        description: "Disque SSD ultra-rapide NVMe",
        price: 199,
        oldPrice: 249,
        image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "storage",
        badge: "Promo"
    },
    {
        id: 11,
        name: "Clé USB 3.0 128GB",
        description: "Stockage portable haute vitesse",
        price: 29,
        image: "https://images.pexels.com/photos/4614200/pexels-photo-4614200.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "storage"
    },
    {
        id: 12,
        name: "Disque Dur 4TB",
        description: "Stockage externe haute capacité",
        price: 129,
        image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "storage"
    }
];

// Cart functionality
let cart = [];
let cartTotal = 0;

function initNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initProductGrid() {
    const productGrid = document.getElementById('productGrid');
    const categoryButtons = document.querySelectorAll('.btn-category');
    
    // Render products
    function renderProducts(productsToShow = products) {
        productGrid.innerHTML = '';
        
        productsToShow.forEach((product, index) => {
            const productCard = createProductCard(product, index);
            productGrid.appendChild(productCard);
        });
        
        // Re-initialize AOS for new elements
        AOS.refresh();
    }
    
    function createProductCard(product, index) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4';
        col.setAttribute('data-aos', 'fade-up');
        col.setAttribute('data-aos-delay', (index % 3) * 100);
        
        col.innerHTML = `
            <div class="product-card category-${product.category}" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                </div>
                <div class="product-info">
                    <h5 class="product-title">${product.name}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        ${product.price} €
                        ${product.oldPrice ? `<span class="old-price">${product.oldPrice} €</span>` : ''}
                    </div>
                    <button class="btn btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus me-2"></i>Ajouter au Panier
                    </button>
                </div>
            </div>
        `;
        
        return col;
    }
    
    // Category filtering
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const filteredProducts = category === 'all' 
                ? products 
                : products.filter(product => product.category === category);
            
            // Add loading animation
            productGrid.classList.add('loading');
            
            setTimeout(() => {
                renderProducts(filteredProducts);
                productGrid.classList.remove('loading');
            }, 300);
        });
    });
    
    // Initial render
    renderProducts();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showCartNotification(product.name);
    
    // Add bounce effect to cart button
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.classList.add('bounce-in');
    setTimeout(() => cartBtn.classList.remove('bounce-in'), 600);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `${cartTotal.toFixed(2)} €`;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="fas fa-shopping-cart fa-3x mb-3 opacity-50"></i>
                <p>Votre panier est vide</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price} €</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" value="${item.quantity}" class="quantity-input" 
                               onchange="updateCartQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
}

function showCartNotification(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: var(--shadow-medium);
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        ${productName} ajouté au panier !
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function initCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cartModal.show();
    });
    
    // Checkout functionality
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Votre panier est vide !');
            return;
        }
        
        // Simulate checkout process
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Traitement...';
        this.disabled = true;
        
        setTimeout(() => {
            alert(`Commande validée ! Total: ${cartTotal.toFixed(2)} €`);
            cart = [];
            updateCartUI();
            cartModal.hide();
            this.innerHTML = '<i class="fas fa-credit-card me-2"></i>Procéder au Paiement';
            this.disabled = false;
        }, 2000);
    });
}

function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initNewsletterForm() {
    const newsletterBtn = document.querySelector('.btn-newsletter');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    newsletterBtn.addEventListener('click', function() {
        const email = newsletterInput.value.trim();
        
        if (!email) {
            newsletterInput.classList.add('shake');
            setTimeout(() => newsletterInput.classList.remove('shake'), 500);
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Veuillez entrer une adresse e-mail valide');
            return;
        }
        
        // Simulate subscription
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Inscription...';
        this.disabled = true;
        
        setTimeout(() => {
            alert('Merci pour votre inscription ! Vous recevrez bientôt nos dernières offres.');
            newsletterInput.value = '';
            this.innerHTML = '<i class="fas fa-paper-plane me-2"></i>S\'inscrire';
            this.disabled = false;
        }, 1500);
    });
    
    newsletterInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            newsletterBtn.click();
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initSmoothScroll() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Advanced Animations
function addAdvancedAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString() + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    }
    
    updateCounter();
}

// Initialize counter animations when stats section is visible
function initStatCounters() {
    const statsSection = document.querySelector('.hero-stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach((stat, index) => {
                    const targets = [10000, 500, 5];
                    setTimeout(() => {
                        animateCounter(stat, targets[index]);
                    }, index * 200);
                });
            }
        });
    });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Product hover effects
function initProductHoverEffects() {
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            card.classList.add('glow-effect');
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            card.classList.remove('glow-effect');
        }
    });
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        addAdvancedAnimations();
        initStatCounters();
        initProductHoverEffects();
    }, 1000);
});

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    function typeText() {
        if (i < originalText.length) {
            heroTitle.innerHTML = originalText.substring(0, i + 1);
            i++;
            setTimeout(typeText, 50);
        }
    }
    
    setTimeout(typeText, 1000);
}

// Initialize typing effect on page load
window.addEventListener('load', function() {
    setTimeout(initTypingEffect, 500);
});
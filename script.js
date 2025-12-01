document.addEventListener('DOMContentLoaded', function () {
    // === MOBILE MENU ===
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let menuOpen = false;

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            menuOpen = !menuOpen;
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('open');

            // Troca ícone (☰ ↔ ✕)
            mobileMenuButton.textContent = menuOpen ? '✕' : '☰';
        });

        // Fecha o menu clicando fora
        document.addEventListener('click', function (event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('open');
                    mobileMenuButton.textContent = '☰';
                    menuOpen = false;
                }
            }
        });
    }

    // === SEU CARRINHO ===
    let cartItems = [];
    let cartCount = 0;

    function initializeCart() {
        const savedCart = localStorage.getItem('softagCart');
        if (savedCart) {
            cartItems = JSON.parse(savedCart);
            cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
            updateCartCount();
        }
    }

    window.addToCart = function (productName, productPrice, productImage = null) {
        const existingItem = cartItems.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage
            });
        }

        cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        updateCartCount();
        saveCartToStorage();
        showNotification('Produto adicionado ao carrinho!');
    };

    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
        }
    }

    function saveCartToStorage() {
        localStorage.setItem('softagCart', JSON.stringify(cartItems));
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-transform duration-300';
        notification.textContent = message;
        notification.style.transform = 'translateX(100%)';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    initializeCart();

    const cartIcon = document.getElementById('shopping-cart');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCartModal);
    }

    const closeCartModal = document.getElementById('close-cart-modal');
    if (closeCartModal) {
        closeCartModal.addEventListener('click', closeCartModalFunc);
    }

    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.addEventListener('click', function (e) {
            if (e.target === cartModal) {
                closeCartModalFunc();
            }
        });
    }

    function openCartModal() {
        const modal = document.getElementById('cart-modal');
        if (modal) {
            populateCartModal();
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCartModalFunc() {
        const modal = document.getElementById('cart-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    function populateCartModal() {
        const container = document.getElementById('cart-items-container');
        const totalElement = document.getElementById('cart-total');

        if (!container || !totalElement) return;

        container.innerHTML = '';

        if (cartItems.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-center py-4">Seu carrinho está vazio</p>';
            totalElement.textContent = 'R$ 0,00';
            return;
        }

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex items-center justify-between py-3 border-b border-gray-700';
            itemElement.innerHTML = `
                <div class="flex items-center">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded mr-3">` : ''}
                    <div>
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-sm text-gray-400">R$ ${item.price} x ${item.quantity}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-semibold">R$ ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
            container.appendChild(itemElement);
        });

        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const productsData = {
            keyboards: {
            title: "Клавиатуры",
            desc: "Механические и мембранные клавиатуры для геймеров и профи",
            items: [
                { name: "Механическая Silent Night", price: 8200, img: "images/kb_silent.png", category: "Клавиатуры" },
                { name: "RGB Pro X-Phantom", price: 13900, img: "images/kb_phantom.png", category: "Клавиатуры" },
                { name: "Wireless Compact 60%", price: 5800, img: "images/kb_compact.png", category: "Клавиатуры" },
                { name: "Opto-Mechanical Speed", price: 15600, img: "images/kb_opto.png", category: "Клавиатуры" },
                { name: "Ergo Type-R Black", price: 9100, img: "images/kb_ergo.png", category: "Клавиатуры" }
            ]
        },
        mice: {
            title: "Мыши",
            desc: "Высокоточные оптические сенсоры для идеального контроля",
            items: [
                { name: "Оптическая Precision v2", price: 3800, img: "images/mouse_v2.png", category: "Мыши" },
                { name: "Gaming Ultra Light", price: 7400, img: "images/mouse_light.png", category: "Мыши" },
                { name: "Dark Matter Wireless", price: 11200, img: "images/mouse_dark.png", category: "Мыши" },
                { name: "Vortex Sniper Pro", price: 5900, img: "images/mouse_vortex.png", category: "Мыши" }
            ]
        },
        audio: {
            title: "Звук",
            desc: "Погрузитесь в атмосферу с кристально чистым звуком",
            items: [
                { name: "Студийные наушники Air HD", price: 12500, img: "images/headphones_air.png", category: "Звук" },
                { name: "Pro Gaming Headset Elite", price: 9800, img: "images/headphones_elite.png", category: "Звук" },
                { name: "TWS Echo Buds Gen 3", price: 6300, img: "images/audio_tws.png", category: "Звук" },
                { name: "SoundBar Cinema Wave", price: 18400, img: "images/audio_bar.png", category: "Звук" }
            ]
        },
        monitors: {
            title: "Мониторы",
            desc: "Яркие и четкие дисплеи для работы и игр",
            items: [
                { name: "UltraWide 4K Crystal", price: 48500, img: "images/monitor_4k.png", category: "Мониторы" },
                { name: "Gaming Curved 240Hz", price: 36200, img: "images/monitor_curve.png", category: "Мониторы" },
                { name: "ProArt Creative 32\"", price: 52000, img: "images/monitor_pro.png", category: "Мониторы" }
            ]
        },
        storage: {
            title: "Накопители",
            desc: "Быстрые SSD и надежные HDD для ваших данных",
            items: [
                { name: "SSD NVMe Gen4 1TB", price: 9200, img: "images/ssd_gen4.png", category: "Накопители" },
                { name: "SSD Portable Rugged 2TB", price: 14500, img: "images/ssd_ext.png", category: "Накопители" },
                { name: "HDD Enterprise Cloud 4TB", price: 11800, img: "images/hdd_4tb.png", category: "Накопители" }
            ]
        },
        cables: {
            title: "Кабели",
            desc: "Надежные аксессуары для подключения",
            items: [
                { name: "USB-C Braided Gold", price: 1450, img: "images/cable_usb.png", category: "Кабели" },
                { name: "HDMI 2.1 Ultra High Speed", price: 2100, img: "images/cable_hdmi.png", category: "Кабели" },
                { name: "DisplayPort 1.4 Armor", price: 1850, img: "images/cable_dp.png", category: "Кабели" }
            ]
        },
        chairs: {
            title: "Кресла",
            desc: "Эргономичные кресла для длительных сессий",
            items: [
                { name: "CyberChair Pro Max", price: 32000, img: "images/chair_max.png", category: "Кресла" },
                { name: "Aero Comfort Mesh", price: 24500, img: "images/chair_mesh.png", category: "Кресла" },
                { name: "Titan Throne Leather", price: 41000, img: "images/chair_titan.png", category: "Кресла" }
            ]
        },
    };

    function getCart() {
        return JSON.parse(localStorage.getItem('cybergear_cart') || '[]');
    }

    function saveCart(cart) {
        localStorage.setItem('cybergear_cart', JSON.stringify(cart));
        updateCartBadge();
    }

    function updateCartBadge() {
        const cart = getCart();
        const count = cart.reduce((sum, item) => sum + item.qty, 0);
        const badges = document.querySelectorAll('.cart-count');
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    const cartItemsContainer = document.querySelector('.cart-items');
    
    function renderCart() {
        if (!cartItemsContainer) return;
        
        const cart = getCart();
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Корзина пуста</p>';
            const checkoutBtn = document.querySelector('.checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.disabled = true;
                document.querySelector('.summary-note').textContent = 'Добавьте товары, чтобы оформить заказ';
            }
            updateCartSummary(0);
            return;
        }

        let html = '';
        cart.forEach((item, index) => {
            html += `
                <div class="cart-item" data-index="${index}">
                    <div class="cart-item-img">
                        <img src="${item.img}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p class="item-category">${item.category || 'Аксессуары'}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn minus"><i class="fas fa-minus"></i></button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn plus"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="cart-item-price">${(item.price * item.qty).toLocaleString('ru-RU')} ₽</div>
                    <button class="cart-item-remove"><i class="far fa-trash-alt"></i></button>
                </div>
            `;
        });

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        if (subtotal > 15000) {
            html += `
                <div class="cart-item gift">
                    <div class="cart-item-img">
                        <img src="images/mousepad_l.png" alt="Подарочный коврик">
                    </div>
                    <div class="cart-item-info">
                        <h3>Игровой коврик (L) <span class="gift-badge">ПОДАРОК</span></h3>
                        <p class="item-category">Аксессуары</p>
                    </div>
                    <div class="cart-item-quantity">
                        <span class="qty-value">1</span>
                    </div>
                    <div class="cart-item-price">0 ₽</div>
                    <div style="width: 40px;"></div>
                </div>
            `;
        }

        cartItemsContainer.innerHTML = html;
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
            document.querySelector('.summary-note').textContent = 'Нажимая кнопку, вы соглашаетесь с условиями оферты';
        }
        updateCartSummary(subtotal);
    }

    function updateCartSummary(subtotal) {
        const totalDisplay = document.querySelector('.summary-total span:last-child');
        const itemsCountDisplay = document.querySelector('.summary-row span:first-child');
        const itemsPriceDisplay = document.querySelector('.summary-row span:last-child');
        const payAmountDisplay = document.getElementById('pay-amount');
        
        if (totalDisplay) {
            const cart = getCart();
            const count = cart.reduce((sum, item) => sum + item.qty, 0);
            const formattedTotal = subtotal.toLocaleString('ru-RU') + ' ₽';
            totalDisplay.textContent = formattedTotal;
            if (itemsCountDisplay) itemsCountDisplay.textContent = `Товары (${count})`;
            if (itemsPriceDisplay) itemsPriceDisplay.textContent = formattedTotal;
            if (payAmountDisplay) payAmountDisplay.textContent = subtotal.toLocaleString('ru-RU');
        }
    }

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;

            const cartItem = target.closest('.cart-item');
            if (!cartItem || cartItem.classList.contains('gift')) return;
            
            const index = parseInt(cartItem.dataset.index);
            const cart = getCart();

            if (target.classList.contains('qty-btn')) {
                if (target.classList.contains('plus')) {
                    cart[index].qty++;
                } else if (target.classList.contains('minus') && cart[index].qty > 1) {
                    cart[index].qty--;
                }
                saveCart(cart);
                renderCart();
            }

            if (target.classList.contains('cart-item-remove')) {
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    cart.splice(index, 1);
                    saveCart(cart);
                    renderCart();
                }, 300);
            }
        });
        renderCart();
    }

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-add');
        if (!btn) return;

        const card = btn.closest('.product-card');
        const product = {
            name: card.querySelector('h3').textContent,
            price: parseInt(card.querySelector('.price').textContent.replace(/\D/g, '')),
            img: card.querySelector('img').src,
            category: card.querySelector('.category')?.textContent || "Гаджеты",
            qty: 1
        };

        const cart = getCart();
        const existingIndex = cart.findIndex(item => item.name === product.name);
        
        if (existingIndex > -1) {
            cart[existingIndex].qty++;
        } else {
            cart.push(product);
        }

        saveCart(cart);

        const originalText = btn.textContent;
        btn.textContent = 'Добавлено!';
        btn.style.borderColor = '#166534';
        btn.style.color = '#166534';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 2000);
    });

    const categoryProductsGrid = document.getElementById('category-products');
    if (categoryProductsGrid) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryType = urlParams.get('type');
        
        const data = productsData[categoryType] || { title: "Все товары", desc: "Ознакомьтесь с нашим ассортиментом", items: [] };
        
        document.getElementById('category-title').textContent = data.title;
        document.getElementById('category-description').textContent = data.desc;
        
        if (data.items.length === 0) {
            categoryProductsGrid.innerHTML = '<p>В этой категории пока нет товаров.</p>';
        } else {
            categoryProductsGrid.innerHTML = data.items.map(item => `
                <div class="product-card">
                    <div class="product-img">
                        <img src="${item.img}" alt="${item.name}" class="product-thumb">
                    </div>
                    <div class="product-info">
                        <span class="category">${item.category}</span>
                        <h3>${item.name}</h3>
                        <div class="product-footer">
                            <span class="price">${item.price.toLocaleString('ru-RU')} ₽</span>
                            <button class="btn-add">В корзину</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    const paymentModal = document.getElementById('payment-modal');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const modalClose = document.querySelector('.modal-close');

    if (checkoutBtn && paymentModal) {
        checkoutBtn.addEventListener('click', () => {
            const totalText = document.querySelector('.summary-total span:last-child').textContent;
            const total = parseInt(totalText.replace(/\s/g, ''));

            if (total === 0) {
                showSuccess("Заказ оформлен бесплатно по акции!");
                completeOrder();
            } else {
                paymentModal.classList.add('active');
            }
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                paymentModal.classList.remove('active');
            });
        }
    }

    const cardNumberInput = document.getElementById('card-number');
    const cardExpiryInput = document.getElementById('card-expiry');
    const cardCvvInput = document.getElementById('card-cvv');
    const cardHolderInput = document.getElementById('card-holder');
    const cardVisual = document.getElementById('card-visual');

    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(.{4})/g, '$1 ').trim();
            e.target.value = value;
            document.querySelector('.card-number-display').textContent = value || '•••• •••• •••• ••••';
        });

        cardExpiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2, 4);
            e.target.value = value;
            document.querySelector('.card-expiry-display').textContent = value || 'MM/YY';
        });

        cardCvvInput.addEventListener('focus', () => cardVisual.classList.add('flipped'));
        cardCvvInput.addEventListener('blur', () => cardVisual.classList.remove('flipped'));
        cardCvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            document.querySelector('.cvv-display').textContent = e.target.value.replace(/./g, '•') || '•••';
        });

        cardHolderInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
            document.querySelector('.card-holder-display').textContent = e.target.value || 'CARDHOLDER NAME';
        });
    }

    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const expiry = cardExpiryInput.value;
            if (!expiry.includes('/')) return alert("Неверный формат даты");
            
            const [month, year] = expiry.split('/').map(n => parseInt(n));
            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentYear = parseInt(now.getFullYear().toString().slice(-2));

            if (!month || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
                alert("Срок действия карты истек или указан неверно");
                return;
            }

            const btn = paymentForm.querySelector('.pay-btn');
            btn.textContent = "Обработка...";
            btn.disabled = true;

            setTimeout(() => {
                paymentModal.classList.remove('active');
                showSuccess("Оплата прошла успешно!");
                completeOrder();
                btn.textContent = "Оплатить";
                btn.disabled = false;
                paymentForm.reset();
            }, 2000);
        });
    }

    function showSuccess(message) {
        const notification = document.getElementById('success-notification');
        if (notification) {
            notification.querySelector('p').textContent = message;
            notification.style.display = 'block';
            setTimeout(() => notification.style.display = 'none', 4000);
        }
    }

    function completeOrder() {
        const cart = getCart();
        const total = document.querySelector('.summary-total span:last-child').textContent;
        const itemsNames = cart.map(item => item.name).join(', ');
        
        const orders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        orders.unshift({
            id: '№' + Math.floor(Math.random() * 90000 + 10000),
            date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
            items: itemsNames || "Бесплатный подарок",
            price: total,
            status: 'Обрабатывается'
        });
        localStorage.setItem('user_orders', JSON.stringify(orders));

        localStorage.removeItem('cybergear_cart');
        updateCartBadge();
        if (cartItemsContainer) renderCart();
    }

    const ordersList = document.querySelector('.orders-list');
    if (ordersList) {
        const savedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        if (savedOrders.length > 0) {
            ordersList.innerHTML = savedOrders.map(order => `
                <div class="order-item">
                    <div class="order-info">
                        <span class="order-number">Заказ ${order.id}</span>
                        <span class="order-date">от ${order.date}</span>
                    </div>
                    <div class="order-status processing">${order.status}</div>
                    <div class="order-details">
                        <p>${order.items}</p>
                        <span class="order-price">${order.price}</span>
                    </div>
                </div>
            `).join('');
        }
    }

    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const submitBtn = document.querySelector('.auth-submit');
            if (submitBtn) submitBtn.textContent = tab.textContent === 'Вход' ? 'Войти в аккаунт' : 'Зарегистрироваться';
        });
    });

    const profileNavLinks = document.querySelectorAll('.profile-nav a:not(.logout)');
    const profileTabs = document.querySelectorAll('.profile-tab-content');
    profileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            profileNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            profileTabs.forEach(tab => tab.style.display = 'none');
            const targetId = link.getAttribute('href').replace('#', '');
            const targetTab = document.getElementById(`${targetId}-section`);
            if (targetTab) targetTab.style.display = 'block';
        });
    });

    updateCartBadge();
});

const orderForms = document.querySelectorAll('.js-order-form');

orderForms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        
        form.hidden = true;
        form.parentElement.querySelector('.js-order-success').hidden = false;
        if (cartList) {
            saveCart([]);
            updateCartCount();
            renderCart();
        }
    });
});

const orderModal = document.getElementById('orderModal');

if (orderModal) {
    orderModal.addEventListener('show.bs.modal', function (event){
        const form = orderModal.querySelector('.js-order-form');

        form.reset();
        form.classList.remove('was-validated');
        form.hidden = false;
        orderModal.querySelector('.js-order-success').hidden = true;

        form.elements.product.value = event.relatedTarget.dataset.product;
    });
}

const CART_KEY = 'lightworld-cart';
const cartCount = document.getElementById('cart-count');

function loadCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartCount() {
    let total = 0;
    loadCart().forEach(function (item) {
        total += item.qty;
    });
    cartCount.textContent = total;
    cartCount.hidden = total === 0;
}

function addToCart(id, name, price) {
    const cart = loadCart();
    const item = cart.find(function (entry) {
        return entry.id === id;
    });

    if (item) {
        item.qty += 1;
    }else {
        cart.push({id: id, name: name, price: price, qty: 1});
    }
    saveCart(cart);
    updateCartCount();
}

updateCartCount();
document.querySelectorAll('[data-cart-id]').forEach(function (button) {
    button.addEventListener('click', function () {
        addToCart(button.dataset.cartId, button.dataset.cartName, Number(button.dataset.cartPrice));

        const toast = document.getElementById('cart-toast');
        document.getElementById('cart-toast-text').textContent = 'Добавлено: ' + button.dataset.cartName;
        bootstrap.Toast.getOrCreateInstance(toast).show();
    });
});

const cartList = document.getElementById('cart-list');

function removeFromCart(id) {
    const cart = loadCart().filter(function (item) {
        return item.id !== id;
    });

    saveCart(cart);
    updateCartCount();
    renderCart();
}

function renderCart() {
    if (!cartList) {
        return;
    }

    const cart = loadCart();
    let total = 0;

    cartList.innerHTML = '';

    cart.forEach(function (item) {
        const sum = item.price * item.qty;
        total += sum;

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center gap-2';
        li.innerHTML = `
            <span>${item.name} × ${item.qty}</span>
            <span class="text-nowrap">
                ${sum} руб.
                <button class="btn btn-sm btn-outline-danger" type="button">Убрать</button>
            </span>
        `;

        li.querySelector('button').addEventListener('click', function () {
            removeFromCart(item.id);
        });

        cartList.append(li);
    });

    const isEmpty = cart.length === 0;

    document.getElementById('cart-empty').hidden = !isEmpty;
    cartList.hidden = isEmpty;
    document.getElementById('cart-total-row').hidden = isEmpty;
    document.getElementById('cart-total').textContent = total;
}

renderCart();


const filters = document.getElementById('filters');

if(filters){
    const grid = document.getElementById('catalog-grid');
    const products = Array.from(document.querySelectorAll('.js-product'));

    function applyFilters() {
        const search = filters.elements.search.value.trim().toLowerCase();
        const category = filters.elements.category.value;
        const sort = filters.elements.sort.value;
        let visibleCount = 0;

        products.forEach(function (product) {
            const title = product.querySelector('.card-title').textContent.toLowerCase();
            const matchesSearch = title.includes(search);
            const matchesCategory = category === 'all' || product.dataset.category === category;
            const visible = matchesSearch && matchesCategory;

            product.hidden = !visible;

            if (visible) {
                visibleCount += 1;
            }
        });

        const sorted = products.slice();

        if (sort === 'cheap') {
            sorted.sort(function (a, b) {
                return a.dataset.price - b.dataset.price;
            });
        } else if (sort === 'expensive') {
            sorted.sort(function (a, b) {
                return b.dataset.price - a.dataset.price;
            });
        }

        sorted.forEach(function (product) {
            grid.append(product);
        });

        document.getElementById('catalog-empty').hidden = visibleCount > 0;
    }

    filters.addEventListener('input', applyFilters);

    filters.addEventListener('submit', function (event) {
        event.preventDefault();
    });

    filters.addEventListener('reset', function () {
        setTimeout(applyFilters);
    });
}

const tagButtons = document.querySelectorAll('button[data-tag]');
const posts = document.querySelectorAll('.js-post');

tagButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const tag = button.dataset.tag;

        tagButtons.forEach(function (otherButton) {
            otherButton.classList.toggle('active', otherButton === button);
            otherButton.setAttribute('aria-pressed', otherButton === button);
        });

        posts.forEach(function (post) {
            post.hidden = tag !== 'all' && post.dataset.tag !== tag;
        });
    });
});

const ipCopy = document.getElementById('ip-copy');

if (ipCopy) {
    const ip = ipCopy.textContent;

    ipCopy.addEventListener('click', function () {
        navigator.clipboard.writeText(ip).then(function () {
            ipCopy.textContent = 'Скопировано!';

            setTimeout(function () {
                ipCopy.textContent = ip;
            }, 2000);
        });
    });
}
class View {
    constructor() {
        this.appElement = document.getElementById('app');
        this.controller = null;
        this.bindEvents();
    }

    setController(controller) {
        this.controller = controller;
        this.updateView();
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('addToCart')) {
                const index = e.target.dataset.index;
                if (this.controller) {
                    this.controller.addToCart(index);
                }
            }

            if (e.target.classList.contains('removebutton')) {
                const index = e.target.dataset.index;
                if (this.controller) {
                    this.controller.removeFromCart(index);
                }
            }
        });
    }

    updateView() {
        const storeItems = this.controller.getStoreItems();
        const cartItems = this.controller.getCartItems();
        const totalPrice = this.controller.getTotalPrice();

        this.appElement.innerHTML = `
            <header class="bg-danger text-white">
                <h1 class="header text-center p-4">OKMart</h1>
            </header>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8">
                        <div class="store row">
                            ${this.createStoreHTML(storeItems)}
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="shoppingCart bg-light border p-3">
                            <h2 class="cartheader text-center">Shopping Cart</h2>
                            ${this.createCartHTML(cartItems)}
                            <div class="sumtotal bg-white text-center p-2">Total to pay: ${totalPrice.toFixed(2)} kr</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createStoreHTML(items) {
        return items.map((item, index) => `
            <div class="itemcontainer col-md-3 mb-4">
                <div class="card shadow-sm">
                    <img class="itemimage card-img-top" src="${item.image}" alt="${item.item}">
                    <div class="card-body">
                        <h5 class="card-title">${item.item}</h5>
                        <p class="card-text">${item.price} kr</p>
                        <p class="card-text">${item.stock} left in stock</p>
                        <button class="addToCart btn btn-primary" data-index="${index}">Add to cart</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    createCartHTML(items) {
        if (items.length === 0) {
            return "<p class='text-center'>Empty Cart, buy something!</p>";
        }

        return items.map((item, index) => `
            <div class="cartitem d-flex align-items-center border-bottom py-2">
                <div class="mr-3">${item.cart}x</div>
                <div class="flex-grow-1">${item.item}</div>
                <img class="cartimage" src="${item.image}" alt="${item.item}">
                <button class="removebutton btn btn-danger btn-sm ml-3" data-index="${index}">Remove</button>
            </div>
        `).join('');
    }
}

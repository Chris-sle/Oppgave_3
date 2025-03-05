class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
    }

    getStoreItems() {
        return this.model.getItems();
    }

    getCartItems() {
        return this.model.shoppingCart.getItems();
    }

    getTotalPrice() {
        return this.model.shoppingCart.getTotalPrice();
    }

    addToCart(index) {
        this.model.shoppingCart.addItem(index);
        this.view.updateView();
    }

    removeFromCart(index) {
        this.model.shoppingCart.removeItem(index);
        this.view.updateView();
    }
}

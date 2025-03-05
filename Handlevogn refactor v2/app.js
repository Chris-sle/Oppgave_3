document.addEventListener('DOMContentLoaded', () => {
    const storeModel = new Store();
    const shoppingCartModel = new ShoppingCart(storeModel);

    storeModel.shoppingCart = shoppingCartModel;

    const view = new View();
    const controller = new Controller(storeModel, view);
    
    view.setController(controller);
});

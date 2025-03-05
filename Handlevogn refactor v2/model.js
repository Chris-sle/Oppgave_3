class Item {
    constructor(item, price, stock, image) {
        this.item = item;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.cart = 0;
    }
}

class Store {
    constructor() {
        this.items = [
            new Item('Milk', 29.9, 15, 'img/milk.png'),
            new Item('Cereal', 19.9, 10, 'img/cereal.png'),
            new Item('Chocolate', 39.9, 8, 'img/chocolate.png'),
            new Item('Friend', 10000, 0, 'img/friend.png'), // Note: out of stock
            new Item('Broccoli', 17.9, 10, 'img/broccoli.png'),
            new Item('Coca-Cola', 24.9, 24, 'img/cola.png'),
            new Item('Tomato', 12.9, 13, 'img/tomato.png'),
            new Item('Heinz baked beans', 23.9, 9, 'img/beans.png'),
            new Item('Eggs', 49.9, 8, 'img/eggs.png'),
            new Item('Potato', 20.9, 50, 'img/potato.png'),
            new Item('Pringles original', 29.9, 10, 'img/pringles.png'),
            new Item('Campbells Tomato Soup', 39.9, 1, 'img/tomatosoup.png'),
        ];
    }

    getItems() {
        return this.items;
    }

    addToCart(index) {
        const item = this.items[index];
        if (item.stock > 0) {
            item.stock--;
            item.cart++;
        } else {
            throw new Error('Item out of stock');
        }
    }

    resetCart(index) {
        const item = this.items[index];
        item.stock += item.cart;
        item.cart = 0;
    }
}

class ShoppingCart {
    constructor(store) {
        this.store = store;
        this.items = [];
        this.sumTotal = 0;
    }

    addItem(index) {
        try {
            this.store.addToCart(index);
            if (!this.items.includes(this.store.items[index])) {
                this.items.push(this.store.items[index]);
            }
            this.sumTotal += this.store.items[index].price;
        } catch (error) {
            alert(error.message);
        }
    }

    removeItem(index) {
        const item = this.items[index];
        this.sumTotal -= item.price * item.cart;
        this.store.resetCart(this.store.items.indexOf(item));
        this.items.splice(index, 1);
    }

    updateItemAmount(index, newAmount) {
        const item = this.items[index];
        const variance = newAmount - item.cart;
        if (variance !== 0) {
            const itemIndex = this.store.items.indexOf(item);
            if (variance > 0) {
                for (let i = 0; i < variance; i++) {
                    this.addItem(itemIndex);
                }
            } else {
                this.sumTotal += variance * item.price;
                item.stock -= variance;
                item.cart += variance;
            }
        }
    }

    getItems() {
        return this.items;
    }

    getTotalPrice() {
        return this.sumTotal;
    }


    isEmpty() {
        return this.items.length === 0;
    }
}

const users = model.data.users;
const data = model.data;

function addToCart(i){
    if(data.store[i].stock > 0){
        if(!users.shoppingCart.includes(data.store[i])) {
            users.shoppingCart.push(data.store[i]);
            data.store[i].stock --;
            data.store[i].cart ++
        } else {
            data.store[i].cart++;
            data.store[i].stock --;
        }
        users.sumtotal += data.store[i].price;
    } else {
        alert("Item out of stock")
    }
    updateview()
}


function removeFromCart(i){
        let shoppingCartItem = users.shoppingCart[i];
        let storeItem = data.store.find(item => item.item === shoppingCartItem.item)

        itemtotal = shoppingCartItem.price * shoppingCartItem.cart
        users.sumtotal = users.sumtotal - itemtotal
        users.shoppingCart.splice(i, 1)
        
        storeItem.stock += storeItem.cart;
        storeItem.cart = 0;
    updateview()
}

function startedit(){
    users.editamount = true
    updateview()
}

function endedit(){
    users.editamount = false
    updateview()
}

function changeamount(i){
    const inputamount = document.getElementById(`editamount${i}`)
    inputvariance = inputamount - users.shoppingCart[i].cart
    parseInt(inputvariance)
    pricevariance = inputvariance * users.shoppingCart[i].cart
    shoppingCart[i].cart = inputamount.value;

    console.log(inputvariance)
    if(shoppingCart[i].cart == 0){
        removeFromCart(i)
    }
    
    updateview()
}
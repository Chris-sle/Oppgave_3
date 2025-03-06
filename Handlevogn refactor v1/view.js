function updateview(){
    app.innerHTML = /*HTML*/`

    <div class="page">
    <h1 class="header">OKMart</h1>

    <div class="store">
        ${createstore()}
        </div>

    <div class="shoppingCart">
        <h2 class="cartheader">Shopping Cart</h2>
            ${updateCart()}
            <div class="sumtotal">Totalt å betale: ${model.data.users.sumtotal.toFixed(2)} kr</div>
   </div>
        
    `;
}



function createamount(i){
    const shoppingCart = model.data.users.shoppingCart
    if(!model.data.users.editamount){
        return `<div onclick="startedit()">${shoppingCart[i].cart}x</div>`;
    }
    else{
        return `<input type="number" id="editamount${i}" onchange="changeamount(${i})" 
        value="${shoppingCart[i].cart}">`;
    }
}

function createeditbutton(i){
    if(!model.data.users.editamount){
        return `<button class="removebutton" onclick="removeFromCart(${i})">Remove</button>`;
    }
    else{
        return `<button class="removebutton" onclick="endedit()">Confirm</button>`;
    }
}

function createstore(){
    const store = model.data.store
    let html = ''
    for( let i = 0; i < store.length; i++){
        html +=     `<div class="itemcontainer">
                        <div>${store[i].item}</div>
                        <img class="itemimage" src="${store[i].image}">            
                        <div>${store[i].price} kr</div>
                        <div>${store[i].stock} left in stock</div>
                        <button class="addToCart" onclick="addToCart(${i})">Add to cart</button>
                        </div>
                        `;
    }
    return html
}

function updateCart(){  
    const shoppingCart = model.data.users.shoppingCart;
    
    let cartView ="";
    if(shoppingCart.length <= 0){
        cartView = "Empty Cart, buy somth"
    }
    else{
        for(let i = 0; i < shoppingCart.length; i++){
            cartView += `<div class="cartitem">
                ${createamount(i)}
                <div>${shoppingCart[i].item}</div>
                <img class="cartimage "src="${shoppingCart[i].image}">
                ${createeditbutton(i)}
            </div>
            `;
            }
    }
    
     return cartView
}
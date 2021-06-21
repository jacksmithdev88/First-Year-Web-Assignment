let drinkType = document.getElementById("drinks");
let drinkSize = document.getElementById("size");
let drinkMilk = document.getElementById("milkchoice");
let drinkExtras = document.getElementById("extras");
let drinkShots = document.getElementById("Shots");

let type = drinkType.value;
let size = drinkSize.value;
let milk = drinkMilk.value;
let extra = drinkExtras.value;

let addOrder = document.getElementById("add");
let placeOrder = document.getElementById("place");
let addFav = document.getElementById("addFav");
let orderFav = document.getElementById("orderFav");

let outputField = document.getElementById("output");
let orderField = document.getElementById("order");
let totalField = document.getElementById("total");
let currentorderField = document.getElementById("current");

let totalprice = 0; 
let sizeprice = 0;
let extraprice = 0;
let amountordered = 0;

placeOrder.addEventListener("click", place);
placeOrder.addEventListener("click", reset);
addOrder.addEventListener("click", added);
addOrder.addEventListener("click", reset);

drinkType.addEventListener("change", selected);
drinkSize.addEventListener("change", selected);
drinkMilk.addEventListener("change", selected);
drinkExtras.addEventListener("change", selected);
drinkShots.addEventListener("change", selected);

addFav.addEventListener("click", addFavourite);
orderFav.addEventListener("click", orderFavourite);


function selected() { 
    if (drinkType.selectedIndex == 0 || drinkType.selectedIndex == 1 || drinkType.selectedIndex == 2) {
        document.getElementById("milk").style.display = "inline";
    } 
     if (drinkType.selectedIndex == 3 || drinkType.selectedIndex == 4){
        document.getElementById("milk").style.display = "none";
    }
    
    if (drinkExtras.selectedIndex == 2 ) {
        document.getElementById("Shots").style.display = "inline";
        extraprice = (document.getElementById("Shots").value * 0.25);
    } else {
        document.getElementById("Shots").style.display = "none";
    }

    if (drinkExtras.selectedIndex == 1) {
        extraprice = 0.50;
    }

    if (drinkSize.selectedIndex == 2) { 
        sizeprice = 2.85;
    }
    if (drinkSize.selectedIndex == 1) { 
        sizeprice = 2.65;
    } 
    if (drinkSize.selectedIndex == 0) {
        sizeprice = 2.45;
    }

    price = extraprice + sizeprice;
    totalField.innerHTML = `Price of total order: £${totalprice.toFixed(2)} `
    outputField.innerHTML = `Price of current item: £${price.toFixed(2)}`;
}

function added() { 
    let size = drinkSize.value;
    let type = drinkType.value;
    let milk = document.getElementById("milkchoice").value;
    let extra = drinkExtras.value;
    amountordered = amountordered + 1;

    if (drinkSize.selectedIndex == -1 || drinkExtras.selectedIndex == -1 || drinkType == -1) {
        alert("Please fill in all fields!")
        price = 0;
        outputField.innerHTML = `Price of current item: £${price.toFixed(2)}`;
        return;
    }

    let ordertoOut = ""

    console.log(drinkType.selectedIndex)
    console.log(drinkExtras.selectedIndex)

    if ((drinkType.selectedIndex == 0 || drinkType.selectedIndex == 1 || drinkType.selectedIndex == 2) && drinkExtras.selectedIndex == 2) {
        ordertoOut += `<br>${size} ${type} ${milk} and ${drinkShots.value} ${extra}`;
        console.log("chose")

    } else if ((drinkType.selectedIndex || drinkType.selectedIndex == 3 || drinkType.selectedIndex == 4) && drinkExtras.selectedIndex == 2) {
        ordertoOut += `<br>${size} ${type} and ${drinkShots} ${extra}`;

    } else if ((drinkType.selectedIndex == 0 || drinkType.selectedIndex == 1 || drinkType.selectedIndex == 2) && drinkExtras.selectedIndex == 0 || drinkExtras.selectedIndex == 1) {
        ordertoOut += `<br>${size} ${type} ${milk} and ${extra}`

    } else if ((drinkType.selectedIndex == 3 || drinkType.selectedIndex == 4) && (drinkExtras.selectedIndex == 0 || drinkExtras.selectedIndex == 1)) {
        ordertoOut += `<br>${size} ${type} and ${extra}`
    }

    orderField.innerHTML += ordertoOut
    totalprice += price;
    outputField.innerHTML = `Price of current items: £${price.toFixed(2)}`
    totalField.innerHTML = `Price of total order: £${totalprice.toFixed(2)}`;
    document.getElementById("milkchoice").selectedIndex = 2;

    price = 0;
}

function reset() { 
    type.value = "";
    size.value = "";
    document.getElementById("milkchoice").selectedIndex = 2;
    extra.value = "";
}

function place() { 
    price = 0;
    totalprice = 0;
    alert(`Order placed!`);
    outputField.innerHTML = `Price of current items: £${price.toFixed(2)}`
    totalField.innerHTML = `Price of total order: £${totalprice.toFixed(2)}`;
    orderField.innerHTML = "Your order:"
}

function addFavourite() { 
    if (price == 0) {
        alert("Please select a drink");
        return;
    }

    localStorage.removeItem('order');
    localStorage.removeItem('favprice');
    if (drinkType.selectedIndex == 0 || drinkType.selectedIndex == 1 || drinkType.selectedIndex == 2 ) {
        orderCurrent = `${drinkSize.value} ${drinkType.value} ${drinkMilk.value} and ${drinkExtras.value}` 
    } else if (drinkType.selectedIndex == 0 || drinkType.selectedIndex == 1 || drinkType.selectedIndex == 2 && drinkExtras.selectedIndex == 2) {
        orderCurrent = `${drinkSize.value} ${drinkType.value} ${drinkMilk.value} and ${drinkShots.value} ${drinkExtras.value}` 
    } else if (drinkType.selectedIndex == 3 || drinkType.selectedIndex == 4 && drinkExtras.selectedIndex == 2) {
        orderCurrent = `${drinkSize.value} ${drinkType.value} and ${drinkShots.value} ${drinkExtras.value}`
    } else if (drinkType.selected == 3 || drinkType.selectedIndex == 4) {
        orderCurrent = `${drinkSize.value} ${drinkType.value} and ${drinkExtras.value}`
    }
    
    localStorage.setItem('favprice', parseFloat(price));
    localStorage.setItem('order', orderCurrent);
    alert("Favourite has been set");
    console.log(orderCurrent)
}

function orderFavourite() { 
    let pricefav = parseFloat(localStorage.getItem('favprice'));
    let orderfav = localStorage.getItem('order');

    console.log(orderfav);

    alert(`Current favourite is £${pricefav} and the order is ${orderfav}`);

    totalprice = totalprice + pricefav;

    totalField.innerHTML = `Price of total order: £${totalprice}`;
    orderField.innerHTML += `<br> ${orderfav}`;
}
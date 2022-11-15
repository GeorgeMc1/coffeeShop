const formatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
});
class till {
    constructor(name) {
        this.name = name;
        this.totalCost = 0;
    }
    welcome() {
        welcome.innerHTML = `Welcome to ${this.name}!`;
        return this;
    }
    addItem(drink, price) {
        this.totalCost += price;
        total.innerHTML = formatter.format(this.totalCost);
        let p = document.createElement("p");
        order.appendChild(p);
        p.outerHTML = (`<p class="item">${drink}: ${formatter.format(price)}</p>`);
        this.addListener(price);
        return this;
    }
    finishOrder() {
        order.innerHTML = "";
        this.totalCost = 0;
        total.innerHTML = formatter.format(this.totalCost);
        return this;
    }
    addListener(price) {
        let current = document.querySelectorAll(".item")[document.querySelectorAll(".item").length - 1];
        current.addEventListener("click", () => {
            current.remove();
            this.totalCost -= price;
            total.innerHTML = formatter.format(this.totalCost);
        });
    }
}
class customer {
    constructor(name, amount, shop) {
        this.name = name;
        this.amount = amount;
        this.shop = shop;
    }
    welcome() {
        currentCustomer.innerHTML = `${this.name}`
    }
    checkAmount() {
        if (this.amount >= this.shop.totalCost) {
            completed.innerHTML = "Order Completed";
            this.shop.finishOrder();
            setTimeout(() => {
                completed.innerHTML = "";
            }, 1000);
        } else {
            completed.innerHTML = "Order Failed";
        }
    }
}
let coffeeShop = new till("Coffee Shop");
coffeeShop.welcome();
let bob = new customer("Bob", 20, coffeeShop);
bob.welcome();

coffee.addEventListener("click", () => {
    coffeeShop.addItem("coffee", 2);
})
tea.addEventListener("click", () => {
    coffeeShop.addItem("tea", 1.5);
})
hotChocolate.addEventListener("click", () => {
    coffeeShop.addItem("hot chocolate", 2.50);
})
sandwich.addEventListener("click", () => {
    coffeeShop.addItem("sandwich", 3);
})
end.addEventListener("click", () => {
    coffeeShop.finishOrder();
})
checkout.addEventListener("click", () => {
    bob.checkAmount();
})
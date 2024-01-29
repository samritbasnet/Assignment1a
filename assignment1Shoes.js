const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    SHOE_TYPE: Symbol("shoe_type"),
    SIZE: Symbol("size"),
    COLOR: Symbol("color"),
    CLEANER: Symbol("cleaner"),
    ADD_MORE: Symbol("add_more"), // New state for adding more items
    CONFIRM_ORDER: Symbol("confirm_order") // New state for confirming the order
});

const SHOE_TYPES = Object.freeze({
    1: { name: "Sneakers", price: 1200 },
    2: { name: "Boots", price: 1500 }
});

module.exports = class ShoesOrder extends Order {
    constructor() {
        super();
        this.stateCur = OrderState.WELCOMING;
        this.selectedItems = []; // Array to store selected items
        this.subtotal = 0;
        this.taxRate = 0.13; // 13% tax rate
    }

    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SHOE_TYPE;
                aReturn.push("Welcome to our shoe store!");
                aReturn.push("What type of shoes would you like to order?");
                aReturn.push("1. Sneakers");
                aReturn.push("2. Boots");
                break;

            case OrderState.SHOE_TYPE:
                if (sInput in SHOE_TYPES) {
                    const selectedShoe = SHOE_TYPES[sInput];
                    this.selectedItems.push(selectedShoe);
                    this.subtotal += selectedShoe.price;
                    aReturn.push(`You've selected ${selectedShoe.name}.`);
                    aReturn.push("What size would you like?");
                    this.stateCur = OrderState.SIZE;
                } else {
                    aReturn.push("Invalid input. Please enter 1 for Sneakers or 2 for Boots.");
                }
                break;

            case OrderState.SIZE:
                // Handle size input here
                // Assuming the user will provide the size input
                aReturn.push("What color would you like?");
                this.stateCur = OrderState.COLOR;
                break;

            case OrderState.COLOR:
                // Handle color input here
                // Assuming the user will provide the color input
                aReturn.push("Would you like to add shoe cleaner to your order? (Type 'yes' or 'no')");
                this.stateCur = OrderState.CLEANER;
                break;

            case OrderState.CLEANER:
                // Handle cleaner input here
                // Assuming the user will provide the cleaner input
                aReturn.push("Would you like to add more items to your order? (Type 'yes' or 'no')");
                this.stateCur = OrderState.ADD_MORE;
                break;

            case OrderState.ADD_MORE:
                if (sInput.toLowerCase() === "yes") {
                    this.stateCur = OrderState.SHOE_TYPE;
                    aReturn.push("Let's add more items to your order!");
                } else if (sInput.toLowerCase() === "no") {
                    this.stateCur = OrderState.CONFIRM_ORDER;
                    aReturn.push("Thank you for your order!");
                    this.displayOrderSummary(aReturn);
                } else {
                    aReturn.push("Invalid input. Please type 'yes' or 'no'.");
                }
                break;

            default:
                aReturn.push("Invalid state.");
                break;
        }
        return aReturn;
    }

    displayOrderSummary(aReturn) {
        aReturn.push("Your order summary:");
        this.selectedItems.forEach(item => {
            aReturn.push(`${item.name}: $${item.price}`);
        });

        // Calculate tax and total amount
        const taxAmount = this.subtotal * this.taxRate;
        const totalAmount = this.subtotal + taxAmount;

        aReturn.push(`Subtotal: $${this.subtotal.toFixed(2)}`);
        aReturn.push(`Tax (13%): $${taxAmount.toFixed(2)}`);
        aReturn.push(`Total amount: $${totalAmount.toFixed(2)}`);

        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
    }
};

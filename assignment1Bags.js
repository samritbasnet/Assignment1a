const Order = require("./assignment1Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SHOE_TYPE: Symbol("shoe_type"),
  SIZE: Symbol("size"),
  COLOR: Symbol("color"),
  CLEANER: Symbol("cleaner"),
});

const SHOE_TYPES = Object.freeze({
  1: { name: "Sneakers", price: 1200 },
  2: { name: "Boots", price: 1500 },
});

module.exports = class ShoesOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.shoeType = "";
    this.size = "";
    this.color = "";
    this.cleaner = "";
    this.item = "shoes";
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
          this.shoeType = selectedShoe.name;
          this.total += selectedShoe.price;
          this.stateCur = OrderState.SIZE;
          aReturn.push(
            `Great choice! What size ${this.shoeType} would you like?`
          );
        } else {
          aReturn.push(
            "Invalid input. Please enter 1 for Sneakers or 2 for Boots."
          );
        }
        break;

      case OrderState.SIZE:
        this.size = sInput;
        this.stateCur = OrderState.COLOR;
        aReturn.push("What color would you like?");
        break;

      case OrderState.COLOR:
        this.color = sInput;
        this.stateCur = OrderState.CLEANER;
        aReturn.push(
          "Would you like to add shoe cleaner to your order? (Type 'yes' or 'no')"
        );
        break;

      case OrderState.CLEANER:
        if (sInput.toLowerCase() === "yes") {
          this.cleaner = "shoe cleaner";
          this.total += 20; // Assuming shoe cleaner costs $20
        }
        this.isDone(true);
        aReturn.push("Thank you for your order!");
        aReturn.push(
          `You've ordered a pair of ${this.size} ${this.color} ${this.shoeType}.`
        );
        if (this.cleaner) {
          aReturn.push(`You've added shoe cleaner to your order.`);
        }
        aReturn.push(`Total amount: $${this.total}`);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        break;

      default:
        aReturn.push("Invalid state.");
        break;
    }
    return aReturn;
  }
};

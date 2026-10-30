//without

interface PaymentMethod {
    pay(amount: number): void;
}

class UpiPayment implements PaymentMethod {
    pay(amount: number): void {
        console.log(`Paid ₹${amount} using UPI`);
    }
}

class CardPayment implements PaymentMethod {
    pay(amount: number): void {
        console.log(`Paid ₹${amount} using Card`);
    }
}

// class CheckoutService {
//     checkout(type: string, amount: number): void {
//         let payment: PaymentMethod;

//         if (type === "upi") {
//             payment = new UpiPayment();
//         } else if (type === "card") {
//             payment = new CardPayment();
//         } else {
//             throw new Error("Invalid payment type");
//         }

//         payment.pay(amount);
//     }
// }

//if we add a new payment method we have to modify the CheckoutService class which violates the open/closed principle

class PaymentFactory {
    static create(type: string) {
        switch (type) {
            case "upi":
                return new UpiPayment()

            case "card":
                return new CardPayment();

            default:
                throw new Error("Invalid payment type");
        }

    }
}

class CheckoutService {
    checkout(type: string, amount: number): void {
        const payment = PaymentFactory.create(type);
        payment.pay(amount);
    }

}

const checkoutService = new CheckoutService();

checkoutService.checkout("upi", 1000);
checkoutService.checkout("card", 2000);
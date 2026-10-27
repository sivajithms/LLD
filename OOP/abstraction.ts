//things works but we dont know how;

function dummypay(): Promise<boolean> {
    const success = Math.random() >= 0.5;

    return new Promise(resolve => {
        setTimeout(() => resolve(success), 1000)
    });
}

interface PaymentMethod {
    methodName: string;
    pay(amount: number): Promise<boolean>;
}


class UpiPayment implements PaymentMethod {
    methodName: string;
    constructor(name: string) {
        this.methodName = name;
    }
    async pay(amount: number): Promise<boolean> {
        console.log(`Processing UPI payment: ₹${amount}`);

        const success = await dummypay();
        return success;
    }
}

class CardPayment implements PaymentMethod {
    methodName: string;
    constructor(name: string) {
        this.methodName = name;
    }
    async pay(amount: number): Promise<boolean> {
        console.log(`Processing card payment: ₹${amount}`);
        const success = await dummypay();
        return success;
    }
}

class CheckoutService {

    async checkout(method: PaymentMethod, amount: number): Promise<void> {

        if (amount <= 0) throw new Error("invalid payment amount");

        const done = await method.pay(amount);

        if (done) console.log(`${method.methodName}: payment successful`);
        else console.log(`${method.methodName}: payment failed`);

    }
}



const upi = new UpiPayment("UPI");
const card = new CardPayment("Credit Card");

const checkout = new CheckoutService();

checkout.checkout(upi, 5000);
checkout.checkout(card, 10);

export { };

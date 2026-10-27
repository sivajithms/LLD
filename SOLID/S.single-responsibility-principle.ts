// class Order {
//     calculateTotal(): number {
//         return 1000;
//     }

//     saveToDatabase(): void {
//         console.log("Saving order");
//     }

//     sendEmail(): void {
//         console.log("Sending email");
//     }
// }

//bad design

//one class should only handle one responsibility

interface Product {
    name: string
    price: number
}


class Cart {
    private products: Product[] = [];

    getProducts(): Product[] {
        return this.products;
    }

    addProduct(product: Product) {
        this.products.push(product);
    }

    getTotal(): number {
        return this.products.reduce((acc, product) => acc + product.price, 0);
    }
}

class CartPrinter{
    private cart: Cart;

    constructor(cart: Cart) {
        this.cart = cart;
    }

    printInvoice(): void {
        console.log('printing products');
        this.cart.getProducts().forEach(product => {
            console.log(`- ${product.name}: $${product.price}`);
        });
        console.log(`Total: $${this.cart.getTotal()}`);
    }
}

class CartDB {
    private cart: Cart;

    constructor(cart: Cart) {
        this.cart = cart;
    }

    saveCartToDB(): void{
        console.log('saving....');
        
    }
}

const cart = new Cart();

cart.addProduct({ name: 'laptop', price: 75000 });
cart.addProduct({ name: 'mobile', price: 55000 });

const cartPrinter = new CartPrinter(cart);
const cartDB = new CartDB(cart);

cartPrinter.printInvoice();
cartDB.saveCartToDB();
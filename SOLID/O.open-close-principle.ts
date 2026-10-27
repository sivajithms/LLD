//if we have to add a new feature we cannot modify an existing function 

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

class CartPrinter {
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

abstract class CartDB { //we can also do this with interface, but here we used abstraction, inheritance and polymorphism
    private cart: Cart;

    constructor(cart: Cart) {
        this.cart = cart;
    }

    abstract save(): void;
}


class CartDBSQL extends CartDB {
    save(): void {
        console.log('saving.... to SQL');
    }
}

class CartDBMongoDB extends CartDB {
    save(): void {
        console.log('saving.... to mongodb');
    }
}

const cart = new Cart();

cart.addProduct({ name: 'laptop', price: 75000 });
cart.addProduct({ name: 'mobile', price: 55000 });

const cartPrinter = new CartPrinter(cart);

const cartDBSql = new CartDBSQL(cart);
const cartDBMongoDB = new CartDBMongoDB(cart);

cartPrinter.printInvoice();

cartDBSql.save();
cartDBMongoDB.save();

export { };
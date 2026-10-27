class Vehicle {
    public brand: string
    constructor(brand: string) {
        this.brand = brand
     }


    start(): void {
        console.log(`${this.brand} started`);
    }

    stop(): void {
        console.log(`${this.brand} stopped`);
    }
}

class Car extends Vehicle {
    constructor(brand: string) {
        super(brand);
    }
    drive(): void {
        console.log(`${this.brand} is driving`);
    }
}

class Bike extends Vehicle {
    ride(): void {
        console.log(`${this.brand} is riding`);
    }
}

const cb = new Bike("Honda")
cb.start()
cb.ride()
cb.stop()

export { };
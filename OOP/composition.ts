//a class can use other class property

class Engine {
    private type: string;

    constructor(type: string) {
        this.type = type;
    }

    start() {
        console.log(this.type, ' turned on');
        
    }
}

class Car {
    private engine: Engine;
    private brand: string;;
    private type: string;

    constructor(engineType: string, brand: string, type: string) {
        this.engine = new Engine(engineType);
        this.brand = brand;
        this.type = type;
    }

    start() {
        this.engine.start();
        console.log(this.brand, " ", this.type, " starts");
        
    }


}

const car = new Car("v8", "Toyota", "Camry");

car.start()
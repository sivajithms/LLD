class Car {
    brand: string;
    speed: number;

    constructor(brand:string, speed:number) {
        this.brand = brand;
        this.speed = speed;
    }

    accelerate(): number{
        return this.speed += 10;
    }

    decelerate(): number {
        return this.speed -= 10;
    }

    display(): void {
        console.log(`Brand: ${this.brand}, Speed: ${this.speed}`);
    }
}

const honda = new Car("Honda", 70);
const bmw = new Car("BMW", 100);

console.log(honda.display());
console.log(bmw.display());

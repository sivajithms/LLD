// multiple small interfaces are better than one big general purpose interface

//clients should not be forced to implement all methods of an interface if they don't need them


interface TwoDShape {
    area(): number;
}

interface ThreeDShape {
    area(): number;
    volume(): number;
}

class Square implements TwoDShape {
    private side: number;

    constructor(side: number) {
        this.side = side;
    }

    area(): number {
        return this.side ** 2;
    }
}

class Cube implements ThreeDShape {
    private side: number;

    constructor(side: number) {
        this.side = side;
    }

    area(): number {
        return 6 * (this.side ** 2);
    }

    volume(): number {
        return this.side ** 3;
    }
}

function main() {
    const square = new Square(5);
    console.log("Square area:", square.area());

    const cube = new Cube(5);
    console.log("Cube area:", cube.area());
    console.log("Cube volume:", cube.volume());
}

main();
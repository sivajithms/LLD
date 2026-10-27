// creates global methods

class Dog{
    name: string;

    constructor(name: string) {
        this.name = name
    }

    bark(): void {
        console.log(`${this.name} says Woof!`);
    }

    static species(): void {
        console.log("Dogs are Canis familiaris");
    }

}

const dog1 = new Dog("Bruno");
const dog2 = new Dog("Max");

// Instance methods
dog1.bark(); // Bruno says Woof!
dog2.bark(); // Max says Woof!

// Static method
Dog.species(); // Dogs are Canis familiaris

export {};
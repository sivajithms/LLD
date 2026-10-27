interface Animal {
    sound(): void;
}

class Dog implements Animal {
    sound(): void {
        console.log("Woof");
    }
}

class Cat implements Animal {
    sound(): void {
        console.log("Meow");
    }
}

function makeSound(animal: Animal): void {
    animal.sound();
}

makeSound(new Dog()); // Woof
makeSound(new Cat()); // Meow

export {};
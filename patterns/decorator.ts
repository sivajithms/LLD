//lets you add or remove extra behavior to an object dynamically by wrapping it, without modifying its original class.

abstract class Character {
    abstract getAbilities(): void;
}

class Mario extends Character {
    private name: string = "Mario";

    getAbilities() {
        return this.name;
    }
}

class WithHeightUp implements Character {
    private c: Character;
    constructor(c: Character) {        
        this.c = c;
    }

    getAbilities() {
        return this.c.getAbilities() + ' With height up';
    }
}

class WithGun implements Character {
    private c: Character;
    constructor(c: Character) {
        this.c = c;
    }

    getAbilities() {
        return this.c.getAbilities() + ' With Gun';
    }
}

class WithStarPowerUp implements Character {
    private c: Character;
    constructor(c: Character) {
        this.c = c;
    }

    getAbilities() {
        return this.c.getAbilities() + ' With star powerup (limited time)';
    }
}

let mario: Character = new Mario();

console.log(mario.getAbilities());

mario = new WithHeightUp(mario);

console.log(mario.getAbilities());

mario = new WithGun(mario);

console.log(mario.getAbilities());

mario = new WithStarPowerUp(mario);

console.log(mario.getAbilities());

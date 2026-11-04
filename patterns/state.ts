interface MarioState {
    jump(): void;
}

class NormalState implements MarioState {
    jump(): void {
        console.log("Normal jump");
    }
}

class PoweredState implements MarioState {
    jump(): void {
        console.log("High jump!");
    }
}

class DeadState implements MarioState {
    jump(): void {
        console.log("Mario cannot jump");
    }
}

class Mario {
    constructor(private state: MarioState) { }

    setState(state: MarioState): void {
        this.state = state;
    }

    jump(): void {
        this.state.jump();
    }
}

const mario = new Mario(new NormalState());

mario.jump();

mario.setState(new PoweredState());
mario.jump();

mario.setState(new DeadState());
mario.jump(); 

export {};
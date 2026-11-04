interface Command {
    execute(): void;
}

class Mario {
    jump(): void {
        console.log("Mario jumped!");
    }

    moveRight(): void {
        console.log("Mario moved right!");
    }
}

class JumpCommand implements Command {
    constructor(private mario: Mario) { }

    execute(): void {
        this.mario.jump();
    }
}

class MoveRightCommand implements Command {
    constructor(private mario: Mario) { }

    execute(): void {
        this.mario.moveRight();
    }
}

class GameController {
    pressButton(command: Command): void {
        command.execute();
    }
}

const mario = new Mario();

const jump = new JumpCommand(mario);
const moveRight = new MoveRightCommand(mario);

const controller = new GameController();

controller.pressButton(jump);      // Mario jumped!
controller.pressButton(moveRight); // Mario moved right!


export {};
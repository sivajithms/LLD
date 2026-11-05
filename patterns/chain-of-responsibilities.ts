interface SupportHandler {
    setNext(handler: SupportHandler): SupportHandler;
    handle(severity: number): void;
}

abstract class BaseSupportHandler implements SupportHandler {
    private nextHandler?: SupportHandler;

    setNext(handler: SupportHandler): SupportHandler {
        this.nextHandler = handler;
        return this.nextHandler;
    }

    handle(severity: number): void {
        if(this.nextHandler) this.nextHandler.handle(severity)
        else console.log('No further handler');
    }
}

class Level1Handler extends BaseSupportHandler {

    handle(severity: number): void {
        if(severity <= 1) {
            console.log('handled in level 1');
            return;
        }

        super.handle(severity);
    }
}

class Level2Handler extends BaseSupportHandler {

    handle(severity: number): void {
        if (severity <= 2) {
            console.log('handled in level 2');
            return
        }

        super.handle(severity);
    }
}


class Level3Handler extends BaseSupportHandler {

    handle(severity: number): void {
        if (severity <= 3) {
            console.log('handled in level 3');
            return
        }

        super.handle(severity);
    }
}

const level = new Level1Handler();
const leve2 = new Level2Handler();
const leve3 = new Level3Handler();

level.setNext(leve2).setNext(leve3);

level.handle(3);
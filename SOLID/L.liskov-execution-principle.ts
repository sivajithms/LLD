//if a parent has 2 abstract methods, the child should implement both

//suppose there is a abstract bankAccount class, and child classes as savings, current and fixed,
//where we can implement withdraw for savings and current and not on fixed, that violates liskov,
//we cant handle it from client side if fixed thrown exception
//so we implement multilevel inheritance


abstract class DepositOnlyAccount {
    abstract deposit(amount: number): void;
}

abstract class WithdrawableAccount extends DepositOnlyAccount {
    abstract withdraw(amount: number): void;
}


class SavingsAccount extends WithdrawableAccount {
    private _balance: number;

    constructor(initialBalance: number) {
        super();
        this._balance = initialBalance;
    }

    private set balance(value: number) {
        this._balance = value;
        console.log("SavingsAccount Balance changed:", this._balance);
    }

    private get balance(): number {
        return this._balance;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
        } else {
            throw new Error("Insufficient funds");
        }
    }
}

class CurrentAccount extends WithdrawableAccount {
    private balance: number;

    constructor(initialBalance: number) {
        super();
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        this.balance += amount;
        console.log("deposited to current account, balance: ", this.balance);
    }

    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log("withdrawn from current account, balance: ", this.balance);
        } else {
            throw new Error("Insufficient funds");
        }
    }
}

class FixedAccount extends DepositOnlyAccount {
    private balance: number;

    constructor(initialBalance: number) {
        super();
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        this.balance += amount;
        console.log("deposited to fixed account, balance: ", this.balance);
    }
}


class BankAccounts {
    private withdrawableAccounts: WithdrawableAccount[];
    private depositOnlyAccounts: DepositOnlyAccount[];

    constructor(withdrawableAccounts: WithdrawableAccount[], depositOnlyAccounts: DepositOnlyAccount[]) {
        this.withdrawableAccounts = withdrawableAccounts;
        this.depositOnlyAccounts = depositOnlyAccounts;
    }

    processTransactions(): void {
        for(const acc of this.withdrawableAccounts) {
            try {
                acc.deposit(1000);
                acc.withdraw(500);
            } catch (error: unknown) {
                console.log((error as Error).message);
            }
        }

        for(const acc of this.depositOnlyAccounts) {
            try {
                acc.deposit(1000);
            } catch (error: unknown) {
                console.log((error as Error).message);
            }
        }
    }
}

function main() {
    const bankAccount = new BankAccounts([new SavingsAccount(1000), new CurrentAccount(500)], [new FixedAccount(2000)]);
    bankAccount.processTransactions();
}

main()

export {}
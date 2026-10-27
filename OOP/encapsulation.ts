// class BankAccount {
//     balance: number = 0;
// }

// const account = new BankAccount();

// account.balance = -5000; // Allowed!

// we cannot change account balance directly thats agains the business logic

class BankAccount {
    private balance: number = 0;

    getBalance(): number {
        return this.balance;
    }

    deposit(amount: number): void {
        if(amount <= 0) {
            throw new Error("Invalid deposit amount");
        }
        this.balance += amount;
    }

}

const account = new BankAccount();
account.deposit(76);
account.deposit(34);
console.log(account.getBalance());


export { };

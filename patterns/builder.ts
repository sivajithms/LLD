class User {
    constructor(
        public name: string,
        public age: number,
        public email: string,
        public phone?: string,
        public address?: string,
        public isPremium?: boolean
    ) { }
}

// const user = new User(
//     "Siva",
//     23,
//     "siva@gmail.com",   // bad approach 
//     undefined,
//     "Kochi",
//     true
// );

class UserBuilder {
    private name!: string;
    private age!: number;
    private email!: string;
    private phone?: string;
    private address?: string;
    private isPremium = false;

    setName(name: string): this {
        this.name = name;
        return this;
    }

    setAge(age: number): this {
        this.age = age;
        return this;
    }

    setEmail(email: string): this {
        this.email = email;
        return this;
    }

    setPhone(phone: string): this {
        this.phone = phone;
        return this;
    }

    setAddress(address: string): this {
        this.address = address;
        return this;
    }

    setPremium(value: boolean): this {
        this.isPremium = value;
        return this;
    }

    build(): User {
        if (!this.name || !this.email || !this.age) {
            throw new Error("Name, age and email are required");
        }

        return new User(
            this.name,
            this.age,
            this.email,
            this.phone,
            this.address,
            this.isPremium
        );
    }
}

const user = new UserBuilder()
    .setName("Siva")
    .setAge(23)
    .setPhone("1234567890")
    .setEmail("sivajith@gmail.com")
    .setAddress("Kochi")
    .setPremium(true)
    .build();



console.log(user);

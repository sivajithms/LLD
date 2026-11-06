interface UserRepository {
    findById(id: string): Promise<User | null>;
    save(user: User): Promise<void>;
}

type User = {
    id: string;
    name: string;
};

class InMemoryUserRepository implements UserRepository {
    private users = new Map<string, User>();

    async findById(id: string): Promise<User | null> {
        return this.users.get(id) ?? null;
    }

    async save(user: User): Promise<void> {
        this.users.set(user.id, user);
    }
}

class UserService {
    constructor(private userRepository: UserRepository) { }

    async register(user: User): Promise<void> {
        await this.userRepository.save(user);
    }

    async getUser(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}

(async () => {

    const repository = new InMemoryUserRepository();
    const service = new UserService(repository);

    await service.register({ id: "1", name: "Siva" });

    console.log(await service.getUser("1"));

})()
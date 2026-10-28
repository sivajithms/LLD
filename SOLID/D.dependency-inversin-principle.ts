//high level modules should not be dependent on low level modules.
//  Both should depend on abstractions.

interface DatabaseOperations {
    save(data: any): void;
}

class DB {
    private db: DatabaseOperations;

    constructor(db: DatabaseOperations) {
        this.db = db;
    }

    save(data: any): void {
        this.db.save(data);
    }
}

class DBSQL implements DatabaseOperations {
    save(data: any): void {
        console.log('saving.... ', JSON.stringify(data), 'to SQL');
    }
}

class DBMongoDB implements DatabaseOperations {
    save(data: any): void {
        console.log('saving.... ', JSON.stringify(data), 'to MongoDB');
    }
}

function main() {
    const dbSQL = new DB(new DBSQL());
    const dbMongoDB = new DB(new DBMongoDB());

    dbSQL.save({ name: 'sivajith', age: 25 });
    dbMongoDB.save({ name: 'sivajith', age: 25 });
}

main();

export { };
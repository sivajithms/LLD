import fs from "fs";
import { Persistence } from "./Persistence";
import { DocumentO } from "../document/Document";

class FilePersistence extends Persistence {
    private filePath: string;

    constructor(filePath: string) {
        super();
        this.filePath = filePath;
    }

    saveDocument(document: DocumentO): void {
        fs.writeFileSync(
            this.filePath,
            JSON.stringify(document, null, 2),
            "utf-8"
        );
    }

}

export { FilePersistence };
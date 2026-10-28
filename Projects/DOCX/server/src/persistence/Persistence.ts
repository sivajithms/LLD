import { DocumentO } from "../document/Document";

abstract class Persistence {
    abstract saveDocument(document: DocumentO): void
}

export { Persistence };
import { DocumentO } from "../document/Document";

abstract class Persistence {
    abstract loadDocument(): DocumentO;
    abstract saveDocument(document: DocumentO): void
}

export { Persistence };
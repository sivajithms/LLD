import { docElement } from "../types";

abstract class DocumentElement {
    abstract render(): docElement;
}

export { DocumentElement };
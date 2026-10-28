import { DocumentElement } from "./elements/DocumentElement";

class DocumentO {
    private elements: DocumentElement[];

    constructor() {
        this.elements = [];
    }

    addElement(element: DocumentElement): void {
        this.elements.push(element);
    }


    render(): docElement[] {
        return this.elements.map(element => element.render());
    }

}

export { DocumentO };
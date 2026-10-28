type docElement =
    | {
        type: "text";
        content: { text: string };
    }
    | {
        type: "image";
        content: { filePath: string };
    }

abstract class DocumentElement {
    abstract render(): docElement;
}

class TextElement extends DocumentElement {
    private textElement: docElement;

    constructor(text: string) {
        super();
        this.textElement = {
            type: "text",
            content: {
                text: text
            }
        }
    }

    render(): docElement {
        return this.textElement;
    }

}

class ImageElement extends DocumentElement {
    private imageElement: docElement;

    constructor(filePath: string) {
        super();
        this.imageElement = {
            type: "image",
            content: {
                filePath: filePath
            }
        }
    }

    render(): docElement {
        return this.imageElement;
    }

}

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

abstract class Persistence {
    abstract saveDocument(document: DocumentO): void
}

import fs from "fs";

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

class DocumetEditor {
    private document: DocumentO;
    private fileStorage: Persistence;
    private renderedDocument: docElement[];

    constructor() {
        this.document = new DocumentO();
        this.fileStorage = new FilePersistence("document.json");
        this.renderedDocument = [];
    }

    addText(text: string): void {
        const textElement = new TextElement(text);
        this.document.addElement(textElement);
    }

    addImage(filePath: string): void {
        const imageElement = new ImageElement(filePath);
        this.document.addElement(imageElement);
    }

    saveDocument(): void {
        this.fileStorage.saveDocument(this.document);
    }

    renderDocument(): docElement[] {
        if (!this.renderedDocument.length)
            this.renderedDocument = this.document.render();
        return this.renderedDocument;
    }

}
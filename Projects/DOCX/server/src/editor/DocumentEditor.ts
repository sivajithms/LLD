import { DocumentO } from "../document/Document";
import { ImageElement } from "../document/elements/ImageElement";
import { TextElement } from "../document/elements/TextElement";
import { Persistence } from "../persistence/Persistence";

class DocumetEditor {
    private document: DocumentO;
    private fileStorage: Persistence;

    constructor(document: DocumentO, fileStorage: Persistence) {
        this.document = document;
        this.fileStorage = fileStorage;
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
        return this.document.render();
    }

}

export { DocumetEditor };

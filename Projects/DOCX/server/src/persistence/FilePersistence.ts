import fs from "fs";
import { Persistence } from "./Persistence";
import { DocumentO } from "../document/Document";
import { TextElement } from "../document/elements/TextElement";
import { ImageElement } from "../document/elements/ImageElement";

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

    loadDocument(): DocumentO {
        if (!fs.existsSync(this.filePath)) {
            throw new Error(`File not found: ${this.filePath}`);
        }

        const data = fs.readFileSync(this.filePath, "utf-8");
        const parsedData = JSON.parse(data);
        const document = new DocumentO();   


        for (const elementData of parsedData.elements) {
            if (elementData.textElement) {
                document.addElement(
                    new TextElement(elementData.textElement.content.text)
                );
            } else if (elementData.imageElement) {
                document.addElement(
                    new ImageElement(elementData.imageElement.content.filePath)
                );
            }
        }

        return document;
    }

}

export { FilePersistence };
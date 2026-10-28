import { docElement } from "../types";
import { DocumentElement } from "./DocumentElement";

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

export { ImageElement };
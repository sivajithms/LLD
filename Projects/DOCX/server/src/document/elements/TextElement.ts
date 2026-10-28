import { DocumentElement } from "./DocumentElement";

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

export { TextElement };
import { DocumentO } from "./document/Document";
import { DocumetEditor } from "./editor/DocumentEditor";
import { FilePersistence } from "./persistence/FilePersistence";

const document = new DocumentO();
const fileStorage = new FilePersistence("document.json");
const editor = new DocumetEditor(document, fileStorage);

export { editor };
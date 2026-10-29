import { DocumentO } from "./document/Document";
import { DocumetEditor } from "./editor/DocumentEditor";
import { FilePersistence } from "./persistence/FilePersistence";

const fileStorage = new FilePersistence("document.json");
const document = fileStorage.loadDocument() ?? new DocumentO();
const editor = new DocumetEditor(document, fileStorage);

export { editor };


//test cicd
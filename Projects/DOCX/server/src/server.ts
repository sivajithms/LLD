
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import  express  from "express";
import path  from "node:path";
import { docElement } from "./document/types";
import { editor } from ".";

const app = express();
const PORT = 3000;
const clientDirectory = path.join(__dirname, "../../client");
const imageDirectory = path.join(clientDirectory, "assets", "images");
const imageExtensions: Record<string, string> = {
    "image/avif": ".avif",
    "image/bmp": ".bmp",
    "image/gif": ".gif",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp"
};


app.use(express.json());

// Serve the frontend from the client directory next to the server project.
app.use(express.static(clientDirectory));

app.get("/", (req, res) => {
    res.sendFile(path.join(clientDirectory, "index.html"));
});

app.post(
    "/api/images",
    express.raw({ type: "image/*", limit: "10mb" }),
    async (req, res) => {
        const contentType = req.headers["content-type"]?.split(";")[0].toLowerCase();
        const extension = contentType ? imageExtensions[contentType] : undefined;
        const image = req.body;

        if (!extension) {
            res.status(415).json({ error: "Unsupported image format." });
            return;
        }

        if (!Buffer.isBuffer(image) || image.length === 0) {
            res.status(400).json({ error: "An image file is required." });
            return;
        }

        try {
            await mkdir(imageDirectory, { recursive: true });
            const fileName = `${randomUUID()}${extension}`;
            await writeFile(path.join(imageDirectory, fileName), image, { flag: "wx" });

            res.status(201).json({
                filePath: path.posix.join("assets", "images", fileName)
            });
        } catch (error) {
            console.error("Failed to save image:", error);
            res.status(500).json({ error: "Failed to save image." });
        }
    }
);

// Save a document.
app.post("/api/documents", async (req, res) => {
    try {
        console.log("Received request to save document:", req.body.data);
        
        const document: docElement = req.body.data;

        if (document.type === "text") {
            editor.addText(document.content.text);
        } else if (document.type === "image") {
            editor.addImage(document.content.filePath);
        }

        editor.saveDocument();

        res.status(201).json({
            message: "Document saved successfully"
        });
    } catch (error) {
        console.error("Failed to save document:", error);

        res.status(500).json({
            error: "Failed to save document"
        });
    }
});

app.get("/api/documents", async (req, res) => {
    try {
        const renderedDocument: docElement[] = editor.renderDocument();     

        res.status(200).json({
            data: renderedDocument
        });
    } catch (error) {
        console.error("Failed to render document:", error); 

        res.status(500).json({
            error: "Failed to render document"
        });
    }

})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

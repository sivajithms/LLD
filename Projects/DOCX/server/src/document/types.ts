type docElement =
    | {
        type: "text";
        content: { text: string };
    }
    | {
        type: "image";
        content: { filePath: string };
    }

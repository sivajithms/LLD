const baseurl = "http://localhost:3000/";
const textForm = document.querySelector("#text-form");
const textInput = document.querySelector("#text-input");
const imageForm = document.querySelector("#image-form");
const imageInput = document.querySelector("#image-input");
const imageFileName = document.querySelector("#image-file-name");
const addImageButton = document.querySelector("#add-image-button");
const documentPage = document.querySelector("#document-page");
const emptyState = document.querySelector("#empty-state");
const pageCount = document.querySelector("#page-count");
const statusMessage = document.querySelector("#status-message");

async function displayAll() {
  try {
    const response = await fetch(`${baseurl}api/documents`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Failed to load document.");

    documentPage.querySelectorAll(".document-block").forEach((block) => block.remove());
    for (const element of result.data) {
      const content = document.createElement(element.type === "text" ? "p" : "img");
      content.className = element.type === "text" ? "document-text" : "document-image";
      if (element.type === "text") content.textContent = element.content.text;
      else {
        content.src = new URL(element.content.filePath, baseurl);
        content.alt = "Document image";
      }

      const block = document.createElement("section");
      block.className = "document-block";
      block.append(content);
      documentPage.append(block);
    }

    emptyState.hidden = result.data.length > 0;
    pageCount.textContent = `${result.data.length} ${result.data.length === 1 ? "item" : "items"}`;
  } catch (error) {
    statusMessage.textContent = error.message;
    statusMessage.classList.add("status-error");
  }
}

async function addText(event) {
  event.preventDefault();
  const text = textInput.value.trim();
  if (!text) return;

  try {
    const response = await fetch(`${baseurl}api/documents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { type: "text", content: { text } } })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Failed to add text.");
    textInput.value = "";
    statusMessage.textContent = "Text added to the document.";
    statusMessage.classList.remove("status-error");
    await displayAll();
  } catch (error) {
    statusMessage.textContent = error.message;
    statusMessage.classList.add("status-error");
  }
}

async function addImage(event) {
  event.preventDefault();
  const file = imageInput.files[0];
  if (!file || !file.type.startsWith("image/")) return;

  addImageButton.disabled = true;
  try {
    const upload = await fetch(`${baseurl}api/images`, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file
    });
    const { filePath, error: uploadError } = await upload.json();
    if (!upload.ok) throw new Error(uploadError || "Failed to upload image.");

    const response = await fetch(`${baseurl}api/documents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { type: "image", content: { filePath } } })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Failed to add image.");

    imageInput.value = "";
    imageFileName.textContent = "Choose an image";
    statusMessage.textContent = `Image saved to ${filePath}.`;
    statusMessage.classList.remove("status-error");
    await displayAll();
  } catch (error) {
    statusMessage.textContent = error.message;
    statusMessage.classList.add("status-error");
  } finally {
    addImageButton.disabled = !imageInput.files.length;
  }
}

textForm.addEventListener("submit", addText);
imageForm.addEventListener("submit", addImage);
imageInput.addEventListener("change", () => {
  imageFileName.textContent = imageInput.files[0]?.name || "Choose an image";
  addImageButton.disabled = !imageInput.files.length;
});
displayAll();

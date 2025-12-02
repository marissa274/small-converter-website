const hexInput = document.getElementById("hexInput");
const mimeTypeSelect = document.getElementById("mimeType");
const fileNameInput = document.getElementById("fileName");

const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");

const previewImage = document.getElementById("previewImage");
const placeholder = document.getElementById("placeholder");
const downloadLink = document.getElementById("downloadLink");
const byteInfo = document.getElementById("byteInfo");
const errorText = document.getElementById("errorText");

let currentObjectUrl = null;

function normalizeHex(str) {
  return str.replace(/[^0-9a-fA-F]/g, "").toLowerCase();
}

function hexToBytes(hex) {
  const clean = normalizeHex(hex);

  if (clean.length === 0) {
    throw new Error("Aucun HEX détecté.");
  }

  if (clean.length % 2 !== 0) {
    throw new Error("HEX incomplet (nombre impair).");
  }

  const bytes = new Uint8Array(clean.length / 2);

  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16);
  }

  return bytes;
}

function resetPreview() {
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);

  previewImage.style.display = "none";
  previewImage.src = "";

  placeholder.style.display = "block";

  downloadLink.classList.remove("visible");
  byteInfo.textContent = "0 octet";

  errorText.textContent = "";
}

convertBtn.addEventListener("click", () => {
  try {
    const hex = hexInput.value.trim();
    const bytes = hexToBytes(hex);

    const mime = mimeTypeSelect.value;
    const blob = new Blob([bytes], { type: mime });

    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = URL.createObjectURL(blob);

    previewImage.src = currentObjectUrl;
    previewImage.style.display = "block";
    placeholder.style.display = "none";

    byteInfo.textContent = `${bytes.length} octets`;

    const baseName = fileNameInput.value || "image_depuis_hex";
    const extension = mime.split("/")[1];

    downloadLink.href = currentObjectUrl;
    downloadLink.download = `${baseName}.${extension}`;
    downloadLink.classList.add("visible");

    errorText.textContent = "";
  } catch (err) {
    resetPreview();
    errorText.textContent = err.message;
  }
});

clearBtn.addEventListener("click", () => {
  hexInput.value = "";
  fileNameInput.value = "";
  resetPreview();
});

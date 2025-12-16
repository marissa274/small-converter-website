
const logInput = document.getElementById("logInput");
const hexOutput = document.getElementById("hexOutput");
const extractBtn = document.getElementById("extractBtn");
const logError = document.getElementById("logError");


function extractHexFromLog() {
  try {
    const log = logInput.value;

   
    const regex = /value=([0-9A-Fa-f]+)/g;
    let match;
    let fullHex = "";

    while ((match = regex.exec(log)) !== null) {
      fullHex += match[1];
    }

    if (!fullHex) {
      logError.textContent = "Aucun HEX trouvé dans ton log.";
      return;
    }

   
    hexOutput.value = fullHex;

   
    const hexInput = document.getElementById("hexInput");
    if (hexInput) hexInput.value = fullHex;

    logError.textContent = "";

  } catch (e) {
    logError.textContent = "Erreur lors de l'extraction du HEX.";
  }
}


extractBtn.addEventListener("click", extractHexFromLog);

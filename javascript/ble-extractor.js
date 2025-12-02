// === LOG BLE → EXTRACTION HEX ===

// Sélecteurs des champs dédiés à l'extraction
const logInput = document.getElementById("logInput");
const hexOutput = document.getElementById("hexOutput");
const extractBtn = document.getElementById("extractBtn");
const logError = document.getElementById("logError");

// Fonction d'extraction du HEX
function extractHexFromLog() {
  try {
    const log = logInput.value;

    // Cherche toutes les séquences "value=XXXX"
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

    // Affiche le HEX extrait dans son champ
    hexOutput.value = fullHex;

    // Envoie automatiquement vers le champ HEX du convertisseur image
    const hexInput = document.getElementById("hexInput");
    if (hexInput) hexInput.value = fullHex;

    logError.textContent = "";

  } catch (e) {
    logError.textContent = "Erreur lors de l'extraction du HEX.";
  }
}

// Écouteur sur le bouton
extractBtn.addEventListener("click", extractHexFromLog);

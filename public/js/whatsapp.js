// =============================================
// Astha VMS – WhatsApp Utility
// Generates click-to-chat links with templates
// NO unofficial automation – official wa.me only
// =============================================

const WA_TEMPLATES = {

  // ── Birthday Templates ──────────────────────
  birthday_english: (name) =>
    `Dear ${name},\n\nAstha Charitable Trust (Astha Sneh Nu Ghar) wishes you a very Happy Birthday! \n\nMay this special day bring you immense joy, good health, and happiness. We are grateful for your association with our family.\n\nWith warm regards,\nTeam Astha Sneh Nu Ghar `,

  birthday_gujarati: (name) =>
    `પ્રિય ${name},\n\nઆસ્થા ચેરિટેબલ ટ્રસ્ટ (આસ્થા સ્નેહ નું ઘર) તરફથી આપને જન્મ દિવસની ખૂબ ખૂબ શુભકામનાઓ! \n\nભગવાન આપને સ્વાસ્થ્ય, સુખ અને સમૃદ્ધિ આપે. આપનો આ ખાસ દિવસ ખૂબ આનંદમય રહે.\n\nઆભાર,\nટીમ આસ્થા સ્નેહ નું ઘર `,

  // ── Follow-up Templates ──────────────────────
  followup_english: (name, purpose) =>
    `Dear ${name},\n\nThis is a follow-up message from Astha Charitable Trust (Astha Sneh Nu Ghar).\n\nWe wanted to check in regarding: ${purpose || "your recent visit with us"}.\n\nPlease feel free to reach out to us anytime. We are happy to assist you.\n\nWith warm regards,\nTeam Astha Sneh Nu Ghar`,

  followup_gujarati: (name, purpose) =>
    `પ્રિય ${name},\n\nઆ સંદેશ આસ્થા ચેરિટેબલ ટ્રસ્ટ (આસ્થા સ્નેહ નું ઘર) તરફથી છે.\n\nઆ વિષય અંગે આપની સાથે વાત કરવી હતી: ${purpose || "આપની અમારી સાથેની મુલાકાત"}.\n\nઆ સિવાય કંઈ પણ જરૂર હોય તો અમારો સંપર્ક કરો. અમે સહાય કરવા હંમેશા તૈયાર છીએ.\n\nઆભાર,\nટીમ આસ્થા સ્નેહ નું ઘર`,

  // ── General Message ─────────────────────────
  general_english: (name) =>
    `Dear ${name},\n\nGreetings from Astha Charitable Trust (Astha Sneh Nu Ghar).\n\nWe hope you are doing well. Please do not hesitate to contact us if you need any assistance.\n\nWith warm regards,\nTeam Astha`,

  general_gujarati: (name) =>
    `પ્રિય ${name},\n\nઆસ્થા ચેરિટેબલ ટ્રસ્ટ (આસ્થા સ્નેહ નું ઘર) તરફથી નમસ્કાર.\n\nઆશા છે આપ સ્વસ્થ અને ખુશ હશો. કોઈ પણ સહાય માટે અમારો સંપર્ક કરો.\n\nઆભાર,\nટીમ આસ્થા`,
};

/**
 * Build a wa.me click-to-chat URL
 * @param {string} phone - 10-digit Indian mobile
 * @param {string} message - pre-filled message
 * @returns {string} full WhatsApp URL
 */
function buildWhatsAppURL(phone, message) {
  const cleaned = phone.replace(/\D/g, "");
  const number  = cleaned.startsWith("91") ? cleaned : `91${cleaned}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Open WhatsApp with a given template
 * @param {string} phone
 * @param {string} templateKey - key in WA_TEMPLATES
 * @param {string} name - visitor name
 * @param {string} [extra] - optional extra param (e.g. purpose)
 */
function openWhatsApp(phone, templateKey, name, extra = "") {
  if (!phone) {
    alert("No WhatsApp/mobile number available for this visitor.");
    return;
  }
  const tpl = WA_TEMPLATES[templateKey];
  if (!tpl) { console.error("Unknown template:", templateKey); return; }
  const message = tpl(name, extra);
  window.open(buildWhatsAppURL(phone, message), "_blank");
}

/**
 * Show WhatsApp template picker modal
 * Returns chosen URL or null
 */
function showWAModal(phone, name, purpose = "", containerId = "waModalContainer") {
  // Remove existing modal if any
  const existing = document.getElementById("waPickerModal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "waPickerModal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal" style="max-width:480px;">
      <div class="modal-header">
        <h3>💬 Send WhatsApp Message</h3>
        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('waPickerModal').remove()">✕</button>
      </div>
      <div class="modal-body">
        <p style="margin-bottom:16px;">Choose a message template to send to <strong>${name}</strong>:</p>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <button class="btn btn-outline" style="justify-content:flex-start;text-align:left;"
            onclick="openWhatsApp('${phone}','birthday_english','${name}');document.getElementById('waPickerModal').remove()">
            🎂 Birthday Wish (English)
          </button>
          <button class="btn btn-outline" style="justify-content:flex-start;text-align:left;"
            onclick="openWhatsApp('${phone}','birthday_gujarati','${name}');document.getElementById('waPickerModal').remove()">
            🎂 Birthday Wish (ગુજરાતી)
          </button>
          <button class="btn btn-outline" style="justify-content:flex-start;text-align:left;"
            onclick="openWhatsApp('${phone}','followup_english','${name}','${purpose.replace(/'/g,"\\'")}');document.getElementById('waPickerModal').remove()">
            📋 Follow-up (English)
          </button>
          <button class="btn btn-outline" style="justify-content:flex-start;text-align:left;"
            onclick="openWhatsApp('${phone}','followup_gujarati','${name}','${purpose.replace(/'/g,"\\'")}');document.getElementById('waPickerModal').remove()">
            📋 Follow-up (ગુજરાતી)
          </button>
          <button class="btn btn-outline" style="justify-content:flex-start;text-align:left;"
            onclick="openWhatsApp('${phone}','general_english','${name}');document.getElementById('waPickerModal').remove()">
            💬 General Message (English)
          </button>
          <button class="btn btn-outline" style="justify-content:flex-start;text-align:left;"
            onclick="openWhatsApp('${phone}','general_gujarati','${name}');document.getElementById('waPickerModal').remove()">
            💬 General Message (ગુજરાતી)
          </button>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="document.getElementById('waPickerModal').remove()">Cancel</button>
      </div>
    </div>`;

  document.body.appendChild(modal);
}
const input = document.getElementById("mediaUrl");
const message = document.getElementById("message");
const downloadBtn = document.getElementById("downloadBtn");
const pasteBtn = document.getElementById("pasteBtn");

function showMessage(text, type = "") {
  message.textContent = text;
  message.className = "message" + (type ? " " + type : "");
}
function validUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch { return false; }
}
pasteBtn.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (!text) return showMessage("Your clipboard is empty.", "error");
    input.value = text.trim();
    showMessage("Link pasted. Press Download to continue.", "success");
  } catch {
    input.focus();
    showMessage("Clipboard access was blocked. Paste the link into the box manually.", "error");
  }
});
downloadBtn.addEventListener("click", async () => {
  const url = input.value.trim();
  if (!url) return showMessage("Please paste a media link first.", "error");
  if (!validUrl(url)) return showMessage("Please enter a valid http or https link.", "error");

  const path = new URL(url).pathname.toLowerCase();
  if (!path.endsWith(".mp4")) {
    return showMessage("This looks like a page link, not a direct MP4 file. Instagram/social page links need an authorized backend; this static version cannot extract them.", "error");
  }

  showMessage("Opening the direct MP4 file. Use your browser's save/download option if it plays instead.", "success");
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
});
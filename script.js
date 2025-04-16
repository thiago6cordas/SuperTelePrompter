let lines = [];
let currentLine = 0;
let interval = null;

function startScroll() {
  const text = document.getElementById("lyricsInput").value.trim();
  lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
  currentLine = 0;
  renderLines();
  if (interval) clearInterval(interval);
  const speed = parseFloat(document.getElementById("speedInput").value) * 1000;
  interval = setInterval(() => {
    nextLine();
  }, speed);
}

function nextLine() {
  if (currentLine < lines.length - 1) {
    currentLine++;
  } else {
    if (document.getElementById("repeat").checked) {
      currentLine = 0;
    } else {
      clearInterval(interval);
    }
  }
  renderLines();
}

function renderLines() {
  const display = document.getElementById("teleprompterDisplay");
  display.innerHTML = "";
  for (let i = -2; i <= 2; i++) {
    const lineIndex = currentLine + i;
    if (lineIndex >= 0 && lineIndex < lines.length) {
      const div = document.createElement("div");
      div.textContent = lines[lineIndex];
      div.className = "line" + (i === 0 ? " active" : "");
      display.appendChild(div);
    }
  }
}

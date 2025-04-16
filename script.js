
let lyrics = [];
let currentLine = 0;
let interval = null;

function startScroll() {
  if (!lyrics.length) {
    const input = document.getElementById("lyricsInput").value;
    lyrics = input.split(/\r?\n/).filter(line => line.trim() !== "");
    currentLine = 0;
  }
  if (interval) clearInterval(interval);
  updateDisplay();
  const speed = parseFloat(document.getElementById("speed").value) * 1000;
  interval = setInterval(() => {
    currentLine++;
    if (currentLine >= lyrics.length) {
      if (document.getElementById("repeat").checked) {
        currentLine = 0;
      } else {
        clearInterval(interval);
        return;
      }
    }
    updateDisplay();
  }, speed);
}

function nextLine() {
  if (lyrics.length === 0) return;
  currentLine = Math.min(currentLine + 1, lyrics.length - 1);
  updateDisplay();
}

function updateDisplay() {
  const teleprompter = document.getElementById("teleprompter");
  teleprompter.innerHTML = "";
  for (let i = -2; i <= 2; i++) {
    const lineIndex = currentLine + i;
    if (lineIndex >= 0 && lineIndex < lyrics.length) {
      const line = document.createElement("div");
      line.className = "line" + (i === 0 ? " active" : "");
      line.textContent = lyrics[lineIndex];
      teleprompter.appendChild(line);
    }
  }
}

function toggleMobile() {
  document.body.classList.toggle("mobile", document.getElementById("mobileMode").checked);
}

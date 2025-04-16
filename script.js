let lines = [];
let currentIndex = 0;
let interval = null;
let repeat = false;

document.getElementById("modeToggle").addEventListener("change", function () {
    document.body.classList.toggle("mobile-mode", this.checked);
});

document.getElementById("pdfUpload").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = function () {
            const typedarray = new Uint8Array(this.result);
            pdfjsLib.getDocument(typedarray).promise.then(function (pdf) {
                pdf.getPage(1).then(function (page) {
                    page.getTextContent().then(function (textContent) {
                        const textItems = textContent.items.map(item => item.str);
                        document.getElementById("lyricsInput").value = textItems.join(" ");
                    });
                });
            });
        };
        reader.readAsArrayBuffer(file);
    }
});

function startScroll() {
    clearInterval(interval);
    lines = document.getElementById("lyricsInput").value.split(/\n|\r/).filter(l => l.trim() !== "");
    currentIndex = 0;
    displayLines();
    const speed = parseFloat(document.getElementById("speed").value) * 1000;
    interval = setInterval(() => {
        currentIndex++;
        if (currentIndex >= lines.length) {
            if (repeat) {
                currentIndex = 0;
            } else {
                clearInterval(interval);
                return;
            }
        }
        displayLines();
    }, speed);
}

function nextLine() {
    currentIndex++;
    if (currentIndex >= lines.length) currentIndex = 0;
    displayLines();
}

function toggleRepeat() {
    repeat = !repeat;
    alert("Repetir Música: " + (repeat ? "Ativado" : "Desativado"));
}

function displayLines() {
    const lyricsDiv = document.getElementById("lyrics");
    lyricsDiv.innerHTML = "";
    for (let i = -2; i <= 2; i++) {
        const lineIdx = currentIndex + i;
        const lineText = lines[lineIdx] || "";
        const div = document.createElement("div");
        div.className = "line" + (i === 0 ? " active" : "");
        div.textContent = lineText;
        lyricsDiv.appendChild(div);
    }
}

// PDF.js script loader
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js";
document.head.appendChild(script);

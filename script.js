<script>
  // Função para importar e processar a letra
  document.getElementById("importButton").addEventListener("click", () => {
    // Obtenha o texto do textarea
    const lyrics = document.getElementById("lyricsInput").value;

    // Divida o texto em linhas usando quebra de linha "\n"
    const lines = lyrics.split("\n");

    // Obtenha o container de rolagem
    const scrollContainer = document.getElementById("scroll-container");

    // Limpe o conteúdo existente no scrollContainer
    scrollContainer.innerHTML = "";

    // Adicione as linhas no container com destaque para a linha central
    lines.forEach((line, index) => {
      const div = document.createElement("div");
      div.className = "line";
      if (index === 2) {
        div.classList.add("highlight"); // A terceira linha (índice 2) será destacada inicialmente
      }
      div.textContent = line;
      scrollContainer.appendChild(div);
    });
  });
</script>
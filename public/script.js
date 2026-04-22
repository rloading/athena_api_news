async function buscar() {
  const query = document.getElementById("searchInput").value;
  const resultsDiv = document.getElementById("results");
  const loading = document.getElementById("loading");

  if (!query) {
    return alert("Digite um termo de busca");
  }

  // Limpa resultados
  resultsDiv.innerHTML = "";
  loading.style.display = "block";

  try {
    // Faz a chamada para a rota do Express
    const response = await fetch(`/api/news?q=${query}`);
    const articles = await response.json();

    loading.style.display = "none";

    if (articles.length === 0) {
      resultsDiv.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
      return;
    }

    // Retorno de noticias
    articles.forEach( function (article) {
      const articleElement = document.createElement("div");
      articleElement.classList.add("article");
      articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description || "Sem descrição disponível."}</p>
                <a href="${article.url}" target="_blank">Ler mais →</a>
            `;
      resultsDiv.appendChild(articleElement);
    });
  } catch (error) {
    loading.style.display = "none";
    console.error("Erro na requisição:", error);
    alert("Erro ao buscar notícias.");
  }
}

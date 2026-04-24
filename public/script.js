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
    
    const response = await fetch(`/api/news?q=${query}`); // Chamar o express
    let articles = await response.json();

    loading.style.display = "none";

    if (articles.length === 0) {
      resultsDiv.innerHTML = "<p style='color: #fff; font-weight: bold; font-size: 16px;'>Nenhuma notícia encontrada.</p>";
      return;
    }

    // Retorno de noticias
    articles.forEach( function (article) {
      let articleElement = document.createElement("div");
      articleElement.classList.add("article");
      articleElement.innerHTML =`
                <h3>${article.title}</h3>
                <p>${article.description || "Sem descrição disponível."}</p>
                <p style='font-style: italic'>Fonte: ${article.source.name}</p>
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

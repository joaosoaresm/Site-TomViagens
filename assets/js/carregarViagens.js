function formatarData(dataString) {
  const [dia, mes, ano] = dataString.split('/');
  return new Date(ano, mes - 1, dia);
}

function carregarViagens() {
  fetch("/data/destinos.json")
    .then(res => res.json())
    .then(destinos => {
      // Ordenar por data (mais próxima primeiro)
      destinos.sort((a, b) => {
        const dataA = formatarData(a.data);
        const dataB = formatarData(b.data);
        return dataA - dataB;
      });

      const containerViagens = document.getElementById("viagens");
      const titulo = containerViagens.querySelector("h2");
      
      // Limpar conteúdo existente, mantendo apenas o título
      containerViagens.innerHTML = "";
      containerViagens.appendChild(titulo);

      destinos.forEach(destino => {
        const cardLink = document.createElement("a");
        cardLink.href = `destinos/${destino.slug}.html`;
        cardLink.className = "card-link";

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${destino.img}" alt="${destino.titulo}" class="img-viagem" />
          <h3>${destino.titulo}</h3>
          <p><strong>Data:</strong> ${destino.data}</p>
          <p><strong>Saída:</strong> São José dos Campos</p>
          <p><strong>Valor:</strong> ${destino.valor}</p>
          <p><strong>Inclui:</strong> ${getInclui(destino.slug)}</p>
        `;

        cardLink.appendChild(card);
        containerViagens.appendChild(cardLink);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar viagens:", err);
    });
}

function getInclui(slug) {
  const incluiMap = {
    "beto-carreiro": "Transporte, Ingresso (2 dias de parque) e Hotel com café da manhã",
    "hopi-hari": "Transporte e passaporte",
    "oktoberfest": "Transporte",
    "sao-roque": "Pacote Completo",
    "aquario": "Passagem e Ingresso"
  };
  return incluiMap[slug] || "Transporte";
}

document.addEventListener("DOMContentLoaded", carregarViagens); 
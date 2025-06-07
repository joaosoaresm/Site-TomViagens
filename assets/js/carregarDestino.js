// Função para extrair o nome do arquivo atual (ex: zoologico-sp)
function obterSlug() {
  const partes = window.location.pathname.split("/");
  const nomeArquivo = partes[partes.length - 1];
  return nomeArquivo.replace(".html", "");
}

// Carregar os dados do destino com base no slug
fetch("/data/destinos.json")
  .then(res => res.json())
  .then(destinos => {
    const slug = obterSlug();
    const destino = destinos.find(d => d.slug === slug);

    if (!destino) {
      document.getElementById("conteudoDestino").innerHTML = "<p>Destino não encontrado.</p>";
      return;
    }

    document.title = destino.titulo;
    document.getElementById("descricaoMeta").setAttribute("content", destino.descricao);

    document.getElementById("conteudoDestino").innerHTML = `
      <section class="destino-detalhe">
        <h2>${destino.titulo}</h2>
        <img src="${destino.img}" alt="${destino.titulo}" />
        <p>${destino.descricao}</p>
        <p><strong>Data da Viagem:</strong> ${destino.data}</p>
        <p><strong>Valor:</strong> ${destino.valor}</p>
        <p>Mais informações e detalhes:</p><a href="https://wa.me/5512992185458?text=Olá,%20quero%20informações%20sobre%20a%20viagem%20para%20${encodeURIComponent(destino.titulo)}!" target="_blank" class="btn-whatsapp">Reservar pelo WhatsApp</a>
      </section>
    `;
  })
  .catch(err => {
    console.error("Erro ao carregar destino:", err);
  });

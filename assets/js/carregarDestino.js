function obterSlug() {
  const partes = window.location.pathname.split("/");
  const nomeArquivo = partes[partes.length - 1];
  return nomeArquivo.replace(".html", "");
}

document.addEventListener("DOMContentLoaded", () => {
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
          <img src="${destino.img}" alt="${destino.titulo}" class="img-destino" />
          <div class="info-destino">
            <h2>${destino.titulo}</h2>
            <p>${destino.descricao}</p>
            <p><strong>Data da Viagem:</strong> ${destino.data}</p>
            <p><strong>Valor:</strong> ${destino.valor}</p>
            <p><a href="https://wa.me/5512992185458?text=Olá,%20quero%20informações%20sobre%20a%20viagem%20para%20${encodeURIComponent(destino.titulo)}!" target="_blank" class="btn-whatsapp">Reservar pelo WhatsApp</a></p>
          </div>
        </section>
      `;
    })
    .catch(err => {
      console.error("Erro ao carregar destino:", err);
    });
});

class UI {
  displaySuggestions(gif) {
    var gifsResultados = document.querySelector(".suggested-gifs");
    for (var i = 0; i < 4; i++) {
      console.log(gif[i].images.original.url);
      gifsResultados.innerHTML += `<div><div class="header">#${gif[i].title
        .substring(0, gif[i].title.indexOf("GIF"))
        .replace(/ /g, "")}</div><img src="${
        gif[i].images.original.url
      }" alt="${
        gif[i].title
      }" ><button class="verMas_button" id="sugerencia1"><span>Ver más</span></button></div>`;
    }
    console.log(gif);
  }

  //displayTrends;
}

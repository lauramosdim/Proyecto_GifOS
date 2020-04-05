class UI {
  displaySuggestions(gif) {
    var gifsResultados = document.querySelector(".suggested-gifs");
    for (var i = 0; i < 4; i++) {
      //   console.log(gif[i].images.original.url);
      gifsResultados.innerHTML += `<div class="suggested-container"><div class="header-gif">#${gif[
        i
      ].title
        .substring(0, gif[i].title.indexOf("GIF"))
        .replace(
          / /g,
          ""
        )} <img class="close-mark" src="./images/close.svg"> </div><img class ="suggested-gif" src="${
        gif[i].images.original.url
      }" alt="${
        gif[i].title
      }" ><button class="verMas_button" id="sugerencia1"><span>Ver más</span></button></div>`;
    }
    // console.log(gif);
  }

  displayTrends(gif) {
    let resultadosTrends = document.querySelector(".trends-gifs");
    // console.log(resultadosTrends + "RESULTADOTRENDS");
    for (var i = 4; i < 24; i++) {
      console.log(gif[i].images.original.url);
      resultadosTrends.innerHTML += `<div class="trendy-container"><img class ="trend-gif" id="trend-gif" src="${
        gif[i].images.original.url
      }" alt="${gif[i].title}"><div class="footer-gif" id = "footer-gif">${gif[
        i
      ].title
        .substring(0, gif[i].title.indexOf(" GIF"))
        .replace(/^/g, "#")
        .replace(/ /g, "#")}</div></div>`;
    }
    // console.log(gif);
  }

  displaySearch(gif) {
    let resultadosTrends = document.querySelector(".trends-gifs");
    resultadosTrends.innerHTML = "";
    for (var i = 0; i < 20; i++) {
      console.log(gif[i].images.original.url);
      resultadosTrends.innerHTML += `<div class="trendy-container"><img class ="trend-gif" id="trend-gif" src="${
        gif[i].images.original.url
      }" alt="${gif[i].title}"><div class="footer-gif" id = "footer-gif">${gif[
        i
      ].title
        .substring(0, gif[i].title.indexOf(" GIF"))
        .replace(/^/g, "#")
        .replace(/ /g, "#")}</div></div>`;
    }
  }
}
// // console.log(gif);

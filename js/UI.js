class UI {
  displaySuggestions(gif) {
    var gifsResultados = document.querySelector(".suggested-gifs");
    for (var i = 0; i < 4; i++) {
      let palabrasug = gif[i].title.substring(0, gif[i].title.indexOf(" GIF"));
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
        }" ><button class="verMas_button" onclick="verMasBttn('${palabrasug}');" id="sugerencia1"><span>Ver más</span></button></div>`;

      console.log(palabrasug);
    }
  }





  displayTrends(gif) {
    let resultadosTrends = document.querySelector(".trends-gifs");
    // console.log(resultadosTrends + "RESULTADOTRENDS");
    for (var i = 4; i < 24; i++) {
      // console.log(gif[i].images.original.url);
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

let input = document.querySelector("#searcher-input"),
  log = document.querySelector(".suggestions-list"),
  margin = document.querySelector(".search-box"),
  topmargin = document.querySelector(".suggestions-input"),
  search = document.querySelector(".suggestion-button"),
  botonDropdown = document.querySelector("#toggle"),
  lupa = document.querySelector(".lupaImg"),
  styles = document.getElementById("pagestyle"),
  menuhamburguesa = document.querySelector(".menu-theme"),
  logo = document.querySelector(".logo-day"),
  day = document.querySelector(".day"),
  night = document.querySelector(".night"),
  themeDay = "true",
  themeNight = "False",
  stringBuscar = document.querySelector(".searcher-input"),
  lupaBtton = document.querySelector(".search-button");




botonDropdown.addEventListener("click", desplegarLista);

function desplegarLista(e) {
  let elemento = e.target;
  // console.log("oprimí botón");
  if (elemento.classList.contains("isActive")) {
    elemento.classList.remove("isActive");
    menuhamburguesa.style.display = "none";
  } else {
    elemento.classList.add("isActive");
    menuhamburguesa.style.display = "block";
  }
}

function desplegarSuggestions(e) {
  if (input.value.length > 0) {
    log.style.visibility = "visible";
    margin.style.margin = "0px";
    log.style.height = "120px";
  } else {
    log.style.visibility = "hidden";
    log.style.height = "0px";
    margin.style.marginBottom = "80px";
  }
}

day.addEventListener("click", clickDay);

function clickDay() {
  themeDay = "true";
  logo.setAttribute("src", "./images/gifOF_logo.png");
  styles.setAttribute("href", "./styles/saylor_day.css");
}

night.addEventListener("click", clickNight);

function clickNight() {
  styles.setAttribute("href", "./styles/saylor_night.css");
  themeNight = "true";
  themeDay = "false";
  logo.setAttribute("src", "./images/gifOF_logo_dark.png");
  console.log("hizoesto");
}

stringBuscar.addEventListener("input", changeButton);

function changeButton() {
  if (stringBuscar.value.length > 0) {
    lupa.setAttribute("src", "./images/lupa.svg");
    lupaBtton.classList.add("BotonBuscando");
    lupa.classList.add("LupaNight");
    // console.log("entro");
  } else {
    lupa.setAttribute("src", "./images/lupa_inactive.svg");
    lupaBtton.classList.remove("BotonBuscando");
    lupa.classList.remove("LupaNight");
  }
}
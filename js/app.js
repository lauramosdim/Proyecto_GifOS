///////////////variables que me traen elementos del dom//
let inputBuscar = document.querySelector("#searcher-input"),
  botonBuscar = document.querySelector("#search-bttn"),
  searchTrends = document.querySelector("#trends-p"),
  scrollDown = document.querySelector(".searchresults"),
  coronavirus = document.getElementById("sugeridoButton"),
  travel = document.getElementById("similarButton"),
  work = document.getElementById("otherButton");

//////////////event listeners////////////

botonBuscar.addEventListener("click", traerPalabraBusqueda);
input.addEventListener("input", desplegarSuggestions);
coronavirus.addEventListener("click", opcion1);
travel.addEventListener("click", opcion2);
work.addEventListener("click", opcion3);

////////////////funciones////////////////

function opcion1() {
  click1 = true;
  click2 = false;
  click3 = false;
  corona();
}

function opcion2() {
  click1 = false;
  click2 = true;
  click3 = false;
  corona();
}

function opcion3() {
  click1 = false;
  click2 = false;
  click3 = true;
  corona();
}

function corona() {
  if (click1) {
    palabrasug = "coronavirus";
    searchTrends.innerText = `(Coronavirus resultados)`;
    let serverResponse = gif.corona(palabrasug);
    //console.log("server response"+serverResponse);
    serverResponse.then((gifsEntrantes) => {
      ui.displaySearch(gifsEntrantes.gif.data);

      //console.log
    });
  } else if (click2) {
    palabrasug = "travel";
    searchTrends.innerText = `(Travel resultados)`;
    let serverResponse = gif.corona(palabrasug);
    //console.log("server response"+serverResponse);
    serverResponse.then((gifsEntrantes) => {
      ui.displaySearch(gifsEntrantes.gif.data);
    });
  } else if (click3) {
    palabrasug = "work from home";
    searchTrends.innerText = `(Work From Home resultados)`;
    let serverResponse = gif.corona(palabrasug);
    //console.log("server response"+serverResponse);
    serverResponse.then((gifsEntrantes) => {
      ui.displaySearch(gifsEntrantes.gif.data);
    });
  } else {
    ("intente de nuevo");
  }

  log.style.visibility = "hidden";
  log.style.height = "0px";
  margin.style.marginBottom = "80px";
  scrollDown.scrollIntoView({
    behavior: "smooth"
  });
}

function traerPalabraBusqueda(e) {
  // console.log(inputBuscar.value);
  BuscarGif(inputBuscar.value);
  scrollDown.scrollIntoView({
    behavior: "smooth"
  });
}

// instancion las clases
let gif = new GiphyAPI();
let ui = new UI();

function GetGifs() {
  let serverResponse = gif.GetGiphy(4);

  serverResponse.then((gifsEntrantes) => {
    ui.displaySuggestions(gifsEntrantes.gif.data);
  });
}




function verMasBttn(palabrasug) {

  let serverResponse = gif.corona(palabrasug);
  serverResponse.then((gifsEntrantes) => {
    ui.displaySearch(gifsEntrantes.gif.data);
  });
  searchTrends.innerText = `${palabrasug}(resultados)`;
  scrollDown.scrollIntoView({
    behavior: "smooth"
  })
}

function GetTrends() {
  let serverResponse = gif.GetGiphy(24);

  serverResponse.then((gifsEntrantes) => {
    ui.displayTrends(gifsEntrantes.gif.data);
  });
}

function BuscarGif(palabraBusqueda) {
  searchTrends.innerText = `${palabraBusqueda}(resultados)`;
  let serverResponse = gif.BuscarGifs(palabraBusqueda);
  //console.log("server response"+serverResponse);
  serverResponse.then((gifsEntrantes) => {
    ui.displaySearch(gifsEntrantes.gif.data);

    //console.log
  });
  log.style.visibility = "hidden";
  log.style.height = "0px";
  margin.style.marginBottom = "80px";
}

GetGifs();
GetTrends();
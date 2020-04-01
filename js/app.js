///////////////variables que me traen elementos del dom
let menuhamburguesa = document.querySelector(".menu-theme"),
  botonDropdown = document.querySelector("#toggle"),
  inputBuscar = document.querySelector("#searcher-input"),
  botonBuscar = document.querySelector("#search-bttn");

console.log(botonBuscar);
//////////////event listeners////////////

botonDropdown.addEventListener("click", desplegarLista);
botonBuscar.addEventListener("click", traerPalabraBusqueda);
// let botonNight=document.querySelector(".night");
// botonNight.addEventListener("click",cambiarColor);

////////////////funciones////////////////
function desplegarLista(e) {
  let elemento = e.target;
  if (elemento.classList.contains("isActive")) {
    elemento.classList.remove("isActive");
    menuhamburguesa.style.display = "none";
  } else {
    elemento.classList.add("isActive");
    menuhamburguesa.style.display = "block";
  }
  // menuhamburguesa.style.display="block"

  //menuhamburguesa.style.display="none"
}

function traerPalabraBusqueda(e) {
  // console.log(e.target);
  BuscarGif(inputBuscar.value);
}

// function cambiarColor(e){

//     let header=document.querySelector(".counter");
//     header.style.background="red";
// }
// instancion las clases
let gif = new GiphyAPI();
let ui = new UI();

function GetGifs() {
  let serverResponse = gif.GetGiphy(4);
  //console.log("server response"+serverResponse);
  serverResponse.then(gifsEntrantes => {
    console.log("gif entrantes" + gifsEntrantes.gif.data);
    ui.displaySuggestions(gifsEntrantes.gif.data);
    //console.log
  });
}

function GetTrends() {
  let serverResponse = gif.GetGiphy(24);
  //console.log("server response"+serverResponse);
  serverResponse.then(gifsEntrantes => {
    console.log("gif entrantes" + gifsEntrantes.gif.data);
    ui.displayTrends(gifsEntrantes.gif.data);
    //console.log
  });
}

function BuscarGif(palabraBusqueda) {
  let serverResponse = gif.BuscarGifs(palabraBusqueda);
  //console.log("server response"+serverResponse);
  serverResponse.then(gifsEntrantes => {
    console.log("gif entrantes corona" + gifsEntrantes.gif.data);
    //ui.displaySuggestions(gifsEntrantes.gif.data);
    //console.log
  });
}

GetGifs();
GetTrends();

// GetGiphy lee el end point y trae la respuesta que es una promesa

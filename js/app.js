///////////////variables que me traen elementos del dom
let menuhamburguesa = document.querySelector(".menu-theme"),
  botonDropdown = document.querySelector("#toggle"),
  inputBuscar = document.querySelector("#searcher-input"),
  botonBuscar = document.querySelector("#search-bttn"),
  searchTrends = document.querySelector("#trends-p");

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
  // console.log(inputBuscar.value);
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
    // console.log("gif entrantes" + gifsEntrantes.gif.data);
    ui.displaySuggestions(gifsEntrantes.gif.data);
    //console.log
  });
}

function GetTrends() {
  let serverResponse = gif.GetGiphy(24);
  //console.log("server response"+serverResponse);
  serverResponse.then(gifsEntrantes => {
    // console.log("gif entrantes" + gifsEntrantes.gif.data);
    ui.displayTrends(gifsEntrantes.gif.data);
    //console.log
  });
}

function BuscarGif(palabraBusqueda) {
  searchTrends.innerText = `${palabraBusqueda}(resultados)`;
  let serverResponse = gif.BuscarGifs(palabraBusqueda);
  //console.log("server response"+serverResponse);
  serverResponse.then(gifsEntrantes => {
    ui.displaySearch(gifsEntrantes.gif.data);
    //console.log
  });
}

GetGifs();
GetTrends();

// GetGiphy lee el end point y trae la respuesta que es una promesa

// const search = "http://api.giphy.com/v1/gifs/search?limit=16&";
// const searchBar = document.getElementById("search");
// const suggestedSearch = document.getElementById("suggested-search");
// const suggestions = [...document.getElementsByClassName("suggestions")];
// const tags = [
//   "action",
//   "animals",
//   "anime",
//   "art and desing",
//   "cartoons and comics",
//   "celebrities",
//   "emotions",
//   "food and drink",
//   "gaming",
//   "memes",
//   "movies",
//   "music",
//   "nature",
//   "news and politics",
//   "reactions",
//   "science",
//   "sports",
//   "cars",
//   "tv series"
// ];
// const searchBtn = document.getElementById("search-btn");
// let printed = false;

/* Search gif by user input or suggested search */

// async function searchGifs(url, string) {
//     let data = await fetch(url);
//     let parsed = await data.json();
//     searchBar.value = string;
//     printGifs(parsed, string);
// }

// searchBtn.addEventListener("click", () => {
//     let value = searchBar.value;
//     let convertedString = value.split(" ").join("+");
//     searchGifs(`${search}${api_key}&q=${convertedString}`, value);
// });

// suggestions.forEach(index => {
//     index.addEventListener("click", () => {
//         searchGifs(`${search}${api_key}&q=${index.textContent}`, index.textContent);
//     });
// });

// /* Print search results */

// function printGifs(data, string) {
//     let dataArray = data.data;
//     let container = document.getElementById("results-container");
//     let heading = document.getElementById("results-heading");

//     heading.textContent = `Mostrando resultados para: ${string}`;

//     let trends = document.getElementById("trends");
//     trends.style.display = "none";

//     results.style.display = "block";

//     if (printed) {
//         let childs = [...document.getElementById("results-container").childNodes];

//         childs.forEach(index => {
//             index.remove();
//         });

//         dataArray.forEach(test);
//         printed = true;
//     } else {
//         dataArray.forEach(test);
//         printed = true;
//     }

//     function test(index, currentValue, array) {
//         let template = document.getElementById("results-template");
//         let clone = document.importNode(template.content, true);
//         let title = index.title.split(" ");
//         let splice = title.splice(title.indexOf("GIF"), title.length);

//         clone.querySelector(".results-img").src = index.images.fixed_height.url;
//         clone.querySelector(".results-title").textContent = `#${title.join(" #").toLowerCase()}`;

//         container.appendChild(clone);
//     }
// }

// /* styling on click */

// document.addEventListener("click", event => {
//     let target = event.target;
//     let btn = document.getElementById("search-btn");

//     suggestions.forEach((index, currentValue) => {
//         shuffle(tags);
//         let random = Math.floor(Math.random() * tags.length) + currentValue;
//         index.textContent = tags[currentValue];
//     });

//     if (target.tagName === "INPUT") {
//         btn.disabled = false;
//         suggestedSearch.style.display = "flex";
//     } else {
//         btn.disabled = true;
//         suggestedSearch.style.display = "none";
//     }
// });

// /* Shuffling tags array for random order to get suggestions name */

// function shuffle(array) {
//     var m = array.length,
//         t,
//         i;
//     while (m > 0) {
//         i = Math.floor(Math.random() * m--);
//         t = array[m];
//         array[m] = array[i];
//         array[i] = t;
//     }
//     return array;

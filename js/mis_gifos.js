function showGifs() {
  let myGuifosLocalStorage = localStorage.getItem("my_gifos");
  myGuifosLocalStorage = myGuifosLocalStorage.split(",");
  for (let i = 0; i < myGuifosLocalStorage.length; i++) {
    let urls = myGuifosLocalStorage[i];
    const contenedor_gifos = document.querySelector(".content_myGifOs_boxes");
    const my_gifos_box = document.createElement("img");

    my_gifos_box.src = "https://media.giphy.com/media/" + urls + "/giphy.gif";
    my_gifos_box.className = "myGifOs_box";
    my_gifos_box.alt = "Imagen de mi gif grabado";

    contenedor_gifos.appendChild(my_gifos_box);
  }
}

showGifs();

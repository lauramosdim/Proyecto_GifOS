function showGifs() {
  for (i = localStorage.length - 1; i >= 0; i--) {
    let llaves = localStorage.key(i);
    let urls = localStorage.getItem(llaves);
    const contenedor_gifos = document.querySelector(".content_myGifOs_boxes");
    const my_gifos_box = document.createElement("img");

    my_gifos_box.src = urls;
    my_gifos_box.className = "myGifOs_box";
    my_gifos_box.alt = "Imagen de mi gif grabado";

    contenedor_gifos.appendChild(my_gifos_box);
  }
}

showGifs();

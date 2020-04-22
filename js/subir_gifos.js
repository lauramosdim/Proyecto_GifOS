let recorder; // globally accessible
const video = document.querySelector("video");
let blob;

let captureButton = document.querySelector(".capture_button"),
  cameraImg = document.getElementById("cameraImg"),
  finishButton = document.querySelector(".finish_capture_button"),
  closeImg = document.querySelector(".close"),
  recordImg = document.getElementById("recordImg"),
  recordGifTitle = document.querySelector(".recordGif_title"),
  repeatButton = document.querySelector(".repeat_button"),
  uploadButton = document.querySelector(".upload_button"),
  vistaPrevia = document.getElementById("preview"),
  vistaPreviaUpload = document.getElementById("upload_preview"),
  copyButton = document.querySelector(".copy_button"),
  downloadButton = document.querySelector(".download_button"),
  okButton = document.querySelector(".ok_button"),
  subiendo = document.querySelector(".globe");

// Preparar la grabación/

document
  .querySelector(".start_button")
  .addEventListener("click", async function () {
    document.querySelector(".recordGif").style.display = "block";
    document.querySelector(".createGif").style.display = "none";
    startVideo();
  });

const startVideo = () => {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: {
          ideal: 440
        },
        width: {
          ideal: 838
        },
      },
    })
    .then((stream) => {
      this.stream = stream;

      if ("srcObject" in video) {
        video.srcObject = stream;
      } else {
        video.src = window.URL.createObjectURL(stream);
      }
      video.onloadedmetadata = (e) => video.play();
      console.log("entré");
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
    });
};

const validateAndPrepareNavigator = async () => {
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }

  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = (constraints) => {
      const getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      if (!getUserMedia) {
        return Promise.reject(
          new Error("getUserMedia is not implemented in this browser")
        );
      }

      return new Promise((resolve, reject) => {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
};

//Grabar el guifo
captureButton.addEventListener("click", function () {
  console.log("Grabación iniciada!");
  captureButton.style.display = "none";
  cameraImg.style.display = "none";

  recordGifTitle.innerHTML = "Capturando Tu Gifo";
  startRecording2();
});

const startStopWatch = () => {
  console.log("hola");
};
const startRecording2 = async () => {
  recorder = RecordRTC(stream, {
    type: "gif",
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: () => {
      finishButton.style.display = "block";
      recordImg.style.display = "block";
    },
  });
  //await recorder.reset();
  recorder.startRecording();
  console.log("estoy grabando");
};

finishButton.addEventListener("click", async function () {
  console.log("Grabación detenida!");
  finishButton.style.display = "none";
  recordImg.style.display = "none";
  repeatButton.style.display = "block";
  uploadButton.style.display = "block";
  closeImg.style.display = "none";
  recordGifTitle.innerHTML = "Vista Previa";

  // Oculta el video y muestra la vista previa

  video.style.display = "none";
  vistaPrevia.style.display = "block";

  recorder.stopRecording(function (blobURL) {
    console.log(blobURL);
    //video.srcObject = null;
    blob = recorder.getBlob();
    vistaPrevia.src = blobURL;
  });
  // // Stop streaming - Close webcam -> Taken from https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/stop
  stream.getTracks().forEach((track) => track.stop());
  // // Also reset recorder states and remove the data
  await recorder.reset();
  // // Destroy RecordRTC instance. Clear all recorders, objects and memory. Clear everything.
  await recorder.destroy();

  recorder = null;
});

repeatButton.addEventListener("click", () => {
  video.style.display = "block";
  vistaPrevia.style.display = "none";
  repeatButton.style.display = "none";
  uploadButton.style.display = "none";
  captureButton.style.display = "block";
  cameraImg.style.display = "block";
  startVideo();
});

const myID = "lauraramos9a9a";
const apiKey = "ExcuwYMs8iItjhYZLNLm2uyYg4qCVnSi";
let gifID;

function repeat() {
  repeatButton.addEventListener("click", () => {
    document.location.reload();
  });
}

uploadButton.addEventListener("click", async function () {
  repeat();

  recordGifTitle.innerHTML = "Subiendo Guifo";
  vistaPrevia.style.height = "48px";
  vistaPrevia.style.width = "48px";
  vistaPrevia.style.marginTop = "150px";
  vistaPrevia.style.marginLeft = "420px";
  repeatButton.innerHTML = "Cancelar";
  repeatButton.style.marginLeft = "200px";
  uploadButton.style.display = "none";

  vistaPrevia.src = "../images/globe_img.png";
  subiendo.style.display = "block";

  let formdata = new FormData();

  formdata.append("api_key", apiKey);
  formdata.append("username", myID);
  formdata.append("file", blob, "myGif.gif");

  let requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    referrerPolicy: "no-referrer",
  };

  await fetch("http://upload.giphy.com/v1/gifs", requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      gifID = data.data.id;
      console.log(data);
      // setLocalStorage(data.data.id);
      let myGifosIds = localStorage.getItem("my_gifos");

      if (myGifosIds) {
        myGifosIds = `${data.data.id},${myGifosIds}`;
        localStorage.setItem("my_gifos", myGifosIds);
        const contenedor_gifos = document.querySelector(
          ".content_myGifOs_boxes"
        );
        contenedor_gifos.innerHTML = "";
        showGifs();
      } else {
        localStorage.setItem("my_gifos", data.data.id);
      }
    })
    .catch((error) => {
      console.error(error.message);
    });

  await fetch(
    "https://api.giphy.com/v1/gifs/" +
    gifID +
    "?api_key=ExcuwYMs8iItjhYZLNLm2uyYg4qCVnSi&"
  )
    .then((response) => response.json())
    .then((geturl) => (myURL = geturl.data.images.original.url));

  vistaPreviaUpload.setAttribute("src", myURL);

  document.querySelector(".uploadGif").style.display = "block";

  document.querySelector(".recordGif").style.display = "none";

  let create = document.getElementById("create"),
    choose = document.getElementById("choose"),
    bttMyGifs = document.querySelector(".dropdown"),
    Gifs2 = document.querySelector(".my-gifs");

  create.style.display = "block";
  bttMyGifs.style.display = "block";
  choose.style.display = "block";
  Gifs2.style.display = "block";

  let botonDropdown = document.querySelector("#toggle"),
    menuhamburguesa = document.querySelector(".menu-theme"),
    logo = document.querySelector(".logo"),
    day = document.querySelector(".day"),
    night = document.querySelector(".night");

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

  day.addEventListener("click", clickDay);

  function clickDay() {
    logo.setAttribute("src", "../images/gifOF_logo.png");
    document.body.style.background = "#fff4fd";
    create.style.background = "#F7C9F3";
    bttMyGifs.style.background = "#F7C9F3";
    choose.style.background = "#F7C9F3";
    Gifs2.style.color = "#110038";
    create.style.color = "#110038";
    bttMyGifs.style.color = "#110038";
    choose.style.color = "#110038";
  }

  night.addEventListener("click", clickNight);

  function clickNight() {
    document.body.style.background = "#110038";

    logo.setAttribute("src", "../images/gifOF_logo_dark.png");
    create.style.background = "#EE3EFE";
    bttMyGifs.style.background = "#EE3EFE";
    choose.style.background = "#EE3EFE";
    Gifs2.style.color = "#FFFFFF";
    // create.style.color = "#FFFFFF";
    //bttMyGifs.style.color = "#FFFFFF";
    // choose.style.color = "#FFFFFF";
  }
});

// function setLocalStorage(id) {
//   localStorage.setItem("gifKey", id);
// }

copyButton.addEventListener("click", function () {
  var hiddenInput = document.createElement("input");

  hiddenInput.setAttribute("value", myURL);

  document.body.appendChild(hiddenInput);

  hiddenInput.select();

  document.execCommand("copy");

  document.body.removeChild(hiddenInput);
});

downloadButton.addEventListener("click", function () {
  let enlaceExterno = document.createElement("a");

  enlaceExterno.href = myURL;

  enlaceExterno.target = "_blank";

  enlaceExterno.download = myURL;

  document.body.appendChild(enlaceExterno);

  enlaceExterno.click();

  document.body.removeChild(enlaceExterno);
});

okButton.addEventListener("click", function () {
  document.location.reload();
});

function mostrarVista() {
  const search = window.location.search;

  if (search == "?view=list") {
    // Vista mostrar mis guifos
    console.log("Esta es la vista de mis guifos.");
    document.getElementById("container_createGif").style.display = "none";
    let create = document.getElementById("create"),
      choose = document.getElementById("choose"),
      bttMyGifs = document.querySelector(".dropdown"),
      Gifs2 = document.querySelector(".my-gifs");
    banner = document.querySelector(".banner");
    create.style.display = "block";
    bttMyGifs.style.display = "block";
    choose.style.display = "block";
    Gifs2.style.display = "block";

    let botonDropdown = document.querySelector("#toggle"),
      menuhamburguesa = document.querySelector(".menu-theme"),
      logo = document.querySelector(".logo"),
      day = document.querySelector(".day"),
      night = document.querySelector(".night");
    banner.style.marginBottom = "90px";
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

    day.addEventListener("click", clickDay);

    function clickDay() {
      logo.setAttribute("src", "../images/gifOF_logo.png");
      document.body.style.background = "#fff4fd";
      create.style.background = "#F7C9F3";
      bttMyGifs.style.background = "#F7C9F3";
      choose.style.background = "#F7C9F3";
      Gifs2.style.color = "#110038";
      create.style.color = "#110038";
      bttMyGifs.style.color = "#110038";
      choose.style.color = "#110038";
    }

    night.addEventListener("click", clickNight);

    function clickNight() {
      document.body.style.background = "#110038";

      logo.setAttribute("src", "../images/gifOF_logo_dark.png");
      create.style.background = "#EE3EFE";
      bttMyGifs.style.background = "#EE3EFE";
      choose.style.background = "#EE3EFE";
      Gifs2.style.color = "#FFFFFF";
      // create.style.color = "#FFFFFF";
      //bttMyGifs.style.color = "#FFFFFF";
      // choose.style.color = "#FFFFFF";
    }
  } else {
    // ?view=create Vista crear mis guifos
    console.log("Esta es la vista de crear guifos.");
  }
}

mostrarVista();
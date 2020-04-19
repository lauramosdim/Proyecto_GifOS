let recorder; // globally accessible
const video = document.querySelector("video");
let blob;

document
  .querySelector(".start_button")
  .addEventListener("click", async function () {
    document.querySelector(".recordGif").style.display = "block";
    document.querySelector(".createGif").style.display = "none";
    startVideo();
  });

// Taken from https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia and https://recordrtc.org/
const startVideo = () => {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { ideal: 440 },
        width: { ideal: 838 },
      },
    })
    .then((stream) => {
      this.stream = stream;

      // Older browsers may not have srcObject
      if ("srcObject" in video) {
        video.srcObject = stream;
      } else {
        // Avoid using this in new browsers, as it is going away.
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
  // Older browsers might not implement mediaDevices at all, so we set an empty object first
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }

  // Some browsers partially implement mediaDevices. We can't just assign an object
  // with getUserMedia as it would overwrite existing properties.
  // Here, we will just add the getUserMedia property if it's missing.
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = (constraints) => {
      // First get ahold of the legacy getUserMedia, if present
      const getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      // Some browsers just don't implement it - return a rejected promise with an error
      // to keep a consistent interface
      if (!getUserMedia) {
        return Promise.reject(
          new Error("getUserMedia is not implemented in this browser")
        );
      }

      // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
      return new Promise((resolve, reject) => {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
};

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
  okButton = document.querySelector(".ok_button");

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
      // started
      finishButton.style.display = "block";
      recordImg.style.display = "block";
      // takeScreenshotFromRecord();
      startStopWatch();
      // console.log("started");
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

uploadButton.addEventListener("click", async function () {
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

  uploadedGifData = await fetch(
    "http://upload.giphy.com/v1/gifs",
    requestOptions
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      gifID = data.data.id;
      console.log(data);
      setLocalStorage(data.data.id);
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
});

function setLocalStorage(id) {
  localStorage.setItem("gifKey", id);
}

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

// })
// .catch(function(error) {

// alert("Es necesario permitir el uso de la cámara para continuar - " + error)

// })

// })

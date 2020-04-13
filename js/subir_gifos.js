const video = document.querySelector("video");

async function stopRecordingCallback() {
  video.srcObject = null;
  let blob = await recorder.getBlob();
  video.src = URL.createObjectURL(blob);
  recorder.stream.getTracks((t) => t.stop());

  // reset recorder's state
  await recorder.reset();

  // clear the memory
  await recorder.destroy();

  // so that we can record again
  recorder = null;
}

let recorder; // globally accessible

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
  finishCaptureButton = document.querySelector(".finish_capture_button"),
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
const apiKey = "ExcuwYMs8iItjhYZLNLm2uyYg4qCVnSi";

captureButton.addEventListener("click", async function () {
  console.log("Grabación iniciada!");
  captureButton.style.display = "none";
  cameraImg.style.display = "none";
  finishCaptureButton.style.display = "block";
  recordImg.style.display = "block";
  recordGifTitle.innerHTML = "Capturando Tu Gifo";
  startRecording();
});
const startRecording = async () => {
  recorder = RecordRTC(stream, {
    type: "gif",
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: () => {
      // started
      takeScreenshotFromRecord();
      startStopWatch();
    },
  });
  await recorder.reset();
  recorder.startRecording();
  console.log("estoy grabando");
};
// This method resets the recorder. So that you can reuse single recorder instance many times.

//     document.getElementById('btn-stop-recording').disabled = false;

//     // if you want to access internal recorder
//     const internalRecorder = await recorder.getInternalRecorder();
//     console.log('internal-recorder', internalRecorder.name);

//     // if you want to read recorder's state
//     console.log('recorder state: ', await recorder.getState());
// };

// document.getElementById('btn-stop-recording').onclick = async function() {
//     this.disabled = true;
//     await recorder.stopRecording();
//     stopRecordingCallback();
//     document.getElementById('btn-start-recording').disabled = false;
// };
// let captureButton = document.querySelector(".capture_button"),
//   cameraImg = document.getElementById("cameraImg"),
//   finishCaptureButton = document.querySelector(".finish_capture_button"),
//   closeImg = document.querySelector(".close"),
//   recordImg = document.getElementById("recordImg"),
//   recordGifTitle = document.querySelector(".recordGif_title"),
//   repeatButton = document.querySelector(".repeat_button"),
//   uploadButton = document.querySelector(".upload_button"),
//   vistaPrevia = document.getElementById("preview"),
//   vistaPreviaUpload = document.getElementById("upload_preview"),
//   copyButton = document.querySelector(".copy_button"),
//   downloadButton = document.querySelector(".download_button"),
//   okButton = document.querySelector(".ok_button");
// const apiKey = "ExcuwYMs8iItjhYZLNLm2uyYg4qCVnSi";

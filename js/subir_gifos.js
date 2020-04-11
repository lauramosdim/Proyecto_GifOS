document.querySelector(".start_button").addEventListener("click", () => {
  document.querySelector(".recordGif").style.display = "block";
  document.querySelector(".createGif").style.display = "none";

  // Pide permisos al usuario

  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: 440,
        width: 838,
      },
    })
    .then(function (recordGif) {
      // Conecta lo que captura la cámara con el contenedor del video

      let video_Container = document.querySelector("video");

      video_Container.srcObject = recordGif;
      video_Container.play();

      // Variables globales de la función

      let captureButton = document.querySelector(".capture_button");
      let cameraImg = document.getElementById("cameraImg");
      let finishCaptureButton = document.querySelector(
        ".finish_capture_button"
      );
      let closeImg = document.querySelector(".close");
      let recordImg = document.getElementById("recordImg");
      let recordGifTitle = document.querySelector(".recordGif_title");
      let repeatButton = document.querySelector(".repeat_button");
      let uploadButton = document.querySelector(".upload_button");
      let vistaPrevia = document.getElementById("preview");
      let vistaPreviaUpload = document.getElementById("upload_preview");
      let copyButton = document.querySelector(".copy_button");
      let downloadButton = document.querySelector(".download_button");
      let okButton = document.querySelector(".ok_button");
      const apiKey = "nlzm1uqvJd1LB9FZMds6OIhmeoZm6AIh";

      // Se crea objeto recorder desde la libreria

      recorder = RecordRTC(recordGif, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log("recorder iniciado");
        },
      });

      captureButton.addEventListener("click", () => {
        recorder.startRecording();
        console.log("Grabación iniciada!");

        captureButton.style.display = "none";
        cameraImg.style.display = "none";
        finishCaptureButton.style.display = "block";
        recordImg.style.display = "block";
        recordGifTitle.innerHTML = "Capturando Tu Gifo";
      });

      finishCaptureButton.addEventListener("click", () => {
        recorder.stopRecording();
        console.log("Grabación Finalizada!");

        let form = new FormData();

        form.append("file", recorder.getBlob(), "myGif.gif");
        console.log(form.get("file"));

        // Crea una URL para asignarsela a un objeto del DOM

        let createdUrl = URL.createObjectURL(form.get("file"));
        vistaPrevia.setAttribute("src", createdUrl);

        // Oculta botón de stop y muestra botones siguientes

        finishCaptureButton.style.display = "none";
        recordImg.style.display = "none";
        repeatButton.style.display = "block";
        uploadButton.style.display = "block";
        closeImg.style.display = "none";
        recordGifTitle.innerHTML = "Vista Previa";

        // Oculta el video y muestra la vista previa

        video_Container.style.display = "none";
        vistaPrevia.style.display = "block";
      });

      repeatButton.addEventListener("click", () => {
        video_Container.style.display = "block";
        vistaPrevia.style.display = "none";
        repeatButton.style.display = "none";
        uploadButton.style.display = "none";
        captureButton.style.display = "block";
        cameraImg.style.display = "block";

        recorder.destroy();

        recorder = RecordRTC(recordGif, {
          type: "gif",
          frameRate: 1,
          quality: 10,
          width: 360,
          hidden: 240,
          onGifRecordingStarted: function () {
            console.log("recorder iniciado");
          },
        });
      });

      let myID;
      let myURL;

      uploadButton.addEventListener("click", async function () {
        let formdata = new FormData();

        formdata.append("api_key", "nlzm1uqvJd1LB9FZMds6OIhmeoZm6AIh");
        formdata.append("file", recorder.getBlob(), "myGif.gif");

        let requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        await fetch("https://upload.giphy.com/v1/gifs", requestOptions)
          .then((response) => response.json())
          .then((id) => (myID = id.data.id))
          .catch(console.error);

        await fetch(
          "https://api.giphy.com/v1/gifs/" +
            myID +
            "?api_key=nlzm1uqvJd1LB9FZMds6OIhmeoZm6AIh&"
        )
          .then((response) => response.json())
          .then((geturl) => (myURL = geturl.data.images.original.url));

        localStorage.setItem(myID, myURL);

        vistaPreviaUpload.setAttribute("src", myURL);

        document.querySelector(".uploadGif").style.display = "block";

        document.querySelector(".recordGif").style.display = "none";
      });

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
    })
    .catch(function (error) {
      alert(
        "Es necesario permitir el uso de la cámara para continuar - " + error
      );
    });
});

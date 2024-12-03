import React, { useState } from "react";

function App() {
  const [base64Image, setBase64Image] = useState(null);

  const handleCaptureClick = () => {
    // Open camera on click and capture image as Base64
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();

        // Show a simple UI to capture the image
        const captureButton = document.createElement("button");
        captureButton.textContent = "Capture";
        document.body.appendChild(captureButton);

        captureButton.addEventListener("click", () => {
          // Capture the image and convert it to Base64
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg");
          setBase64Image(dataUrl);

          // Stop the video stream
          video.srcObject.getTracks().forEach((track) => track.stop());
          captureButton.remove();
        });
      })
      .catch((error) => {
        console.error("Error accessing camera: ", error);
      });
  };

  return (
    <div className="App">
      <button
        onClick={handleCaptureClick}
        className="p-4 bg-blue-500 text-white rounded"
      >
        Open Camera
      </button>

      {base64Image && (
        <div className="mt-4">
          <h2 className="text-xl">Captured Image</h2>
          <img src={base64Image} alt="Captured" className="max-w-full" />
        </div>
      )}
    </div>
  );
}

export default App;

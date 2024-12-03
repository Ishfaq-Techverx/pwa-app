// import React, { useEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";

// const WebcamCapture = () => {
//   const webcamRef = useRef(null);
//   const [image, setImage] = useState(null);
//   const [capturedImages, setCapturedImages] = useState([]);

//   const captureImage = () => {
//     const screenshot = webcamRef.current?.getScreenshot();
//     if (screenshot) {
//       setImage(screenshot);
//       setCapturedImages((prevImages) => [...prevImages, screenshot]);
//     } else {
//       console.log("Error capturing image");
//     }
//   };

//   return (
//     <div className="webcam-capture">
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width="100%"
//         videoConstraints={{ facingMode: "user" }}
//       />
//       <button onClick={captureImage}>Capture Image</button>

//       <div id="capturedImage">
//         {capturedImages.map((img, index) => (
//           <img key={index} src={img} alt={`Captured ${index + 1}`} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WebcamCapture;

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [capturedImages, setCapturedImages] = useState([]);

  const captureImage = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
      setCapturedImages((prevImages) => [...prevImages, screenshot]);
    } else {
      console.log("Error capturing image");
    }
  };

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  return (
    <div className="webcam-capture">
      <div className="flex justify-center items-center">
        <button onClick={handleOpenCamera}>Open Camera</button>
        <button onClick={handleCloseCamera}>Close Camera</button>
      </div>
      {isCameraOpen && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{ facingMode: "user" }}
          />
          <button onClick={captureImage}>Capture Image</button>
        </div>
      )}

      <div id="capturedImage">
        {capturedImages.map((img, index) => (
          <img key={index} src={img} alt={`Captured ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default WebcamCapture;

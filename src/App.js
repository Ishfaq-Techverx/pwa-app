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

// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import Installer from "./components/Installer";
// import InstallPromptForiOS from "./components/InstallPromptForiOS";

// const WebcamCapture = () => {
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
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

//   const handleOpenCamera = () => {
//     setIsCameraOpen(true);
//   };

//   const handleCloseCamera = () => {
//     setIsCameraOpen(false);
//   };

//   return (
//     <div className="webcam-capture">
//       <div className="flex justify-center items-center">
//         <button onClick={handleOpenCamera}>Open Camera</button>
//         <button onClick={handleCloseCamera}>Close Camera</button>
//       </div>
//       {/* <Installer /> */}
//       <InstallPromptForiOS />
//       {isCameraOpen && (
//         <div>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             width="100%"
//             videoConstraints={{ facingMode: "user" }}
//           />
//           <button onClick={captureImage}>Capture Image</button>
//         </div>
//       )}

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
import InstallPromptForiOS from "./components/InstallPromptForiOS";

const WebcamCapture = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [facingMode, setFacingMode] = useState("user"); // Default to front camera
  const webcamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

  const captureImage = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
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

  const switchToFrontCamera = () => {
    setFacingMode("user");
  };

  const switchToRearCamera = () => {
    setFacingMode("environment");
  };

  return (
    <div className="webcam-capture">
      <div className="flex justify-center items-center gap-4">
        <button onClick={handleOpenCamera}>Open Camera</button>
        <button onClick={handleCloseCamera}>Close Camera</button>
        {isCameraOpen && (
          <>
            <button onClick={switchToFrontCamera}>Front Camera</button>
            <button onClick={switchToRearCamera}>Rear Camera</button>
          </>
        )}
      </div>
      <InstallPromptForiOS />
      {isCameraOpen && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{ facingMode }}
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

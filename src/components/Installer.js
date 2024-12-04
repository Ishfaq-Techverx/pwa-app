// import React, { useEffect, useState } from "react";

// const Installer = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);

//   useEffect(() => {
//     const handleBeforeInstallPrompt = (e) => {
//       e.preventDefault();
//       setDeferredPrompt(e); // Save the event
//       const installButton = document.querySelector("#installButton");
//       if (installButton) installButton.style.display = "block";
//     };

//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

//     return () => {
//       window.removeEventListener(
//         "beforeinstallprompt",
//         handleBeforeInstallPrompt
//       );
//     };
//   }, []);

//   const handleInstallClick = () => {
//     if (deferredPrompt) {
//       deferredPrompt.prompt();
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === "accepted") {
//           console.log("User accepted the install prompt");
//         } else {
//           console.log("User dismissed the install prompt");
//         }
//         setDeferredPrompt(null); // Reset the deferredPrompt
//       });
//     }
//   };

//   return (
//     <div>
//       <button
//         id="installButton"
//         style={{ display: "none" }}
//         onClick={handleInstallClick}
//       >
//         Install App
//       </button>
//     </div>
//   );
// };

// export default Installer;

import React, { useEffect, useState } from "react";

const InstallApp = () => {
  const [isIos, setIsIos] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Check for iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Handle the `beforeinstallprompt` event for Chrome
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Save the event
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div>
      {/* For iOS */}
      {isIos && (
        <div id="iosPrompt">
          <p>
            Install this app: tap <strong>Share</strong> and then{" "}
            <strong>Add to Home Screen</strong>.
          </p>
        </div>
      )}

      {/* For Chrome */}
      {deferredPrompt && (
        <button id="installButton" onClick={handleInstallClick}>
          Install App
        </button>
      )}
    </div>
  );
};

export default InstallApp;

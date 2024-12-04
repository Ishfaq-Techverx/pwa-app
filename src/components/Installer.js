import React, { useEffect, useState } from "react";

const Installer = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Save the event
      const installButton = document.querySelector("#installButton");
      if (installButton) installButton.style.display = "block";
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
        setDeferredPrompt(null); // Reset the deferredPrompt
      });
    }
  };

  return (
    <div>
      <button
        id="installButton"
        style={{ display: "none" }}
        onClick={handleInstallClick}
      >
        Install App
      </button>
    </div>
  );
};

export default Installer;

import { useEffect, useState } from "react";

const InstallPromptForiOS = () => {
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandaloneMode =
      window.navigator.standalone ||
      window.matchMedia("(display-mode: standalone)").matches;

    setIsIos(isIosDevice);
    setIsStandalone(isStandaloneMode);
  }, []);
  useEffect(() => {
    // Listen for the 'beforeinstallprompt' event
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
      {isIos && !isStandalone && (
        <div
          style={{ padding: "10px", background: "#eee", textAlign: "center" }}
        >
          <p>
            To install this app, tap <strong>Share</strong> and then{" "}
            <strong>Add to Home Screen</strong>.
          </p>
        </div>
      )}
      {deferredPrompt && (
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleInstallClick}
        >
          Install App
        </button>
      )}
    </div>
  );
};

export default InstallPromptForiOS;

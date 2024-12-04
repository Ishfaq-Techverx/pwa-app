const InstallPromptForiOS = () => {
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandaloneMode =
      window.navigator.standalone ||
      window.matchMedia("(display-mode: standalone)").matches;

    setIsIos(isIosDevice);
    setIsStandalone(isStandaloneMode);
  }, []);

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
    </div>
  );
};

export default InstallPromptForiOS;

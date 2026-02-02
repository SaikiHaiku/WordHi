import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  // Detect if app is already installed
  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Check for iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches;
    
    if (isIOS && !isInStandaloneMode) {
      // Show iOS instructions after a delay
      const timer = setTimeout(() => {
        const dismissed = localStorage.getItem("pwa-ios-dismissed");
        if (!dismissed) {
          setShowIOSInstructions(true);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for beforeinstallprompt event (Android/Desktop)
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show install banner after a short delay
      const dismissed = localStorage.getItem("pwa-banner-dismissed");
      if (!dismissed) {
        setTimeout(() => {
          setShowInstallBanner(true);
        }, 2000);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);
    
    // Listen for successful install
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
    } catch (error) {
      console.error("Install error:", error);
    }
    
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const dismissBanner = () => {
    setShowInstallBanner(false);
    localStorage.setItem("pwa-banner-dismissed", "true");
  };

  const dismissIOSInstructions = () => {
    setShowIOSInstructions(false);
    localStorage.setItem("pwa-ios-dismissed", "true");
  };

  // Don't show anything if already installed
  if (isInstalled) return null;

  return (
    <>
      {/* Android/Desktop Install Banner */}
      {showInstallBanner && deferredPrompt && (
        <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg animate-slide-up">
          <div className="rounded-2xl border-2 border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-100">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                <svg
                  className="h-7 w-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">Installer WordHi</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Installez l'application pour traduire hors-ligne et y accéder rapidement depuis votre écran d'accueil !
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg"
                  >
                    📲 Installer
                  </button>
                  <button
                    onClick={dismissBanner}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100"
                  >
                    Plus tard
                  </button>
                </div>
              </div>
              <button
                onClick={dismissBanner}
                className="shrink-0 text-slate-400 hover:text-slate-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Install Instructions */}
      {showIOSInstructions && (
        <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg animate-slide-up">
          <div className="rounded-2xl border-2 border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-100">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                <span className="text-2xl">📱</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">Installer WordHi sur iOS</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Pour installer l'application sur votre iPhone/iPad :
                </p>
                <ol className="mt-2 space-y-1 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">1</span>
                    Appuyez sur <span className="inline-flex items-center rounded bg-slate-100 px-1.5 py-0.5 text-lg">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L12 14M12 2L8 6M12 2L16 6M4 14L4 20L20 20L20 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span> (Partager)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">2</span>
                    Sélectionnez "Sur l'écran d'accueil"
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">3</span>
                    Appuyez sur "Ajouter"
                  </li>
                </ol>
              </div>
              <button
                onClick={dismissIOSInstructions}
                className="shrink-0 text-slate-400 hover:text-slate-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <button
              onClick={dismissIOSInstructions}
              className="mt-3 w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
            >
              J'ai compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Install button for header/menu - Enhanced version
export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIOS, setShowIOS] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    // Check for iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches;
    if (isIOS && !isInStandaloneMode) {
      setShowIOS(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
    } catch (error) {
      console.error("Install error:", error);
    }
    
    setDeferredPrompt(null);
  };

  const handleIOSInstall = () => {
    // Show iOS instructions
    const installDiv = document.createElement('div');
    installDiv.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
        <div style="background: white; border-radius: 20px; padding: 30px; max-width: 400px; text-align: center;">
          <h3 style="font-weight: bold; margin-bottom: 15px; color: #4f46e5;">Installer WordHi sur iOS</h3>
          <p style="margin-bottom: 20px; color: #64748b;">
            Pour installer l'application sur votre iPhone/iPad :
          </p>
          <ol style="text-align: left; margin-bottom: 20px; color: #64748b;">
            <li style="margin-bottom: 8px; display: flex; align-items: center; gap: 10px;">
              <span style="background: #e0e7ff; color: #4f46e5; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">1</span>
              Appuyez sur le bouton Partager
            </li>
            <li style="margin-bottom: 8px; display: flex; align-items: center; gap: 10px;">
              <span style="background: #e0e7ff; color: #4f46e5; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">2</span>
              Sélectionnez "Sur l'écran d'accueil"
            </li>
            <li style="display: flex; align-items: center; gap: 10px;">
              <span style="background: #e0e7ff; color: #4f46e5; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">3</span>
              Appuyez sur "Ajouter"
            </li>
          </ol>
          <button onclick="this.parentElement.parentElement.remove()" style="background: #4f46e5; color: white; border: none; border-radius: 12px; padding: 12px 24px; font-weight: bold; width: 100%;">
            J'ai compris
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(installDiv);
  };

  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700 shadow-sm">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        ✅ Installé
      </div>
    );
  }

  // For Android/Desktop with install prompt available
  if (deferredPrompt) {
    return (
      <button
        onClick={handleInstall}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl transform hover:scale-105"
        title="Installer WordHi sur votre appareil"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        📲 Installer WordHi
      </button>
    );
  }

  // For iOS devices
  if (showIOS) {
    return (
      <button
        onClick={handleIOSInstall}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:from-blue-600 hover:to-cyan-700 hover:shadow-xl transform hover:scale-105"
        title="Installer WordHi sur iOS"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        📱 Installer sur iOS
      </button>
    );
  }

  // Fallback for other cases
  return (
    <button
      onClick={() => {
        // Try to trigger install or show generic instructions
        if ('getInstalledRelatedApps' in navigator) {
          (navigator as any).getInstalledRelatedApps().then((apps: any[]) => {
            if (apps.length === 0) {
              alert('WordHi peut être installé sur votre appareil ! Cherchez le bouton "Installer" ou "Ajouter à l\'écran d\'accueil" dans votre navigateur.');
            }
          });
        } else {
          alert('Pour installer WordHi : Ouvrez ce site dans Chrome/Edge/Safari et cherchez l\'option "Installer" ou "Ajouter à l\'écran d\'accueil".');
        }
      }}
      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:from-gray-600 hover:to-gray-700 hover:shadow-xl"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Installer WordHi
    </button>
  );
}

// Direct Install Button for Features Section
export function DirectInstallButton() {
  return (
    <div className="rounded-xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-4 shadow-sm hover:shadow-md transition-all">
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
        <svg
          className="h-5 w-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </div>
      <h3 className="font-bold text-indigo-800">Installer Maintenant</h3>
      <p className="mt-1 text-sm text-indigo-600">
        Un seul clic pour installer WordHi sur votre appareil !
      </p>
      <div className="mt-3">
        <InstallButton />
      </div>
    </div>
  );
}

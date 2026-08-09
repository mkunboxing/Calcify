"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 1. Check if already installed / standalone mode
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone ||
      document.referrer.includes("android-app://");

    if (standalone) {
      setIsStandalone(true);
      return; // Do not show install prompt if already installed!
    }

    // 2. Check if user already dismissed install prompt in this browser
    const dismissed = localStorage.getItem("calcify_install_dismissed");
    if (dismissed === "true") {
      return;
    }

    // 3. Check if iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(Boolean(ios));

    if (ios) {
      // Show bottom banner for iOS on initial load
      setShowBanner(true);
    }

    // 4. Listen for beforeinstallprompt event (Android / Desktop Chrome / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
      setShowBanner(true); // Show ONLY bottom banner on initial load
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for appinstalled
    window.addEventListener("appinstalled", () => {
      setIsStandalone(true);
      setIsInstallable(false);
      setShowBanner(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  async function handleInstallClick() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstallable(false);
        setShowBanner(false);
        setDeferredPrompt(null);
      }
    } else {
      setShowModal(true);
    }
  }

  function handleDismiss() {
    setShowBanner(false);
    localStorage.setItem("calcify_install_dismissed", "true");
  }

  // Do not render anything if app is installed
  if (isStandalone) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom Banner ONLY — No navbar button */}
      {showBanner && (
        <div
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 p-4 rounded-2xl border shadow-2xl backdrop-blur-2xl animate-fade-up flex items-center justify-between gap-3"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-hover)",
            boxShadow: "var(--shadow-hover)",
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden shadow-md border border-indigo-400/30">
              <img src="/calcify-logo.png" alt="Calcify Logo" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm truncate" style={{ color: "var(--text-primary)" }}>Install Calcify App</p>
              <p className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>Offline access & home screen shortcut</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button onClick={handleInstallClick} className="btn-primary py-1.5 px-3.5 text-xs font-semibold">
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-200 text-lg leading-none p-1.5"
              aria-label="Dismiss banner"
              title="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Guide Modal for iOS or fallback */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
          <div className="card max-w-sm w-full p-6 text-center space-y-4 relative animate-fade-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white text-xl p-1"
            >
              ×
            </button>
            <div className="w-14 h-14 rounded-2xl mx-auto overflow-hidden shadow-lg border border-indigo-400/30">
              <img src="/calcify-logo.png" alt="Calcify Logo" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold">Install Calcify App</h3>

            {isIOS ? (
              <div className="text-xs text-slate-300 space-y-2 text-left bg-indigo-500/10 p-3.5 rounded-xl border border-indigo-500/20">
                <p className="font-semibold text-indigo-300">To install on iPhone / iPad:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Tap the <strong>Share button</strong> (⎕↑) in Safari.</li>
                  <li>Scroll down and tap <strong>Add to Home Screen</strong> (+).</li>
                  <li>Tap <strong>Add</strong> in top right.</li>
                </ol>
              </div>
            ) : (
              <div className="text-xs text-slate-300 space-y-2 text-left bg-indigo-500/10 p-3.5 rounded-xl border border-indigo-500/20">
                <p className="font-semibold text-indigo-300">To install on Chrome / Edge / Android:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Open browser menu (<strong>⋮</strong>).</li>
                  <li>Select <strong>Install Calcify</strong> or <strong>Add to Home screen</strong>.</li>
                  <li>Confirm installation.</li>
                </ol>
              </div>
            )}

            <button onClick={() => setShowModal(false)} className="btn-secondary w-full text-xs py-2">
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

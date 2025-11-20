"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

const WalletDetector: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const logProviderInfo = () => {
      const provider = (window as any).ethereum;
      if (!provider) {
        console.info("🔍 WalletDetector: no window.ethereum provider found");
        return;
      }

      console.warn("🔔 WalletDetector: window.ethereum detected", provider);

      // Monkey-patch common provider methods to log stack traces when called.
      try {
        if (provider.request && !provider.request.__patchedByWalletDetector) {
          const origRequest = provider.request.bind(provider);
          provider.request = function patchedRequest(...args: any[]) {
            console.warn("📣 WalletDetector: ethereum.request called", args[0]);
            // Print a stack trace so you can pinpoint the caller in the console
            console.trace();
            return origRequest(...args);
          };
          provider.request.__patchedByWalletDetector = true;
        }

        if (provider.enable && !provider.enable.__patchedByWalletDetector) {
          const origEnable = provider.enable.bind(provider);
          provider.enable = function patchedEnable(...args: any[]) {
            console.warn("📣 WalletDetector: ethereum.enable called", args);
            console.trace();
            return origEnable(...args);
          };
          provider.enable.__patchedByWalletDetector = true;
        }

        if (provider.connect && !provider.connect.__patchedByWalletDetector) {
          const origConnect = provider.connect.bind(provider);
          provider.connect = function patchedConnect(...args: any[]) {
            console.warn("📣 WalletDetector: ethereum.connect called", args);
            console.trace();
            return origConnect(...args);
          };
          provider.connect.__patchedByWalletDetector = true;
        }
      } catch (e) {
        console.error("WalletDetector: failed to patch provider methods", e);
      }
    };

    // Run immediately
    logProviderInfo();

    // Some wallets inject asynchronously. Watch for the provider to appear.
    const interval = setInterval(() => logProviderInfo(), 2000);

    return () => clearInterval(interval);
  }, []);

  return null; // invisible helper component
};

export default WalletDetector;

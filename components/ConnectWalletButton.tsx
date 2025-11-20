"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const ConnectWalletButton: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);

  const connect = async () => {
    if (typeof window === "undefined") return;

    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      setStatus("MetaMask is not installed.");
      console.warn("ConnectWallet: no window.ethereum provider");
      return;
    }

    try {
      setStatus("Requesting accounts...");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("ConnectWallet: accounts", accounts);
      setStatus(`Connected: ${accounts[0]}`);
    } catch (err: any) {
      console.error("ConnectWallet: connection failed", err);
      if (err?.code === 4001) {
        // EIP-1193 userRejectedRequest
        setStatus("Connection request was rejected by the user.");
      } else {
        setStatus("Failed to connect to wallet.");
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={connect}
        className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700"
        aria-label="Connect wallet"
      >
        Connect Wallet
      </button>
      {status && (
        <div className="mt-2 text-sm bg-white/80 dark:bg-black/80 p-2 rounded-md shadow text-black dark:text-white">
          {status}
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;

"use client";

import { ConnectButton, useConnectedWallets } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { client } from "../client";
import { download } from "thirdweb/storage";
import IPFS from "./IPFS";
import PinataFiles from "./PinataFiles";

export default function Login() {
  const availableWallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ];

  const connectedWallets = useConnectedWallets();
  console.log(connectedWallets);

  function isConnected() {
    return connectedWallets.length > 0;
  }

  return (
    <div className="text-right m-4">
      <ConnectButton client={client} wallets={availableWallets} />

      {isConnected() && (
        <div className="flex items-center justify-center">
          <IPFS />
          <PinataFiles />
        </div>
      )}
    </div>
  );
}

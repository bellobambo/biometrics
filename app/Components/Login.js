"use client";

import { ConnectButton, useConnectedWallets } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { client } from "../client";
import { download } from "thirdweb/storage";
import IPFS from "./IPFS";
import PinataFiles from "./PinataFiles";
import Link from "next/link";

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
    <div className="">
      <div className="flex justify-between items-center my-2">
        {isConnected() && (
          <Link
            className="bg-purple-700 text-white hover:bg-purple-400 p-3 rounded text-right"
            href="/dashboard"
          >
            Medical Report History
          </Link>
        )}
        <ConnectButton client={client} wallets={availableWallets} />
      </div>
      <div className="flex justify-center items-center flex-col space-y-[20px] text-center my-10">
        <h2 className="text-2xl text-white font-semibold ">
          Welcome To Gbenga's Medical Report Software
        </h2>
        <img className="mask mask-heart" src="/HEART.jpeg" />
      </div>
      {isConnected() && (
        <div className="flex items-center justify-center flex-col">
          <IPFS />
        </div>
      )}
    </div>
  );
}

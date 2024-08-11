import React from "react";
import { ConnectButton, useConnectedWallets } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { download } from "thirdweb/storage";

import { client } from "../client";

const Navbar = () => {
  const availableWallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ];

  const connectedWallets = useConnectedWallets();
  // console.log(connectedWallets);

  return (
    <div>
      <ConnectButton client={client} wallets={availableWallets} />
    </div>
  );
};

export default Navbar;

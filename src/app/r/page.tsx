"use client";

import { Wallet } from "@ethersproject/wallet";
import { useLogin, useQuiver, createFunction } from "@killthebuddha/fig";
import { useEffect, useState } from "react";

const wallet = Wallet.createRandom();

let routing = false;

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default function Page() {
  const isClient = useIsClient();
  const quiver = useQuiver({ wallet });
  const login = useLogin({ wallet, opts: {} });

  console.log(`LOGIN: ${login.isError}`);
  console.log(`LOGIN: ${login.isReady}`);
  console.log(`LOGIN: ${login.isPending}`);
  console.log(`LOGIN: ${login.isSuccess}`);
  console.log(`LOGIN: ${login.login}`);

  console.log(`ROUTER AT ADDRESS: ${wallet.address}`);

  if (!routing) {
    if (isClient) {
      routing = true;

      quiver.router({
        hello: createFunction({
          auth: async () => true,
          handler: async () => "hello",
        }),
      });

      quiver
        .start({})
        .then((res) => {
          console.log(`QUIVER START: ${JSON.stringify(res, null, 2)}`);
        })
        .catch((err) => {
          console.error(`QUIVER ERROR: ${err}`);
        });
    }
  }

  if (!isClient) {
    return null;
  }

  return <h1>{`ROUTER ADDESS ${wallet.address}`}</h1>;
}

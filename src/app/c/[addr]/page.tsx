"use client";

import { Wallet } from "@ethersproject/wallet";
import { useQuiver, createFunction } from "@killthebuddha/fig";
import { useParams } from "next/navigation.js";
import { useState, useEffect } from "react";

const wallet = Wallet.createRandom();

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
  const { addr } = useParams();

  const [response, setResponse] = useState<string | null>(null);

  if (typeof addr !== "string") {
    throw new Error("invalid address");
  }

  let client;
  if (!isClient) {
    client = null;
  } else {
    client = quiver.client(
      {
        hello: createFunction({
          auth: async () => true,
          handler: async () => "hello",
        }),
      },
      { address: addr },
    );

    quiver
      .start({})
      .then((res) => {
        console.log(`QUIVER START: ${JSON.stringify(res, null, 2)}`);
      })
      .catch((err) => {
        console.error(`QUIVER ERROR: ${err}`);
      });
  }

  return (
    <div>
      <button
        style={{
          cursor: "pointer",
          border: "1px solid black",
          margin: "3rem",
          padding: "1rem",
        }}
        onClick={async () => {
          try {
            console.log("WHATTTTTTTTTTTTTTT");
            if (client === null) {
              console.warn("Client is null");
              return;
            }

            console.log("Calling hello");

            const res = await client.hello(null);

            console.log(`Response: ${JSON.stringify(res, null, 2)}`);

            setResponse(JSON.stringify(res, null, 2));
          } catch (e) {
            console.error(e);
          }
        }}
      >
        hello
      </button>
      <pre>{response}</pre>
    </div>
  );
}

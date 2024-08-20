"use client";
import { Wallet } from "@ethersproject/wallet";
import { useState } from "react";
import { Group } from "@/types/Group";
import { useQuiver } from "@killthebuddha/fig";

// const hello = createFunction({
//   auth: async () => true,
//   handler: async () => "hello",
// });

const x = Wallet.createRandom();

export default function Page() {
  const [alias, setAlias] = useState<string | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [input, setInput] = useState("");
  const [group, setGroup] = useState<Group | null>(null);

  let invite: string | null;
  if (group === null) {
    invite = null;
  } else {
    invite = `https://shh.ktb.pub/join/${group.owner.address}`;
  }

  return (
    <main className="app">
      <header className="header">
        <p className="title">
          <span className="shh">shh</span> is <strong>simple</strong>,{" "}
          <strong>secure</strong>, <strong>private</strong>,{" "}
          <strong>ephemeral</strong> group messaging
        </p>
        <a href="https://github.com/killthebuddh4/shh">learn more</a>
      </header>
      <div className="footer">
        <div className="instructions">
          {alias === null && (
            <p>
              <em>
                type an alias, <span className="alias">anon</span>, then press
                enter
              </em>
            </p>
          )}
          {alias !== null && invite === null && (
            <p>
              <em>
                hello <span className="alias">{alias}</span>. i'm creating a
                group now. one moment please...
              </em>
            </p>
          )}
          {alias !== null && group !== null && (
            <>
              <p>
                <em>ok, the group is ready, you can start sending messages</em>
              </p>

              {invite !== null && (
                <a className="invite" target="_blank" href={invite!}>
                  invite
                </a>
              )}
            </>
          )}
        </div>
        <input
          className="input"
          autoFocus
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={async (e) => {
            if (alias === null && group === null) {
              if (e.key === "Enter") {
                setAlias(input);

                const wallet = Wallet.createRandom();

                setWallet(wallet);

                setGroup({
                  owner: {
                    alias: input,
                    address: wallet.address,
                  },
                  members: [],
                  messages: [],
                });

                setInput("");
              }
            }
          }}
          value={input}
        ></input>
      </div>
    </main>
  );
}

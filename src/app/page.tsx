"use client";
import { Wallet } from "@ethersproject/wallet";
import { useState } from "react";

export default function Page() {
  const [alias, setAlias] = useState<string | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [input, setInput] = useState("");

  let invite: string | null;
  if (wallet === null) {
    invite = null;
  } else {
    invite = `https://shh.ktb.pub/join/${wallet.address}`;
  }

  return (
    <main className="app">
      <header className="header">
        <p className="title">
          <span className="shh">shh</span> is <strong>simple</strong>,{" "}
          <strong>secure</strong>, <strong>private</strong>,{" "}
          <strong>ephemeral</strong> group messaging
        </p>
        <nav>
          <a href="https://github.com/killthebuddh4/shh">learn more</a>
          <a href="https://github.com/killthebuddh4/shh">github</a>
        </nav>
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
                hello <span className="alias">{alias}</span>. i'll create a
                group now. one moment please...
              </em>
            </p>
          )}
          {alias !== null && invite !== null && (
            <>
              <p>
                <em>ok, the group is ready, you can start sending messages</em>
              </p>
              <a className="invite" target="_blank" href={invite}>
                invite
              </a>
            </>
          )}
        </div>
        <input
          className="input"
          autoFocus
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (alias === null) {
              if (e.key === "Enter") {
                setAlias(input);
                setInput("");
              }
            }

            if (alias !== null && wallet === null) {
              if (e.key === "Enter") {
                setWallet(Wallet.createRandom());
              }
            }
          }}
          value={input}
        ></input>
      </div>
    </main>
  );
}

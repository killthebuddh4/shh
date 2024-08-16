import { create } from "zustand";
import { Signer } from "@killthebuddha/fig";
import { Whisper } from "@/lib/Whisper";

export const useOwnerStore = create<{
  alias: string | null;
  aliasInput: string;
  messageInput: string;
  wallet: Signer | undefined;
  members: Record<
    string,
    { alias: string; firstSeen: number; lastSeen: number; missedPings: number }
  >;
  isSending: boolean;
  messages: Whisper[];
  showInstructions: boolean;
  inviteUrlCopied: boolean;
}>(() => ({
  alias: null,
  aliasInput: "",
  messageInput: "",
  wallet: undefined,
  members: {},
  messages: [],
  isSending: false,
  showInstructions: false,
  inviteUrlCopied: false,
}));

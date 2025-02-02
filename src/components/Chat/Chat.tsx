"use client";

import type { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { useState, useEffect, useRef } from "react";
import { useSWRConfig } from "swr";
import fs from "fs";
import path from "path";

import { ChatHeader } from "@/components/Chat/ChatHeader";
import { generateUUID } from "@/lib/utils";

import { Messages } from "./Messages";
import { MultimodalInput as Input } from "../Chat/Input";

export function Chat({
  id,
  initialMessages,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<Message>;
  isReadonly: boolean;
}) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voice, setVoice] = useState<string[] | []>([]);
  const [audioMap, setAudioMap] = useState<{ [key: string]: string }>({});
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(
    null
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    reload,
    setInput,
    isLoading,
    append,
    stop,
  } = useChat({
    id,
    generateId: generateUUID,
    onFinish: async (message, options) => {
      const audio = await textToSpeech(message.content);
      setAudioUrl(audio);
      setAudioMap((prev) => ({ ...prev, [message.id]: audio }));
      playAudio(audio, message.id);
    },
  });

  async function textToSpeech(text: string) {
    const response = await fetch("/api/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, voiceId: "naRuRZocgjhLOw6ZAaEu" }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate speech");
    }

    const data = await response.json();

    return data.url;
  }

  const toggleAudio = (action: "play" | "pause") => {
    switch (action) {
      case "play":
        if (audioUrl) {
          playAudio(audioUrl, currentlyPlayingId ?? "");
        }
        break;
      case "pause":
        const audio = new Audio(audioUrl ?? undefined);
        audio.pause();
        break;
      default:
        console.error("Invalid action");
    }
  };

  const playAudio = (url: string, messageId: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(url);
    audioRef.current.play();
    setCurrentlyPlayingId(messageId);
  };

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader chatId={id} isReadonly={isReadonly} />

        <Messages
          chatId={id}
          isLoading={true}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
          voice={voice}
          audioMap={audioMap}
          currentlyPlayingId={currentlyPlayingId}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          {!isReadonly && (
            <Input
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={stop}
              messages={messages}
              setMessages={setMessages}
              append={append}
            />
          )}
        </form>
      </div>
    </>
  );
}

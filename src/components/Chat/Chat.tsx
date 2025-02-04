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
      setAudioMap((prev) => ({ ...prev, [message.id]: audio }));
    },
  });

  useEffect(() => {
    if (Object.keys(audioMap).length > 0) {
      const lastKey = Object.keys(audioMap).pop();
      if (lastKey) {
        toggleAudio(lastKey);
      }
    }
  }, [Object.keys(audioMap).length]);

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

  const toggleAudio = (messageId: string) => {
    const handleEnded = () => {
      setCurrentlyPlayingId(null);
    };

    if (audioRef.current) {
      if (currentlyPlayingId === messageId) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", handleEnded);
        setCurrentlyPlayingId(null);
      } else {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current = new Audio(audioMap[messageId]);
        audioRef.current.play();
        audioRef.current.addEventListener("ended", handleEnded);
        setCurrentlyPlayingId(messageId);
      }
    } else {
      audioRef.current = new Audio(audioMap[messageId]);
      audioRef.current.play();
      audioRef.current.addEventListener("ended", handleEnded);
      setCurrentlyPlayingId(messageId);
    }
  };

  console.log("currentPlayingId:", currentlyPlayingId);

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
          toggleAudio={toggleAudio}
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

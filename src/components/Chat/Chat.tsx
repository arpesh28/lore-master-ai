"use client";

import type { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { useState } from "react";
import { useSWRConfig } from "swr";

import { ChatHeader } from "@/components/Chat/ChatHeader";
import { generateUUID } from "@/lib/utils";

import { Messages } from "./Messages";
import { MultimodalInput as Input } from "../Chat/Input";

export function Chat({
  id,
  initialMessages,
  selectedModelId,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelId: string;
  isReadonly: boolean;
}) {
  const { mutate } = useSWRConfig();

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    reload,
  } = useChat({
    id,
    body: { id, modelId: selectedModelId },
    initialMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    onFinish: () => {
      mutate("/api/history");
    },
  });

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader
          chatId={id}
          selectedModelId={selectedModelId}
          isReadonly={isReadonly}
        />

        <Messages
          chatId={id}
          isLoading={isLoading}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
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
              attachments={attachments}
              setAttachments={setAttachments}
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

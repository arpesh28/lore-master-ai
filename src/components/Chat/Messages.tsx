import { ChatRequestOptions, Message } from "ai";
import { PreviewMessage, ThinkingMessage } from "./Message";
import { memo } from "react";
import { Overview } from "./Overview";
import React from "react";
import Image from "next/image";

interface MessagesProps {
  chatId: string;
  isLoading: boolean;
  messages: Array<Message>;
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  isReadonly: boolean;
  voice: string[];
  audioMap: { [key: string]: string };
  currentlyPlayingId: string | null;
  toggleAudio: (messageId: string) => void;
}

function PureMessages({
  chatId,
  isLoading,
  messages,
  setMessages,
  reload,
  isReadonly,
  voice,
  audioMap,
  currentlyPlayingId,
  toggleAudio,
}: MessagesProps) {
  return (
    <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4 w-full">
      {messages.length === 0 && <Overview />}

      {messages.map((message, index) => (
        <div key={message.id}>
          <PreviewMessage
            chatId={chatId}
            message={message}
            isLoading={isLoading && messages.length - 1 === index}
            setMessages={setMessages}
            reload={reload}
            isReadonly={isReadonly}
            voice={voice}
            audioMap={audioMap}
            currentlyPlayingId={currentlyPlayingId}
            toggleAudio={toggleAudio}
          />
        </div>
      ))}

      {isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkingMessage />}

      <div className="shrink-0 min-w-[24px] min-h-[24px]" />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.isLoading !== nextProps.isLoading) return false;
  if (prevProps.isLoading && nextProps.isLoading) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;

  return true;
});

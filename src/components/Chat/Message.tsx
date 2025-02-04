"use client";

import type { ChatRequestOptions, Message } from "ai";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useState } from "react";

import { cn } from "@/lib/utils";
import { SparklesIcon } from "../ui-radix/Icons";
import Image from "next/image";

const PurePreviewMessage = ({
  chatId,
  message,
  reload,
  isReadonly,
  voice,
  audioMap,
  currentlyPlayingId,
  toggleAudio,
}: {
  chatId: string;
  message: Message;
  isLoading: boolean;
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  isReadonly: boolean;
  voice: string[];
  audioMap: Record<string, string>;
  currentlyPlayingId: string | null;
  toggleAudio: (messageId: string) => void;
}) => {
  const [mode, setMode] = useState<"view" | "edit">("view");

  return (
    <AnimatePresence>
      <motion.div
        className="w-full mx-auto max-w-3xl px-4 group/message group"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={message.role}
      >
        <div
          className={cn(
            "flex gap-4 w-full group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl",
            {
              "w-full": mode === "edit",
              "group-data-[role=user]/message:w-fit": mode !== "edit",
            }
          )}
        >
          {message.role === "assistant" && (
            <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
              <div className="translate-y-px overflow-hidden w-8 h-8 rounded-full">
                <Image
                  src="/geralt.jpg"
                  alt="Geralt Icon"
                  className="object-cover"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 w-full ">
            {message.role === "assistant" && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 w-full">
                  <span className="font-semibold">Geralt</span>
                  <div className="flex items-center group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                    {message.role === "assistant" && audioMap[message.id] && (
                      <button
                        onClick={() => {
                          if (audioMap[message.id]) {
                            toggleAudio(message.id);
                          }
                        }}
                      >
                        {currentlyPlayingId ? (
                          <Image
                            src="/pause.png"
                            alt="Pause"
                            width={16}
                            height={16}
                          />
                        ) : (
                          <Image
                            src="/play.png"
                            alt="Play"
                            width={16}
                            height={16}
                          />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {message.content && mode === "view" && (
              <div className="flex flex-row gap-2 items-start">
                <div
                  className={cn(
                    "flex flex-col gap-4 text-gray-300 px-3 py-2 rounded-xl",
                    {
                      "bg-primaryMessage": message.role === "user",
                      "bg-primaryMessageAssistant":
                        message.role === "assistant",
                    }
                  )}
                >
                  {message.content as string}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    if (prevProps.message.content !== nextProps.message.content) return false;
    return false;
  }
);

export const ThinkingMessage = () => {
  const role = "assistant";

  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message "
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}
    >
      <div
        className={cx(
          "flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
          {
            "group-data-[role=user]/message:bg-muted": true,
          }
        )}
      >
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
          <SparklesIcon size={14} />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-4 text-muted-foreground">
            Thinking...
          </div>
        </div>
      </div>
    </motion.div>
  );
};

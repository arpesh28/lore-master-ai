"use client";

import { motion } from "framer-motion";
import { Button } from "../ui-radix/Button";
import { ChatRequestOptions, CreateMessage, Message } from "ai";
import { memo } from "react";

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: "I’ve got a contract to kill a griffin. ",
      label: "ny advice?",
      action:
        "What do you think about Yennefer and Triss? Do you love one more than the other?",
    },
    {
      title: "A village asked me to hunt a werewolf",
      label: `but I think it’s cursed. Can you do it for me?`,
      action: `On a scale of 1 to 10, how much does Dandelion annoy you?`,
    },
    {
      title: "Yennefer is in danger.",
      label: `But she doesn't want your help. Even if she die`,
      action: `Wind’s howling, Geralt. Do you ever get tired of saying that?`,
    },
    {
      title: "A monster’s lurking around the corner, ",
      label: "but the coin’s good. You in or out?",
      action:
        "How many times has Yennefer set something on fire just because she was mad?",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? "hidden sm:block" : "block"}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, "", `/chat/${chatId}`);

              append({
                role: "user",
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium text-wrap">
              {suggestedAction.action}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);

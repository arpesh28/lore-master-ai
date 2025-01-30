"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
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
      action: "I’ve got a contract to kill a griffin. Any advice?",
    },
    {
      title: "A village asked me to hunt a werewolf",
      label: `but I think it’s cursed. Can you do it for me?`,
      action: `A village asked me to hunt a werewolf, but I think it’s cursed. Can you do it for me?`,
    },
    {
      title: "Yennefer is in danger.",
      label: `But she doesn't want your help. Even if she die`,
      action: `Yennefer is in danger. But she doesn't want your help. Even if she die`,
    },
    {
      title: "A monster’s lurking around the corner, ",
      label: "but the coin’s good. You in or out?",
      action:
        "A monster’s lurking around the corner, but the coin’s good. You in or out?",
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
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);

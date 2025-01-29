"use client";

import { useRouter } from "next/navigation";

import { ModelSelector } from "@/components/Chat/ModalSelector";
import { memo } from "react";

function PureChatHeader({
  chatId,
  selectedModelId,
  isReadonly,
}: {
  chatId: string;
  selectedModelId: string;
  isReadonly: boolean;
}) {
  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-10 gap-2">
      {/* {!open && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
              onClick={() => {
                router.push("/");
                router.refresh();
              }}
            >
              <PlusIcon />
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      )} */}

      {!isReadonly && (
        <ModelSelector
          selectedModelId={selectedModelId}
          className="order-1 md:order-2"
        />
      )}
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});

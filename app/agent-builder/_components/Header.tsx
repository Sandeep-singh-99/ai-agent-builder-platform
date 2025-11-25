import { Button } from "@/components/ui/button";
import { Agent } from "@/types/AgentTypes";
import { ChevronLeft, Code, Play, X, Copy, Check } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from "@/components/ui/shadcn-io/code-block";
import type { BundledLanguage } from "@/components/ui/shadcn-io/code-block";

type Props = {
  agentDetail: Agent | undefined;
  previewHeader?: boolean;
};

export default function Header({ agentDetail, previewHeader = false }: Props) {
  const [open, setOpen] = useState(false);
  const publishAgent = useMutation(api.agent.PublishAgent);

  const handlePublish = async () => {
    if (!agentDetail?._id) return;

    try {
      await publishAgent({
        id: agentDetail._id,
        published: true,
      });
      setOpen(true);
      toast.success("Agent published successfully!");
    } catch (error) {
      toast.error("Failed to publish agent");
      console.error(error);
    }
  };

  const embedCode = `<script src="${process.env.NEXT_PUBLIC_APP_URL}/embed/${agentDetail?.agentId}.js"></script>`;

  const apiCode = `const res = await fetch('${process.env.NEXT_PUBLIC_APP_URL}/api/agent-chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    agentId: "${agentDetail?.agentId}",
    userId: <userId />,
    userInput: <userInput />,
  })
})

if (!res.body) return;

const reader = res.body.getReader();
const decoder = new TextDecoder();
let done = false;

while (!done) {
  const { value, done: doneReading } = await reader.read();
  done = doneReading;
  if (value) {
    const chunk = decoder.decode(value);
    console.log(chunk);
    // Process chunk...
  }
}`;

  const codeData = [
    {
      language: "javascript",
      filename: "api-client.js",
      code: apiCode,
    },
  ];

  return (
    <div className="w-full p-3 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <ChevronLeft className="h-8 w-8" />
        <h2 className="text-xl">{agentDetail?.name}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button variant={"ghost"}>
          <Code />
          Code
        </Button>
        {!previewHeader ? (
          <Link href={`/agent-builder/${agentDetail?.agentId}/preview`}>
            <Button>
              <Play />
              Preview
            </Button>
          </Link>
        ) : (
          <Link href={`/agent-builder/${agentDetail?.agentId}`}>
            <Button variant={"outline"}>
              <X />
              Close Preview
            </Button>
          </Link>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <Button onClick={handlePublish}>Publish</Button>
          <DialogContent className="sm:max-w-2xl h-[calc(100vh-10rem)] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Get Code</DialogTitle>
            </DialogHeader>
            <div className="">
              <CodeBlock data={codeData} defaultValue="javascript">
                <CodeBlockHeader>
                  <CodeBlockFiles>
                    {(item) => (
                      <CodeBlockFilename
                        key={item.language}
                        value={item.language}
                      >
                        {item.filename}
                      </CodeBlockFilename>
                    )}
                  </CodeBlockFiles>
                  <CodeBlockSelect>
                    <CodeBlockSelectTrigger>
                      <CodeBlockSelectValue />
                    </CodeBlockSelectTrigger>
                    <CodeBlockSelectContent>
                      {(item) => (
                        <CodeBlockSelectItem
                          key={item.language}
                          value={item.language}
                        >
                          {item.language}
                        </CodeBlockSelectItem>
                      )}
                    </CodeBlockSelectContent>
                  </CodeBlockSelect>
                  <CodeBlockCopyButton
                    onCopy={() => toast.success("Copied to clipboard")}
                    onError={() => toast.error("Failed to copy")}
                  />
                </CodeBlockHeader>
                <CodeBlockBody>
                  {(item) => (
                    <CodeBlockItem key={item.language} value={item.language}>
                      <CodeBlockContent
                        language={item.language as BundledLanguage}
                      >
                        {item.code}
                      </CodeBlockContent>
                    </CodeBlockItem>
                  )}
                </CodeBlockBody>
              </CodeBlock>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

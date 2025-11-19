"use client";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function CreateAgentSection() {
  const [openDialog, setOpenDialog] = useState(false);

  const CreateAgentMutation = useMutation(api.agent.CreateAgent);
  const [agentName, setAgentName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const CreateAgent = async () => {
    setLoading(true);
    const agentId = uuidv4();
    const results = await CreateAgentMutation({
      name: agentName ?? '',
      agentId: agentId,
    })
    setOpenDialog(false);
    setLoading(false);
    router.push(`/agent-builder/${agentId}`);
  }
  return (
    <div className="space-y-2 flex flex-col justify-center items-center mt-24">
      <h2 className="font-bold text-3xl">Create AI Agent</h2>
      <p>Build a AI Agent workflow with custom logic and tools</p>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger>
           <Button size={"lg"} variant={"secondary"}>
        <Plus />
        Create
      </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Agent Name</DialogTitle>
            <DialogDescription>
              <Input placeholder="Agent Name" value={agentName} onChange={(e) => setAgentName(e.target.value)} />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit" onClick={() => CreateAgent()} disabled={loading}>
              { loading && <Loader className="animate-spin" />}
              Create Agent
              </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

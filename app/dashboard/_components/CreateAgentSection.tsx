"use client";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Plus } from "lucide-react";
import React, { useContext, useState } from "react";
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
import { UserDetailContext } from "@/context/UserDetailContext";

export default function CreateAgentSection() {
  const [open, setOpen] = useState(false);
  const CreateAgentMutation = useMutation(api.agent.CreateAgent);
  const [agentName, setAgentName] = useState("");
  const [loading, setLoading] = useState(false);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const router = useRouter();

  const CreateAgent = async () => {
    setLoading(true);
    const agentId = uuidv4();
    const result = await CreateAgentMutation({
      agentId: agentId,
      name: agentName ?? "",
      userId: userDetail?._id
    });
    setOpen(false);
    setLoading(false);
    router.push(`/agent-builder/${agentId}`);
  };

  return (
    <div className="space-y-2 flex flex-col justify-center items-center mt-24">
      <h2 className="font-bold text-3xl">Create AI Agent</h2>
      <p>Build a AI Agent workflow with custom logic and tools</p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"lg"} variant={"secondary"}>
            <Plus />
            Create
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Agent Name</DialogTitle>
            <DialogDescription>
              <Input
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                id="agentName"
                placeholder="Agent Name"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"}>Cancel</Button>
            </DialogClose>
            <Button onClick={() => CreateAgent()} disabled={loading}>
              {loading && <Loader2Icon className="animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

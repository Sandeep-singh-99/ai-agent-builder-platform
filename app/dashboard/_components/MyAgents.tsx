"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { Agent } from "@/types/AgentTypes";
import { useConvex, useMutation } from "convex/react";
import { GitBranchPlus, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Id } from "@/convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function MyAgents() {
  const { userDetails } = useContext(UserDetailContext);
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const convex = useConvex();
  const deleteAgentMutation = useMutation(api.agent.DeleteAgent);
  const [deleteId, setDeleteId] = useState<Id<"AgentTable"> | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    userDetails && GetUserAgents();
  }, [userDetails]);

  const GetUserAgents = async () => {
    if (!userDetails) return;
    const results = await convex.query(api.agent.GetUserAgents, {
      userId: userDetails._id as Id<"UserTable">,
    });
    setAgentList(results);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteAgentMutation({ agentId: deleteId });
      toast.success("Agent deleted successfully");
      GetUserAgents();
      setOpenAlert(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete agent");
    }
  };

  return (
    <div className="w-full mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agentList.map((agent, index) => (
          <div
            key={index}
            className="p-3 border border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative bg-card text-card-foreground group"
          >
            <button
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-background/50 text-destructive opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={(e) => {
                e.preventDefault(); // Prevent Link navigation if wrapped
                setDeleteId(agent._id as Id<"AgentTable">);
                setOpenAlert(true);
              }}
            >
              <Trash2 className="h-4 w-4 cursor-pointer" />
            </button>
            <Link href={`/agent-builder/${agent.agentId}`} className="block">
              <GitBranchPlus className="bg-yellow-100 p-2 h-8 w-8 rounded-sm text-yellow-700" />
              <h2 className="mt-3 font-semibold text-lg">{agent.name}</h2>
              <h2 className="text-sm text-muted-foreground mt-2">
                {moment(agent._creationTime).fromNow()}
              </h2>
            </Link>
          </div>
        ))}
      </div>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              agent.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

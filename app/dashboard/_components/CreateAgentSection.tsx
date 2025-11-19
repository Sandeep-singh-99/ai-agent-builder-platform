"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

export default function CreateAgentSection() {
  const [openDialog, setOpenDialog] = useState(false);
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
              <Input placeholder="Agent Name" />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Create Agent</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { ToggleMode } from "./ToggleMode";
import { Button } from "@/components/ui/button";

export default function AppHeader() {
  return (
    <div className="flex justify-between items-center w-full p-4 shadow bg-sidebar">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <ToggleMode />
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <div className="hidden md:flex items-center gap-2">
            <SignInButton>
              <Button variant="outline">Login</Button>
            </SignInButton>
            <SignUpButton>
              <Button>SignUp</Button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}

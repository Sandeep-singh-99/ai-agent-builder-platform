import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AiAgentTab() {
  return (
    <div className="px-10 md:px-24 lg:px-32 mt-24">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="myagent">My Agents</TabsTrigger>
          <TabsTrigger value="template">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="myagent">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="template">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

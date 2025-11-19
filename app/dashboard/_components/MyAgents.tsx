"use client";

import { Card, CardContent } from "@/components/ui/card";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { Agent } from "@/types/AgentTypes";
import { useConvex } from "convex/react";
import { GitBranchPlus } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Id } from "@/convex/_generated/dataModel";

export default function MyAgents() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const convex = useConvex();

  useEffect(() => {
    userDetail && GetUserAgents();
  }, [userDetail]);

  const GetUserAgents = async () => {
    const results = await convex.query(api.agent.GetUserAgents, {
      userId: userDetail?._id as Id<"UserTable">, 
    });
    console.log("Results", results);
    
    setAgentList(results);
  };
  return (
    <div className="w-full mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agentList.map((agent, index) => (
          <Link
            href={`/agent-builder/${agent.agentId}`}
            key={index}
            className="p-3  border-2 rounded-2xl"
          >
            <GitBranchPlus className="bg-yellow-100 p-2 h-8 w-8 rounded-sm" />
            <h2 className="mt-3">{agent.name}</h2>
            <h2 className="text-sm text-gray-400 mt-2">
              {moment(agent._creationTime).fromNow()}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

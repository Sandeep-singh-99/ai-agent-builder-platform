"use client"
import { useEffect, useState } from "react";
import Header from "../../_components/Header";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Agent } from "@/types/AgentTypes";


export default function PreviewAgent() {
    const { agentId } = useParams();
    const convex = useConvex();
    const [agentDetail, setAgentDetail] = useState<Agent>();


    const GetAgentDetail = async () => {
        const results = await convex.query(api.agent.GetAgentById, {
          agentId: agentId as string,
        });
        setAgentDetail(results);
      };
    
      useEffect(() => {
        GetAgentDetail();
      }, []);
  return (
    <div>
        <Header previewHeader={true} agentDetail={agentDetail} />
    </div>
  )
}

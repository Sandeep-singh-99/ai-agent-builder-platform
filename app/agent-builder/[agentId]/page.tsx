"use client";
import React, { useContext, useEffect } from "react";
import Header from "../_components/Header";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  MiniMap,
  Controls,
  Panel,
  useOnSelectionChange,
  OnSelectionChangeParams,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import StartNode from "../_customNodes/StartNode";
import AgentNode from "../_customNodes/AgentNode";
import AgentToolsPanel from "../_components/AgentToolsPanel";
import { WorkflowContext } from "@/context/WorkflowContext";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Agent } from "@/types/AgentTypes";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import EndNode from "../_customNodes/EndNode";
import IfElseNode from "../_customNodes/IfElseNode";
import WhileNode from "../_customNodes/WhileNode";
import UserApprovalNode from "../_customNodes/UserApprovalNode";
import ApiNode from "../_customNodes/ApiNode";
import SettingPanel from "../_components/SettingPanel";

// const initialNodes = [
//   { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" }, type: 'StartNode' },
//   { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" }, type: 'AgentNode' },
// ];
// const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

export const nodeTypes = {
  StartNode: StartNode,
  AgentNode: AgentNode,
  EndNode: EndNode,
  IfElseNode: IfElseNode,
  WhileNode: WhileNode,
  UserApprovalNode: UserApprovalNode,
  ApiNode: ApiNode,
};

export default function AgentBuilder() {
  const {
    addedNodes,
    setAddedNodes,
    nodeEdges,
    setNodeEdges,
    setSelectedNode,
  } = useContext(WorkflowContext);

  const { agentId } = useParams();

  const convex = useConvex();

  const updateAgentDetail = useMutation(api.agent.UpdateAgentDetail);

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

  useEffect(() => {
    if (agentDetail) {
      setAddedNodes(agentDetail.nodes);
      setNodeEdges(agentDetail.edges);
    }
  }, [agentDetail]);

  const SaveNodeAndEdges = async (updatedNodes?: any, updatedEdges?: any) => {
    const result = await updateAgentDetail({
      //@ts-ignore
      id: agentDetail?._id,
      edges: updatedEdges ?? nodeEdges,
      nodes: updatedNodes ?? addedNodes,
    });
    toast.success("Saved!");
  };

  const onNodesChange = useCallback(
    (changes: any) =>
      setAddedNodes((nodesSnapshot: any) => {
        const updated = applyNodeChanges(changes, nodesSnapshot);
        return updated;
      }),
    [setAddedNodes]
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setNodeEdges((edgesSnapshot: any) =>
        applyEdgeChanges(changes, edgesSnapshot)
      ),
    [setNodeEdges]
  );
  const onConnect = useCallback(
    // @ts-ignore
    (params: any) =>
      setNodeEdges((edgesSnapshot: any) => addEdge(params, edgesSnapshot)),
    [setNodeEdges]
  );

  const onNodeSelect = useCallback(
    ({ nodes, edges }: OnSelectionChangeParams) => {
      setSelectedNode(nodes[0]);
    },
    []
  );

  useOnSelectionChange({
    onChange: onNodeSelect,
  });
  return (
    <div>
      <Header agentDetail={agentDetail} />
      <div style={{ width: "100vw", height: "90vh" }}>
        <ReactFlow
          nodes={addedNodes}
          edges={nodeEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(e, node) => setSelectedNode(node)}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          {/* @ts-ignore */}
          <Background variant="dots" gap={12} size={1} />
          <Panel position="top-left">
            <AgentToolsPanel />
          </Panel>

          <Panel position="top-right">
            <SettingPanel onSave={(nodes: any) => SaveNodeAndEdges(nodes)} />
          </Panel>
          <Panel position="bottom-center">
            <Button onClick={() => SaveNodeAndEdges()}>
              <Save /> Save
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

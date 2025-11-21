"use client"
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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import StartNode from "../_components/StartNode";
import AgentNode from "../_components/AgentNode";
import AgentToolsPanel from "../_components/AgentToolsPanel";
import { WorkflowContext } from "@/context/WorkflowContext";

// const initialNodes = [
//   { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" }, type: 'StartNode' },
//   { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" }, type: 'AgentNode' },
// ];
// const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

const nodeTypes = {
    StartNode: StartNode,
    AgentNode: AgentNode
}

export default function AgentBuilder() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const { addedNodes, setAddedNodes, nodeEdges, setNodeEdges } = useContext(WorkflowContext);

  useEffect(() => {
    addedNodes && setNodes(addedNodes)
    nodeEdges && setEdges(nodeEdges)
  }, [addedNodes])

  useEffect(() => {
    edges && setNodeEdges(edges);
  }, [edges])

  const SaveNodeAndEdges = () => {
    
  }

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) =>  
       { const updated =  applyNodeChanges(changes, nodesSnapshot) 
        setAddedNodes(updated)
        return updated
       }),
    [setAddedNodes]
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    // @ts-ignore
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );
  return (
    <div>
      <Header />
      <div style={{ width: "100vw", height: "90vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
              Settings panel
            </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

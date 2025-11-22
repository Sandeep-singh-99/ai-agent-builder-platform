import { WorkflowContext } from "@/context/WorkflowContext";
import React, { useContext } from "react";
import AgentSettings from "../_nodeSettings/AgentSettings";
import EndSettings from "../_nodeSettings/EndSettings";
import IfElseSetting from "../_nodeSettings/IfElseSetting";
import WhileSettings from "../_nodeSettings/WhileSettings";
import UserApprovalSettings from "../_nodeSettings/UserApprovalSettings";

export default function SettingPanel({
  onSave,
}: {
  onSave: (nodes: any) => void;
}) {
  const { selectedNode, setAddedNodes, setSelectedNode, nodeEdges } =
    useContext(WorkflowContext);

  const onUpdateNodeData = (formData: any) => {
    const updateNode = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        label: formData.name,
        settings: formData,
      },
    };
    setAddedNodes((prev: any) => {
      const updatedNodes = prev.map((node: any) =>
        node.id === selectedNode.id ? updateNode : node
      );
      onSave(updatedNodes); // Trigger save with new nodes
      return updatedNodes;
    });
    setSelectedNode(updateNode);
  };

  return (
    selectedNode && (
      <div className="p-5 bg-white rounded-2xl w-[350px] shadow">
        {selectedNode?.type === "AgentNode" && (
          <AgentSettings
            selectedNode={selectedNode}
            updateFormData={(value: any) => onUpdateNodeData(value)}
          />
        )}

        {selectedNode?.type === "EndNode" && <EndSettings selectedNode={selectedNode}
            updateFormData={(value: any) => onUpdateNodeData(value)} />}

        {selectedNode?.type === "IfElseNode" && <IfElseSetting selectedNode={selectedNode}
            updateFormData={(value: any) => onUpdateNodeData(value)} />}

        {selectedNode?.type === "WhileNode" && <WhileSettings selectedNode={selectedNode}
            updateFormData={(value: any) => onUpdateNodeData(value)} />}

        {selectedNode?.type === "UserApprovalNode" && <UserApprovalSettings selectedNode={selectedNode}
            updateFormData={(value: any) => onUpdateNodeData(value)} />}
      </div>
    )
  );
}

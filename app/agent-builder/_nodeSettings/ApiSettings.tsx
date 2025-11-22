import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ApiSettings({
  selectedNode,
  updateFormData,
}: {
  selectedNode: any;
  updateFormData: any;
}) {
  const [formData, setFormData] = useState({
    name: "",
    method: "get",
    url: "",
    apiKey: "",
    includeApiKey: true,
    bodyParams: "",
  });

  useEffect(() => {
    selectedNode && setFormData(selectedNode?.data?.settings);
  }, [selectedNode]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <h2 className="font-bold">API Agent</h2>
      <p className="text-gray-500 mt-1">
        Call an external API endpoint with your chosen method
      </p>

      <div className="mt-5 space-y-1">
        <Label>Name</Label>
        <Input
          placeholder="API Agent Name"
          value={formData?.name}
          onChange={(event) => handleChange("name", event.target.value)}
        />
      </div>

      <div className="mt-3 space-y-1">
        <Label>Request Method</Label>
        <Select
          onValueChange={(value) => handleChange("method", value)}
          value={formData?.method}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Method"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="get">GET</SelectItem>
            <SelectItem value="post">POST</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-3 space-y-1">
        <Label>API URL</Label>
        <Input
          placeholder="https://api.example.com"
          value={formData?.url}
          onChange={(event) => handleChange("url", event.target.value)}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <Label>Include API Key</Label>
        <Switch
          checked={formData?.includeApiKey}
          onCheckedChange={(checked) => handleChange("includeApiKey", checked)}
        />
      </div>

      {formData.includeApiKey && (
        <div className="mt-3 space-y-1">
          <Label>API Key</Label>
          <Input
            placeholder="API Key"
            value={formData?.apiKey}
            onChange={(event) => handleChange("apiKey", event.target.value)}
          />
        </div>
      )}

      {formData.method === "post" && (
        <div className="mt-3 space-y-1">
          <Label>Body Parameters (JSON)</Label>
          <Textarea
            placeholder='{"params1" : "value1", "params2" : "value2"}'
            value={formData?.bodyParams}
            onChange={(event) => handleChange("bodyParams", event.target.value)}
          />
        </div>
      )}

      <Button
        className="w-full mt-5"
        onClick={() => {
          updateFormData(formData);
          toast.success("API Settings Updated Successfully");
        }}
      >
        <Save />
        Save
      </Button>
    </div>
  );
}

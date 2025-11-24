import { LLMModel } from "@/config/GeminiAI";
import { NextRequest, NextResponse } from "next/server";

const PROMPT = `from this flow, generate a agent instruction prompt with all details along with
tools with all setting info in JSON format. Do not add any extra text just written JSON data.
make sure to mentioned parameters depends on get or post request.
only: {
  systemPrompt: "",
  primaryAgentName: "",
  agents: [
    {
      "id": "",
      "agent-id": "",
      "name": "",
      "model": "",
      "includeHistory": true/false,
      "output": {
        "result": "",
        "tool_id": "",
        "interaction": ""
      }
    }
  ],
  tools: [
    {
      "id": "",
      "name": "",
      "description": "",
      "method": "GET" | "POST",
      "url": "",
      "includeApiKey": true,
      "apiKey": "",
      "parameters": { "key": "dataType" },
      "usage": [],
      "assignedAgent": ""
    }
  ]
}`;


export async function POST(req: NextRequest) {
    const { jsonConfig } = await req.json();

    const response = await LLMModel.generateContent(PROMPT + jsonConfig);
    const result = response.response.text();

    let parsedJson;

    try {
        parsedJson = JSON.parse(result.replace('```json', '').replace('```', ''));
        return NextResponse.json(parsedJson);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to parse JSON' }, { status: 500 });
    }
}
import fetch from "node-fetch";

const API_URL = "https://api.qude.ai/api/agent";

export async function interactWithAgent(agentName: string, message: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/${agentName}/interact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Failed to interact with agent: ${response.statusText}`);
    }

    const data = await response.json();
    return data.reply || "No reply received.";
  } catch (error) {
    console.error("Error interacting with agent:", error);
    return "Error: Unable to process the request.";
  }
}

export async function getAgentDetails(agentName: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/${agentName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch agent details: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching agent details:", error);
    return null;
  }
}

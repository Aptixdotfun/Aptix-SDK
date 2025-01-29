import { interactWithAgent, getAgentDetails } from "../agent";
import { readInput, displayMessage } from "../utils";

async function main() {
  const agentName = readInput("Enter the agent name: ");
  const message = readInput("Enter your message: ");

  const details = await getAgentDetails(agentName);
  if (!details) {
    console.error("Agent not found or no details available.");
    return;
  }

  displayMessage(`Interacting with agent: ${details.name}`);
  displayMessage(`Agent Personality: ${details.personality || "Unknown"}`);

  const reply = await interactWithAgent(agentName, message);
  displayMessage(`Agent Reply: ${reply}`);
}

main().catch((error) => console.error("An error occurred:", error));

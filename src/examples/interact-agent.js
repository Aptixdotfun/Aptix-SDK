"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agent_1 = require("../src/agent");
const utils_1 = require("../src/utils");
async function main() {
    const agentName = (0, utils_1.readInput)("Enter the agent name: ");
    const message = (0, utils_1.readInput)("Enter your message: ");
    
    const details = await (0, agent_1.getAgentDetails)(agentName);
    if (!details) {
        console.error("Agent not found or no details available.");
        return;
    }
    (0, utils_1.displayMessage)(`Interacting with agent: ${details.name}`);
    (0, utils_1.displayMessage)(`Agent Personality: ${details.personality || "Unknown"}`);

    const reply = await (0, agent_1.interactWithAgent)(agentName, message);
    (0, utils_1.displayMessage)(`Agent Reply: ${reply}`);
}
main().catch((error) => console.error("An error occurred:", error));

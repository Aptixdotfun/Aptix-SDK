"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactWithAgent = interactWithAgent;
exports.getAgentDetails = getAgentDetails;
const node_fetch_1 = __importDefault(require("node-fetch"));
/** API URL */
const API_URL = "https://api.qude.ai/api/agent";
/**
 * Interact with a QudeAI agent.
 * @param agentName - The name of the agent.
 * @param message - The message to send to the agent.
 * @returns The agent's reply.
 */
async function interactWithAgent(agentName, message) {
    try {
        const response = await (0, node_fetch_1.default)(`${API_URL}/${agentName}/interact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });
        if (!response.ok) {
            throw new Error(`Failed to interact with agent: ${response.statusText}`);
        }
        const data = await response.json();
        return data.reply || "No reply received.";
    }
    catch (error) {
        console.error("Error interacting with agent:", error);
        return "Error: Unable to process the request.";
    }
}
/**
 * Get details of a QudeAI agent.
 * @param agentName - The name of the agent.
 * @returns The agent's details.
 */
async function getAgentDetails(agentName) {
    try {
        const response = await (0, node_fetch_1.default)(`${API_URL}/${agentName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch agent details: ${response.statusText}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error("Error fetching agent details:", error);
        return null;
    }
}

/**
 * Aptix SDK
 * 
 * Official SDK for interacting with Aptix AI agents on the Solana blockchain.
 * 
 * @module aptix-sdk
 * @version 1.2.4
 * @author Aptixdotfun <support@aptix.fun>
 * @license MIT
 */

import { 
  interactWithAgent, 
  getAgentDetails, 
  listAgents, 
  configureApi,
  AgentResponse,
  AgentDetails
} from "./agent";
import { displayMessage, readInput } from "./utils";

export {
  // Agent interaction
  interactWithAgent,
  getAgentDetails,
  listAgents,
  configureApi,
  
  // Types
  AgentResponse,
  AgentDetails,
  
  // Utilities
  displayMessage,
  readInput
};

// Default export for easier imports
export default {
  interactWithAgent,
  getAgentDetails,
  listAgents,
  configureApi,
  utils: {
    displayMessage,
    readInput
  }
};

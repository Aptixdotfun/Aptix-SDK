import fetch from "node-fetch";
import { displayMessage } from "./utils";

/**
 * Configuration for the Aptix API
 */
interface ApiConfig {
  baseUrl: string;
  apiKey?: string;
  timeout: number;
}

/**
 * Agent response interface
 */
export interface AgentResponse {
  reply: string;
  timestamp: string;
  processed: boolean;
}

/**
 * Agent details interface
 */
export interface AgentDetails {
  name: string;
  symbol: string;
  description: string;
  capabilities: string[];
  personality: string;
  version: string;
  social?: {
    twitter?: string;
    telegram?: string;
    discord?: string;
    github?: string;
  };
}

// Default API configuration
const defaultConfig: ApiConfig = {
  baseUrl: "https://api.aptix.fun/v1/agents",
  timeout: 30000
};

let apiConfig: ApiConfig = { ...defaultConfig };

/**
 * Configure the API settings
 * @param config - API configuration options
 */
export function configureApi(config: Partial<ApiConfig>): void {
  apiConfig = { ...defaultConfig, ...config };
}

/**
 * Interact with an Aptix AI agent
 * @param agentName - The name of the agent to interact with
 * @param message - The message to send to the agent
 * @returns Promise with the agent's response
 */
export async function interactWithAgent(agentName: string, message: string): Promise<AgentResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);
    
    const headers: Record<string, string> = { 
      "Content-Type": "application/json" 
    };
    
    if (apiConfig.apiKey) {
      headers["Authorization"] = `Bearer ${apiConfig.apiKey}`;
    }
    
    const response = await fetch(`${apiConfig.baseUrl}/${agentName}/interact`, {
      method: "POST",
      headers,
      body: JSON.stringify({ message }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to interact with agent (${response.status}): ${errorText || response.statusText}`);
    }

    const data = await response.json();
    return {
      reply: data.reply || "No reply received.",
      timestamp: new Date().toISOString(),
      processed: true
    };
  } catch (error: unknown) {
    const err = error as Error;
    if (err.name === 'AbortError') {
      displayMessage(`Request timeout after ${apiConfig.timeout/1000} seconds`);
      return {
        reply: "Error: Request timed out. Please try again later.",
        timestamp: new Date().toISOString(),
        processed: false
      };
    }
    
    console.error("Error interacting with agent:", err);
    return {
      reply: `Error: ${err.message || "Unable to process the request."}`,
      timestamp: new Date().toISOString(),
      processed: false
    };
  }
}

/**
 * Get details about an Aptix AI agent
 * @param agentName - The name of the agent
 * @returns Promise with the agent details
 */
export async function getAgentDetails(agentName: string): Promise<AgentDetails | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);
    
    const headers: Record<string, string> = {};
    if (apiConfig.apiKey) {
      headers["Authorization"] = `Bearer ${apiConfig.apiKey}`;
    }
    
    const response = await fetch(`${apiConfig.baseUrl}/${agentName}`, {
      headers,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch agent details (${response.status}): ${errorText || response.statusText}`);
    }
    
    return await response.json();
  } catch (error: unknown) {
    const err = error as Error;
    if (err.name === 'AbortError') {
      displayMessage(`Request timeout after ${apiConfig.timeout/1000} seconds`);
    } else {
      console.error("Error fetching agent details:", err);
    }
    return null;
  }
}

/**
 * List all available agents
 * @returns Promise with array of agent names
 */
export async function listAgents(): Promise<string[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);
    
    const headers: Record<string, string> = {};
    if (apiConfig.apiKey) {
      headers["Authorization"] = `Bearer ${apiConfig.apiKey}`;
    }
    
    const response = await fetch(`${apiConfig.baseUrl}`, {
      headers,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to list agents: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.agents || [];
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error listing agents:", err);
    return [];
  }
}

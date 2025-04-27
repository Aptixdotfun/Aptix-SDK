# Aptix SDK

A powerful SDK for interacting with Aptix AI agents deployed on the Solana blockchain.

## Features

- Simple API for agent interactions
- Typescript support
- Comprehensive error handling
- Examples included

## Installation

```bash
npm install aptix-sdk
```

## Usage

```typescript
import AptixSDK from 'aptix-sdk';

// Interact with an agent
async function main() {
  const response = await AptixSDK.interactWithAgent('Aura', 'What is the market cap of Solana?');
  console.log(response);
  
  // Get agent details
  const agentDetails = await AptixSDK.getAgentDetails('Aura');
  console.log(agentDetails);
}

main().catch(console.error);
```

## Documentation

For detailed documentation, see the examples folder or visit our [documentation](https://docs.aptix.fun).

## License

MIT License

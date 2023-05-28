# @bioneisme/greenfield-cli

---
Greenfield CLI tool, supporting commands to make requests to greenfield


## Disclaimer
**The software and related documentation are under active development, all subject to potential future change without
notification and not ready for production use. The code and security audit have not been fully completed and not ready
for any bug bounty. We advise you to be careful and experiment on the network at your own risk. Stay safe out there.**

## Prerequisites

- Node.js >= 16.14.0
- npm >= 8.1.0

## Installation

### NPM package

```
npm install -g @bioneisme/greenfield-cli
```

```
greenfield-cli -h
```

### Local build

```
git clone https://github.com/Bioneisme/bnb-greenfield-cli.git
cd bnb-greenfield-cli
npm install
npm start -h
```

## Basic Configuration

Command to configure environment variables
```
greenfield-cli system -h
```

!To use most of the commands, you need to set your account address with private key, configure the RPC URL endpoint and Chain ID!

Set account address with private key. The password is optional, if you don't set it, you will be prompted to enter it when you make a request.
Public key is your account address, private key is account private key.
```
greenfield-cli system set-key <public> <private> <password>
```

Private keys are encrypted using PBKDF2/SHA256 with a password and recorded in your local keystore.
```
macOS: ~/Library/Preferences/.greenfield/config.json
Windows: %APPDATA%\.greenfield\config.json
Linux: ~/.config/.greenfield/config.json (or $XDG_CONFIG_HOME/.greenfield/config.json)
```

Change RPC URL endpoint
```
greenfield-cli system rpc-url <url>
```

Change Chain ID
```
greenfield-cli system chain-id <id>
```

Change Storage Provider address
```
greenfield-cli system sp-address <address>
```

Display information about the current configuration
```
greenfield-cli system info
```

## Documentation
https://bioneisme.github.io/greenfield-cli-docs/docs/installation

# Auto Battle Cards: A MUD and DOJO game

Inspired by the game Super Auto Pets, ABC (Auto Battle Cards) game is a card strategy game powered by MUD and Dojo (EVM and StarknetVM)

### Prerequisites
___
1. Node (version 18 or higher)
https://nodejs.org/en/download

2. PNPM: package manager
```bash
# make sure node (type node -v) is in version 18 before proceeding
npm install -g pnpm
```
3. Dojo: https://book.dojoengine.org/getting-started/quick-start.html
```bash
curl -L https://install.dojoengine.org | bash
dojoup
```

4. Rust: https://www.rust-lang.org/tools/install
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

5. Foundry: https://book.getfoundry.sh/getting-started/installation
```bash
# Installs all dependency of the application
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

___
```bash
# Installs all dependency of the application
pnpm install
```
```bash
# Runs all dev commands from contracts, and client concurrently
pnpm dev
```

>_Note: Make sure that you are running this code on the root directory of your application_

>_Note: Make sure that all requisites are running, (MUD Contract, Client, Dojo, Katana, Torii)_

# Use Alpine Linux as the base image
FROM node:lts-alpine

# Install dependencies
RUN apk add --no-cache curl bash git

# Install Node.js and PNPM
RUN npm install -g pnpm@8

# Install Dojo
RUN curl -L https://install.dojoengine.org | bash
RUN source /root/.profile && dojoup
# RUN dojoup
# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Install Foundry
RUN curl -L https://foundry.paradigm.xyz | bash
RUN source /root/.profile && foundryup

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install application dependencies
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Expose necessary ports
EXPOSE 3000 8545 5050

# Command to run the application
CMD ["pnpm", "dev"]
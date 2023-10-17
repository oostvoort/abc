FROM node:18 as builder
WORKDIR /app

# Install prerequisites
RUN apt-get update && apt-get install -y \
    curl

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Set environment variables for Rust and Cargo
ENV PATH="/root/.cargo/bin:${PATH}"
ENV USER=root

# Install foundry
SHELL ["/bin/bash", "-c"]
RUN curl -L https://foundry.paradigm.xyz | bash
RUN source ~/.bashrc
ENV PATH="/root/.foundry/bin:${PATH}"

# Install pnpm
RUN npm install -g pnpm

COPY . .
RUN pnpm install
RUN pnpm prepare
RUN pnpm build

FROM caddy:2.7.5-alpine

# Copy built app to caddy directory
COPY --from=builder /app/packages/client/dist /usr/share/caddy

# Create Caddyfile
RUN echo ":8080 {\n root * /usr/share/caddy\n file_server\n}" > /etc/caddy/Caddyfile

# Run Caddy
ENTRYPOINT ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]

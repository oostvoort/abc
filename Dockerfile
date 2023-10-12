# Use Alpine Linux as the base image
FROM oostvoort/dojo:v0.2.2
SHELL ["/bin/bash", "-c"]
# Install dependencies
#RUN apk add --no-cache curl bash git
RUN apt install -y curl bash git nodejs npm

# Install Node.js and PNPM
RUN npm install -g pnpm@8

# Install Foundry
RUN curl -L https://foundry.paradigm.xyz | bash
RUN source /root/.bashrc && foundryup

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
# COPY package.json pnpm-lock.yaml ./
COPY . .
# Install application dependencies
RUN pnpm install

# Copy the rest of the application files


# RUN rm -rf packages/contracts/cache
# RUN rm -rf packages/contracts/node_modules
# RUN rm -rf packages/contracts/types
# Expose necessary ports
EXPOSE 3000 8545 5050

# Command to run the application
CMD ["pnpm", "dev"]
## Builder ##
FROM node:20-alpine3.18 as builder

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm -v

# Create app directory
WORKDIR /usr/src/app

# Copy files required for dependencies installation
COPY package.json pnpm-*.yaml tsconfig.json ./

# Install dependencies
RUN pnpm install 

# Copy the rest of the application code
COPY . .

# Run the build script from package.json for pawza backend
RUN pnpm build

# delete dependencies
RUN rm -rf node_modules
RUN pnpm install --prod

## Runner ##
FROM node:20-alpine3.18 as runner
WORKDIR /usr/src/app

# Copy deployed bundle
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 80

# Command to run the app
ENTRYPOINT ["node", "./dist/index.js"]

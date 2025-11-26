# ---------------------------
# 1) Build Stage
# ---------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build SvelteKit app
RUN npm run build


# ---------------------------
# 2) Production Runtime Stage
# ---------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only built output + package.json for runtime
COPY --from=builder /app/package.json ./
COPY --from=builder /app/build ./build

# Install only production dependencies
RUN npm install --omit=dev

# Default Port
EXPOSE 3000

# Run SvelteKit Preview Server
CMD ["node", "./build/index.js"]

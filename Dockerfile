FROM oven/bun:1-debian AS builder

WORKDIR /app

# Install Buf CLI for protobuf code generation
ARG BUF_VERSION=1.65.0
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && \
    curl -sSL "https://github.com/bufbuild/buf/releases/download/v${BUF_VERSION}/buf-Linux-$(uname -m)" -o /usr/local/bin/buf && \
    chmod +x /usr/local/bin/buf && \
    apt-get purge -y curl && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package.json bun.lock* ./

# Install dependencies with cache mount
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application with cache mount
RUN --mount=type=cache,target=/app/node_modules/.vite \
    bun run build

# Production stage
FROM oven/bun:1-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S bunuser -u 1001

# Copy built files from builder
COPY --from=builder --chown=bunuser:nodejs /app/dist /app/dist

# Copy the native Bun server
COPY --chown=bunuser:nodejs serve.ts /app/serve.ts

USER bunuser

EXPOSE 3000

# Serve with native Bun server
CMD ["bun", "run", "serve.ts"]

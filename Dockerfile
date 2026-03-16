# ─────────────────────────────────────────────
#  Stage 1: builder – install deps + build
# ─────────────────────────────────────────────
FROM oven/bun:1 AS builder
WORKDIR /app

# Copy manifests first for better layer caching
COPY bun.lock package.json turbo.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json  ./backend/

# Install all dependencies (root + workspaces)
RUN bun install --frozen-lockfile && \
    cd frontend && bun install --frozen-lockfile && \
    cd /app/backend && bun install --frozen-lockfile

# Copy full source
COPY . .

# Build both apps via Turborepo
RUN bunx turbo run build --filter=frontend --filter=backend

# ─────────────────────────────────────────────
#  Stage 2a: frontend runner
# ─────────────────────────────────────────────
FROM oven/bun:1-slim AS frontend

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN groupadd --system --gid 1001 nodejs && \
    useradd  --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static     ./frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/frontend/public           ./frontend/public
COPY --chown=nextjs:nodejs frontend/.env  ./frontend/.env

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "frontend/server.js"]

# ─────────────────────────────────────────────
#  Stage 2b: backend runner
# ─────────────────────────────────────────────
FROM oven/bun:1-slim AS backend

WORKDIR /app
ENV NODE_ENV=production

RUN groupadd --system --gid 1001 nodejs && \
    useradd  --system --uid 1001 --gid nodejs nestjs

COPY --from=builder --chown=nestjs:nodejs /app/backend/dist         ./backend/dist
COPY --from=builder --chown=nestjs:nodejs /app/backend/node_modules ./backend/node_modules
COPY --from=builder --chown=nestjs:nodejs /app/node_modules         ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json         ./package.json
COPY --chown=nestjs:nodejs backend/.env   ./backend/.env

USER nestjs
EXPOSE 4000
ENV PORT=4000

CMD ["bun", "backend/dist/main.js"]
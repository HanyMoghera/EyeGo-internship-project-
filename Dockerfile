# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 appuser
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src
USER appuser
EXPOSE 3000
CMD ["node", "./src/server.js"]

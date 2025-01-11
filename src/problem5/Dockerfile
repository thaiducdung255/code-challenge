FROM node:23-alpine3.20 AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml .
RUN npm install -g pnpm@9.15.3 && pnpm install
COPY . .
RUN pnpm build:production && pnpm install --prod

FROM node:23-alpine3.20 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/dist dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/.env.production .env
EXPOSE 3000
CMD ["npm", "run", "start:prod"]

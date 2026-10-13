FROM node:20-alpine AS base
WORKDIR /usr/src/app
RUN npm install --global pnpm@9.15.9

FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build && pnpm prune --prod

FROM node:20-alpine AS final
WORKDIR /usr/src/app
ENV NODE_ENV=production
USER node
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]

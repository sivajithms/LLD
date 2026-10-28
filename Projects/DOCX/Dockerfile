FROM node:22-alpine AS build

WORKDIR /app/server

COPY server/package.json server/package-lock.json ./
RUN npm ci

COPY server/src ./src
COPY server/tsconfig.json ./
RUN npm run build


FROM node:22-alpine AS production

ENV NODE_ENV=production
WORKDIR /app/server

COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/server/dist ./dist
COPY client /app/client
COPY server/document.json ./document.json

EXPOSE 3000

CMD ["node", "dist/server.js"]

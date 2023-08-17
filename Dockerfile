# development image
FROM node:18-alpine AS development
USER node
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm i
COPY . .
RUN npx prisma generate
RUN npm cache clean --force

# production image
FROM node:18-alpine AS build
USER node
WORKDIR /app
COPY --chown=node:node ./package*.json ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm i --omit=dev
RUN npm cache clean --force

# copy production files & start server
FROM node:18-alpine AS production
COPY --chown=node:node ./package*.json ./
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
RUN ls
CMD ["node", "dist/src/main.js"]

#RUN npm run docker:create-bridge
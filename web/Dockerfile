FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit dev --ignore-scripts

RUN npm cache clean --force

COPY . .

RUN npm run build

RUN npm prune --production

CMD ["node", "build"]

EXPOSE 3000
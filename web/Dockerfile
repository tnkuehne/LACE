FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --include dev --ignore-scripts

RUN npm cache clean --force

COPY . .

RUN npm run build

RUN npm prune --production

CMD ["node", "build"]

EXPOSE 3000
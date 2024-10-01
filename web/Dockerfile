FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV=production

RUN npm ci --omit dev --ignore-scripts

RUN npm cache clean --force

COPY . .

RUN npm run build

CMD ["node", "build"]

EXPOSE 3000
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build
ARG TAG=2.2
CMD [ "node", "dist/main.js" ]
RUN [ "sh", "-c", "echo $TAG" ]
ENV TAG='2.3'
EXPOSE 3000
FROM node:alpine
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./config.env ./config.env
COPY ./conn.js ./conn.js
COPY ./record.js ./record.js
COPY ./server.js ./server.js
RUN npm install
EXPOSE 5000
CMD ["node", "server.js"]
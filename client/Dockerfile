# use node alpine to reduce image size; otherwise too big
FROM node:alpine 
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./public ./public
COPY ./src ./src
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
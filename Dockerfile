FROM node:16
WORKDIR /usr/src/apps
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "main.js"]
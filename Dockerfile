FROM node:16
RUN mkdir -p /usr/src/apps
WORKDIR /usr/src/apps
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run" ,"dev" ]
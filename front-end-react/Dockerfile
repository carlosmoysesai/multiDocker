# Dockerfile para Front-end React
FROM node:18-alpine3.20
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app
CMD ["npm", "start"]
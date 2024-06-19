# Dockerfile para API Express
FROM node:18-alpine3.20
WORKDIR /app
COPY app.js /app/
COPY package.json /app/
RUN npm install
COPY . /app
CMD ["node", "app.js"]
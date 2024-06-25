# Dockerfile para Front-end React
FROM node:18-alpine3.20 as build
WORKDIR /app
COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

RUN npm install
RUN npm run build


FROM node:18-alpine3.20
WORKDIR /app
COPY --from=build /app/build /app/build
RUN npm install -g serve

CMD ["serve", "-s", "build"]


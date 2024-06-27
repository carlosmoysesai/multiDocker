# Dockerfile para Front-end React
FROM node:20.14.0-alpine3.20 as build
WORKDIR /app
COPY . /app/

RUN npm install
RUN npm run build


FROM node:20.14.0-alpine3.20
WORKDIR /app
COPY --from=build /app/build /app/build
RUN npm install -g serve

CMD ["serve", "-s", "build"]


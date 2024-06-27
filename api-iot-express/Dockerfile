# # Dockerfile para API Express
# FROM node:18-alpine3.20
# WORKDIR /app
# COPY app.js /app/
# COPY package.json /app/
# RUN npm install
# COPY . /app
# CMD ["node", "app.js"]

# # Base image for Node.js environment
# FROM node:18-alpine AS builder

# # Set working directory within the container
# WORKDIR /app

# # Copy package.json and package-lock.json (if present)
# COPY package*.json ./

# # Copy the entire source code (excluding node_modules)
# COPY . .

# # Build stage for a smaller final image
# FROM node:18-alpine

# # Copy only the required files
# COPY --from=builder /app ./

# # Install dependencies based on package.json
# RUN npm install
# RUN npm install -g nodemon

# # Expose the port
# EXPOSE 3001

# # Set working directory
# WORKDIR /app

# # Command to run the application
# CMD [ "npm", "start" ]

FROM node:20.14.0-alpine3.20

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
#RUN npm run build # Se você tiver um script de build para seu projeto

EXPOSE 3001

CMD ["node", "server.js"]
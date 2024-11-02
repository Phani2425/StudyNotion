FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Remove server directory from frontend
RUN rm -rf server

# Build the React application for production
RUN npm run build

# Use serve to host the built application
RUN npm install -g serve

EXPOSE 3000

# Command to serve the built app
CMD ["serve", "-s", "build"]

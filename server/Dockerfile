FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .


EXPOSE 4000

CMD ["npm", "run", "dev"]
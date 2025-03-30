# Use official Node.js image as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies, including Prisma
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate


# Build the application
RUN npm run build

# Expose the port
EXPOSE 8000

# Start the application
CMD ["npm", "run", "start:prod"]

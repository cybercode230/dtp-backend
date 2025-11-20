# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 5000

# Set environment variables (optional, can be overridden)
ENV PORT=5000
ENV DB_HOST=host.docker.internal
ENV DB_USER=root
ENV DB_PASS=your-database
ENV DB_NAME=dtp_db
ENV JWT_SECRET=yourjwtsecret

# Start the application
CMD ["node", "server.js"]

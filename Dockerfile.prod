# ===== Build stage =====
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ===== Runtime stage =====
FROM node:20

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose app port
EXPOSE 3000

# Start app
CMD ["node", "dist/main.js"]
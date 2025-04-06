# Gunakan image yang lebih stabil untuk native modules
FROM node:18-slim

# Install alat-alat build untuk bcrypt & native modules
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Salin package.json & package-lock.json
COPY package*.json ./

# Install dependencies untuk production
RUN npm install --only=production

# Salin semua file ke dalam image
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Buka port aplikasi
EXPOSE 4000

# Jalankan aplikasi
CMD ["npm", "run", "start:prod"]

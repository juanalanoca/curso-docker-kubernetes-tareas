# ========== ETAPA DE BUILD ==========
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el código fuente
COPY . .

# ========== ETAPA DE PRODUCCIÓN ==========
FROM node:18-alpine

WORKDIR /app

# Copiar solo node_modules y código desde la etapa builder
COPY --from=builder /node-docker-app/node_modules ./node_modules
COPY --from=builder /node-docker-app/app.js .

# Usar un usuario no-root para seguridad
USER node

# Exponer el puerto
EXPOSE 3000

# Variables de entorno
ENV PORT=3000

# Comando de inicio
CMD ["node", "app.js"]

# HEALTHCHECK (opcional)
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/ || exit 1

# Labels (metadata)
LABEL maintainer="tu@email.com"
LABEL version="1.0"

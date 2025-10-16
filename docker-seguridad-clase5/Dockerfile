# Stage 1: Build - Construye la aplicación y sus dependencias
FROM node:18 AS build
WORKDIR /app

# Copia solo package.json y package-lock.json para instalar dependencias primero
# Esto permite que Docker cachee esta capa si las dependencias no cambian
COPY src/package*.json ./
RUN npm install --production # Instala solo dependencias de producción

# Copia el resto del código fuente
COPY src/. .

# Stage 2: Production - Crea la imagen final, ligera y segura
FROM node:18-alpine

# Define un nuevo directorio de trabajo
WORKDIR /app

# a) Multi-Stage Build: Copia solo los artefactos necesarios del stage de 'build'
# Aquí copiamos los node_modules y el código fuente ya preparado
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/. .

# c) Usuario Non-Root: Crea un usuario sin privilegios y cambia el propietario de los archivos
# Es crucial para la seguridad, ya que el proceso no se ejecutará como root
RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001 appuser
RUN chown -R appuser:appuser /app
USER appuser

# d) Labels de Metadata: Añade información importante a la imagen
LABEL maintainer="tu-nombre" \
      version="1.0-optimizado" \
      description="Aplicación Node.js optimizada y segura para la Tarea 5." \
      security.scan="trivy" \
      security.non-root="true" \
      app.name="mi-app"

# Expone el puerto que usa la aplicación
EXPOSE 3000

# e) Health Check: Define cómo Docker puede verificar la salud del contenedor
# Usa wget para comprobar el endpoint /health de nuestra aplicación
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Comando para iniciar la aplicación
CMD ["npm", "start"]
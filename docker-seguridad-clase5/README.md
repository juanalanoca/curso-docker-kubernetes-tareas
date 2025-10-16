# Tarea 5 - Seguridad y Optimización de Imágenes Docker

## 1. Título y Descripción

**Nombre del proyecto:** `docker-seguridad-clase5`
**Descripción de la aplicación:** Esta es una aplicación web simple desarrollada en Node.js con Express, que se conecta a una base de datos MongoDB. Sirve como base para aplicar y demostrar técnicas de seguridad y optimización de imágenes Docker.
**Objetivo de optimización:** Reducir el tamaño de la imagen Docker, minimizar el número de vulnerabilidades de seguridad y mejorar las prácticas operativas mediante la implementación de multi-stage builds, imágenes base Alpine, usuarios non-root, health checks y labels de metadata.

## 2. Tecnologías Utilizadas

- Node.js 18 (inicialmente, luego alpine)
- Express.js
- Mongoose (ORM para MongoDB)
- MongoDB 6
- Docker & Docker Compose
- Trivy para escaneo de seguridad

## Antes de la Optimización (Baseline)

### Análisis de Línea Base

**Tamaño de imagen:**
```bash
docker images mi-app:baseline
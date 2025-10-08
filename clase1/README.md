## Clase 1 - Introducción a Containers y Docker

## Objetivo

Desplegar un servidor web con nginx usando Docker.

## Desarrollo

### 1. Ejecutar el container

docker run -d -p 8080:80 --name mi-servidor-web nginx


**Explicación:** Este comando crea y ejecuta un container con nginx en segundo plano (-d), mapeando el puerto 8080 de mi máquina al puerto 80 del container.

**Salida:**

0d69701218edb734969b46cb002472860397196f8972545b664442a7693c7fb3


### 2. Verificar que está corriendo
#### 2.1. comandos
docker ps


**Screenshot:**

![Container corriendo](screenshots/nginx_local_host8080web.png)

### 3. Acceder desde el navegador

Accedí a `http://localhost:8080` y obtuve:

![Nginx funcionando](screenshots/nginx_localhost_8080.png)


## Conclusiones

Aprendí a ejecutar containers en segundo plano y mapear puertos. Tuve una dificultad inicial con el puerto 8080 ocupado, lo resolví usando el puerto 8081 en su lugar, tambien funcionó matando el pid que usaba otro proceso con ese puerto.



## Tarea 1 - Configuración de Repositorio y Primer Desafío
## Parte 1: Configuración del Repositorio Personal
#### 2.1. comandos
git clone https://github.com/tu-usuario/curso-docker-kubernetes-tareas.git
cd curso-docker-kubernetes-tareas

mkdir -p clase1/screenshots

cat > .gitignore << 'EOF'
# Archivos del sistema
.DS_Store
Thumbs.db

# Logs
*.log

# Variables de entorno
.env
.env.local

# Archivos temporales
*.tmp
*.swp
EOF

git add .
git commit -m "mensaje al realizar modificaciones en cada tarea"
git push origin main


**Screenshot:**

![Container corriendo](screenshots/nginx_local_host8080web.png)

### 3. Acceder desde el navegador

Accedí a `http://localhost:8080` y obtuve:

![Nginx funcionando](screenshots/nginx_localhost_8080.png)


## Conclusiones

Aprendí a ejecutar containers en segundo plano y mapear puertos. Tuve una dificultad inicial con el puerto 8080 ocupado, lo resolví usando el puerto 8081 en su lugar, tambien funcionó matando el pid que usaba otro proceso con ese puerto.


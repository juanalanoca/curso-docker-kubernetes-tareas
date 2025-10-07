## Clase 1 - Introducción a Containers y Docker

## Objetivo

Desplegar un servidor web con nginx usando Docker.

## Desarrollo

### 1. Ejecutar el container

docker run -d -p 8080:80 --name mi-servidor-web nginx


**Explicación:** Este comando crea y ejecuta un container con nginx en segundo plano (-d), mapeando el puerto 8080 de mi máquina al puerto 80 del container.

**Salida:**

a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6


### 2. Verificar que está corriendo
	## 2.1. comandos
docker ps


**Screenshot:**

![Container corriendo](screenshots/docker-ps.png)

### 3. Acceder desde el navegador

Accedí a `http://localhost:8080` y obtuve:

![Nginx funcionando](screenshots/nginx-browser.png)

[... continúa con el resto]

## Conclusiones

Aprendí a ejecutar containers en segundo plano y mapear puertos. Tuve una dificultad inicial con el puerto 8080 ocupado, lo resolví usando el puerto 8081 en su lugar.

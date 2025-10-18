# Tarea 7: Namespaces, Configuración y Persistencia

**Curso:** Docker & Kubernetes - Clase 7
**Estudiante:** [Juan Carlos Alanoca]

En esta sesión profundizaremos en la organización de recursos con Namespaces, externalización de configuración con ConfigMaps y Secrets, y gestión de aplicaciones con estado usando StatefulSets con persistencia de datos
## Stack

## Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/juanalanoca/clase7.git
    cd [tu-repo]
    ```

2.  **Crear Namespace:**
    ```bash
    kubectl create namespace tarea-clase7
    ```

3.  **crear:**
    Crea un archivo llamado k8s/namespace.yaml con el siguiente contenido:
    ```bash
    kubectl apply -f k8s/namespace.yaml
    ```
    aplica:
    ```bash
    kubectl apply -f k8s/namespace.yaml
    ```
    

## Configurar

1.  **Para evitar escribir --namespace=tarea-clase7 en cada comando, configuraremos nuestro contexto de kubectl para usar este namespace por defecto:**
    ```bash
    kubectl config set-context --current --namespace=tarea-clase7
    ```

2.  **Verificar:**
    Confirma que el namespace ha sido creado y que tu contexto actual apunta a él
 ```bash
    kubectl config view --minify | grep namespace:
```


## Screenshots

Aquí se incluyen las capturas de pantalla de los pasos clave:

### Comprueba configuracion
![kubectl get all](screenshots/compruebaconfigmap.png)

### creando Secrets
![webapp](screenshots/creando_secret.png)

### Confirmando secrets
![webapp](screenshots/confirma_creacion_secret.png)

### Aplicando base de datos postgres
![pods detailed](screenshots/aplica_postgres.png)

### Verificando bases de datos creados 
![scaling](screenshots/verifica_postgres.png)


## Conceptos Aplicados

-   **DDescribe cada uno de los pasos que seguiste, similares a los de esta guía.
-   **Crear namespace: kubectl apply -f k8s/namespace.yaml
-   **Configurar contexto: kubectl config set-context --current --namespace=tarea-clase7
-   **Aplicar ConfigMap: kubectl apply -f k8s/configmap.yaml
-   **Aplicar Secret: kubectl apply -f k8s/secret.yaml (recuerda que para GitHub sería secret.yaml.example)
-   **Aplicar Headless Service: kubectl apply -f k8s/postgres-headless.yaml
-   **Aplicar StatefulSet: kubectl apply -f k8s/postgres-statefulset.yaml
-   **Verificar que todo está corriendo: kubectl get all -n tarea-clase7
-   **Probar PostgreSQL: Conectarse y crear datos.
-   **Demostrar persistencia: Eliminar pod y verificar datos.


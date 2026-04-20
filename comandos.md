# 🚀 Comandos para el Reto Docker

## 📋 Paso a Paso

### 1. Construir la imagen Docker
```bash
cd usuario-service
docker build -t usuario-service:latest .
```

### 2. Crear red personalizada
```bash
docker network create ms-net
```

### 3. Ejecutar con Docker Compose (Desarrollo)
```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down
```

### 4. Verificar comunicación (Testing)
```bash
# Healthcheck
curl http://localhost:8080/health

# Crear usuario
curl -X POST http://localhost:8080/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test User","correo":"test@email.com"}'

# Obtener todos los usuarios
curl http://localhost:8080/api/usuarios

# Obtener usuario por ID
curl http://localhost:8080/api/usuarios/{id}

# Actualizar usuario
curl -X PUT http://localhost:8080/api/usuarios/{id} \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Updated User","correo":"updated@email.com"}'

# Eliminar usuario
curl -X DELETE http://localhost:8080/api/usuarios/{id}
```

## 🐳 Docker Swarm (Producción)

### 5. Inicializar Swarm
```bash
# Inicializar swarm
docker swarm init

# Ver nodos
docker node ls
```

### 6. Desplegar Stack
```bash
# Desplegar stack
docker stack deploy -c docker-stack.yml microservice

# Ver servicios del stack
docker stack services microservice

# Ver réplicas
docker service ls

# Ver logs del servicio
docker service logs microservice_usuario-api

# Escalar servicio
docker service scale microservice_usuario-api=5
```

### 7. Monitoreo y gestión
```bash
# Ver estado del stack
docker stack ps microservice

# Ver detalles de un servicio
docker service inspect microservice_usuario-api

# Actualizar servicio
docker service update --image usuario-service:v2 microservice_usuario-api

# Remover stack
docker stack rm microservice
```

## 🔍 Verificación de réplicas

### Comandos de evidencia
```bash
# Listar servicios con réplicas
docker service ls

# Ver tareas del stack
docker stack services microservice

# Ver distribución de contenedores
docker service ps microservice_usuario-api

# Ver logs de todas las réplicas
docker service logs -f microservice_usuario-api
```

## 🧪 Testing endpoints

### Datos de prueba
```json
{
  "nombre": "Juan Pérez",
  "correo": "juan.perez@email.com"
}
```

### Respuesta esperada
```json
{
  "id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "nombre": "Juan Pérez",
  "correo": "juan.perez@email.com"
}
```
# Microservicio CRUD de Usuarios

Microservicio reactivo desarrollado con **Spring Boot WebFlux** y **MongoDB**, contenerizado con **Docker** y orquestado con **Docker Swarm**.

---

## Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cliente       │───▶│  Usuario API    │───▶│    MongoDB      │
│ (Postman/Curl)  │    │ Spring WebFlux  │    │   Reactive DB   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## Stack Tecnológico

- **Backend:** Spring Boot 3.5.13 + WebFlux (reactivo)
- **Base de datos:** MongoDB 7.0
- **Contenedores:** Docker
- **Orquestación:** Docker Swarm
- **Validación:** Bean Validation
- **Logs:** SLF4J + Logback

---

## Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Listar usuarios |
| GET | `/api/usuarios/{id}` | Usuario por ID |
| POST | `/api/usuarios` | Crear usuario |
| PUT | `/api/usuarios/{id}` | Actualizar usuario |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario |
| GET | `/health` | Health check |
| GET | `/status` | Estado del servicio |

---

## Ejecución del Proyecto

### 1. Clonar repositorio

```bash
git clone <repo>
cd fri241_T09_ms-docker-swarm
```

### 2. Generar el `.jar`

```bash
./mvnw clean package -DskipTests
```

### 3. Construir imagen Docker

```bash
docker build -t usuario-service .
```

### 4. Inicializar Swarm

```bash
docker swarm init
```

### 5. Desplegar stack

```bash
docker stack deploy -c docker-compose.yml microservice
```

### 6. Ver servicios

```bash
docker service ls
```

**Esperado - debe esperar aveces tarda de 10 a 20 segundos:** `3/3 replicas`

---

## Pruebas

```bash
curl http://localhost:8080/health
```

---

## Modelo de Datos

```json
{
  "_id": "ObjectId",
  "nombre": "string",
  "correo": "string"
}
```

---

## Docker

- **Red:** `ms-net`
- **Volumen:** `mongodb_data`
- Healthchecks activos
- Réplicas en Swarm

---

## Limpieza Total del Entorno Docker (PowerShell)

> **IMPORTANTE:** Estos comandos eliminan contenedores, imágenes, redes y volúmenes. Usar solo para limpieza total del entorno de pruebas.

### 1. Salir de Swarm

```powershell
docker swarm leave --force
```

### 2. Eliminar contenedores

```powershell
docker ps -aq | ForEach-Object { docker rm -f $_ }
```

### 3. Eliminar imágenes

```powershell
docker images -aq | ForEach-Object { docker rmi -f $_ }
```

### 4. Limpiar redes y volúmenes

```powershell
docker network prune -f
docker volume prune -f
```

### 5. Limpieza total del sistema

```powershell
docker system prune -a --volumes -f
```

### 6. (Opcional) Eliminar stack activo

```powershell
docker stack rm microservice
```

---

## Verificación Final

```powershell
docker ps -a
docker images
docker volume ls
docker network ls
```

> Si la limpieza fue correcta, la mayoría de resultados deberían estar vacíos.

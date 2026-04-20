# 🧩 Microservicio CRUD de Usuarios

Microservicio reactivo desarrollado con **Spring Boot WebFlux** y **MongoDB**, contenerizado con **Docker** y orquestado con **Docker Swarm**.

## Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cliente       │───▶│  Usuario API    │───▶│    MongoDB      │
│  (curl/Postman)│    │ (Spring WebFlux)│    │   (Reactive)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Stack Tecnológico

- **Backend**: Spring Boot 3.5.13 + WebFlux (Reactivo)
- **Base de Datos**: MongoDB 7.0
- **Contenedores**: Docker + Docker Compose
- **Orquestación**: Docker Swarm
- **Validación**: Bean Validation
- **Logging**: SLF4J + Logback

## 📋 Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Obtener todos los usuarios |
| GET | `/api/usuarios/{id}` | Obtener usuario por ID |
| POST | `/api/usuarios` | Crear nuevo usuario |
| PUT | `/api/usuarios/{id}` | Actualizar usuario |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario |
| GET | `/health` | Health check |
| GET | `/status` | Estado del servicio |

## 🚀 Ejecución Rápida

### Con Docker Compose
```bash
# Clonar y entrar al directorio
cd usuario-service

# Levantar servicios
docker-compose up -d

# Verificar
curl http://localhost:8080/health
```

### Con Docker Swarm
```bash
# Construir imagen
docker build -t usuario-service:latest .

# Inicializar swarm
docker swarm init

# Desplegar stack
docker stack deploy -c docker-stack.yml microservice

# Verificar réplicas
docker service ls
```

## 📊 Modelo de Datos

### Colección: `usuarios`
```json
{
  "_id": "ObjectId",
  "nombre": "string (2-100 chars)",
  "correo": "string (email válido, único)"
}
```

## 🔧 Variables de Entorno

| Variable | Valor por defecto | Descripción |
|----------|-------------------|-------------|
| `MONGO_HOST` | localhost | Host de MongoDB |
| `MONGO_PORT` | 27017 | Puerto de MongoDB |
| `MONGO_DATABASE` | usuarios_db | Nombre de la BD |
| `MONGO_USERNAME` | admin | Usuario de MongoDB |
| `MONGO_PASSWORD` | admin123 | Contraseña de MongoDB |

## 🐳 Configuración Docker

### Dockerfile
- **Multi-stage build** (build + runtime)
- **Usuario no-root** para seguridad
- **Healthcheck** integrado
- **Imagen base**: openjdk:17-alpine

### Docker Compose
- **Red personalizada**: `ms-net`
- **Volumen persistente**: `mongodb_data`
- **Healthchecks** para ambos servicios
- **Dependencias** configuradas

### Docker Swarm
- **3 réplicas** del API
- **1 réplica** de MongoDB
- **Políticas de reinicio** automático
- **Límites de recursos** configurados
- **Rolling updates** habilitados

## 🧪 Testing

### Crear usuario
```bash
curl -X POST http://localhost:8080/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","correo":"juan@email.com"}'
```

### Obtener usuarios
```bash
curl http://localhost:8080/api/usuarios
```

## 📈 Monitoreo

- **Health endpoint**: `/health`
- **Actuator**: Métricas de Spring Boot
- **Logs estructurados**: JSON format
- **Docker healthchecks**: Automáticos

## 🎯 Características Implementadas

✅ **Microservicio CRUD completo**  
✅ **Stack 100% reactivo** (WebFlux + MongoDB Reactive)  
✅ **Contenerización** con Docker  
✅ **Orquestación** con Docker Swarm  
✅ **Persistencia** con volúmenes  
✅ **Red personalizada** bridge/overlay  
✅ **Healthchecks** integrados  
✅ **Réplicas** y balanceo de carga  
✅ **Políticas de reinicio** automático  
✅ **Datos de prueba** precargados  

## 🏆 BONUS Implementados

✅ **Healthchecks** en Dockerfile y Compose  
✅ **Endpoints** `/health` y `/status`  
✅ **Políticas de reinicio** automático  
✅ **Límites de recursos** configurados  
✅ **Rolling updates** en Swarm  
✅ **Usuario no-root** para seguridad  

---

**¡Microservicio listo para producción! 🚀**
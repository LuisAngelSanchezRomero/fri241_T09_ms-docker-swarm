// Base de datos para Usuario Service
db = db.getSiblingDB('usuarios_db');

// Crear colección usuarios
db.createCollection('usuarios');

// Crear índice único para el correo
db.usuarios.createIndex({ "correo": 1 }, { unique: true });

// Insertar datos
db.usuarios.insertMany([
    {
        "nombre": "Juan Pérez",
        "correo": "juan.perez@email.com"
    },
    {
        "nombre": "María García",
        "correo": "maria.garcia@email.com"
    },
    {
        "nombre": "Carlos López",
        "correo": "carlos.lopez@email.com"
    }
]);

print("Base de datos usuarios_db creada");
print("Total usuarios:", db.usuarios.countDocuments());
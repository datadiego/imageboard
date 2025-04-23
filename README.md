# Imageboard

## Introduccion

Este proyecto es un imageboard que permite a los usuarios:

- Crear hilos en tablones
- Dejar imagenes a los hilos
- Comentar en los hilos
- Dejar imagenes en los comentarios
- Solo los usuarios pueden interactuar con los tablones
- Los usuarios pueden registrarse con nombre y contraseña
- Los usuarios pueden logearse usando sus credenciales
- Los usuarios pueden ver su perfil

## Tecnologias

- Nodejs, estamos usando ESM en lugar de CommonJS, esto hace que:
  - Usaremos import/export en lugar de require/module.exports
  - Debemos añadir `type: "module"` en el package.json
- Express para el backend
- Sequelize como ORM para la base de datos
- SQLite como base de datos para usuarios y mensajes
- SQLite como base de datos para las sesiones
- bcrypt para hashea las contraseñas
- multer para subir las imagenes
- nunjucks como motor de plantillas

## Iniciar app


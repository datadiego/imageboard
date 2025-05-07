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

```bash
npm init -y
```

Modificamos el package.json para configurar el uso de modulos ESM

```json
{
  "type": "module"
}
```
Instalamos las dependencias que usaremos en el proyecto

```bash
npm install express sequelize bcrypt  connect-sqlite3
```

- express: framework para el backend
- sequelize: ORM para la base de datos
- bcrypt: libreria para hashear contraseñas
- connect-sqlite3: libreria para usar sqlite como base de datos para las sesiones y usuarios
- multer: libreria para subir archivos
- nunjucks: motor de plantillas para el frontend

Necesitaremos más dependencias para el proyecto, pero las iremos instalando a medida que las necesitemos.

## Estructura del proyecto

```bash
.
├── db
│   ├── database.sqlite
│   ├── init.js
│   ├── populate.js
│   └── sequelize.js
├── index.js
├── models
│   └── user.js
├── node_modules
│   └── ...
├── package.json
├── package-lock.json
├── README.md
└── views
    └── test.njk
```

### database.sqlite

La base de datos como tal.

Puedes interactuar con ella usando el cliente de sqlite3 desde la terminal o visualizarla con SQLite Viewer en vscode.

### init.js

El script de inicialización para la base de datos:

```js
import { sequelize } from "./sequelize.js";
import { User } from "../models/user.js";

const initializeDB = async () => {
    try{
        await sequelize.sync({ force: true });
    } catch(error) {
        console.error("Error initializing the database:", error);
    }
};

initializeDB()
```

En este script creamos una funcion asincrona que cogerá cualquier modelo importado  y lo sincronizará con la base de datos mediante `sequelize.sync()`.

La opción `force: true` eliminará cualquier tabla existente y creará una nueva tabla con la estructura definida en el modelo. Es útil para poder probar cambios en tus modelos sin tener que eliminar manualmente las tablas de la base de datos. Sin embargo, ten en cuenta que esto eliminará todos los datos existentes en esas tablas, así que desactivalo en producción o cuando no necesites la funcionalidad durante el desarrollo.

### populate.js

El script que usaremos para iniciar algunos datos de prueba en la base de datos.

### sequelize.js

```js
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "db/database.sqlite",
    logging: false,
})
```

En este script creamos la instancia de sequelize que usaremos para interactuar con la base de datos en los demas scripts, asi que nos aseguramos de exportarla, de lo contrario, archivos como `db/init.js` o `models/user.js` no podrian hacer uso de ella.

>Recuerda que tienes dos formas de exportar cuando usas ESM, puedes usar `export default` o `export const`, en este caso usamos `export const` para poder importar la instancia de sequelize en otros archivos directamente sin tener que hacer una desestructuracion.

### models/user.js

Nuestro primer (y por ahora unico) modelo, el modelo.

```js
import { Sequelize } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

export const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: "users",
});
```

Necesitaremos tanto la clase `Sequelize` como la instancia de sequelize que creamos en `db/sequelize.js`, por lo que importamos ambas.

`Sequelize` incluye los tipos de datos que usamos para definir los campos de la tabla:

- `Sequelize.INTEGER`: tipo de dato entero
- `Sequelize.STRING`: tipo de dato string
- `Sequelize.BOOLEAN`: tipo de dato booleano

Este es el unico uso que le damos a la clase `Sequelize`, pero aqui tienes la referencia de los tipos de datos que puedes usar: [Tipos de datos de Sequelize](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)

El modelo es el equivalente a esta expresion SQL:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username STRING NOT NULL UNIQUE,
    password STRING NOT NULL
);
```
# Apuntes 
- nodemon es lo mismo que node pero node para actualizar cosas necesitas reiniciarlo, nodemon lo actualiza todo en tiempo real
- hay que poner en orden los populate
- "start": "nodemon -e js,html,css,njk,json index.js", (esto en el package.json sirve para hacer el npm run start)

# Errores
- aparece en json el usuario y cuando refrescas sale en nunjks
- contraseñas en el input


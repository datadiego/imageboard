# Apuntes del Proyecto Imageboard

## Introducción

Este proyecto es un **imageboard** que permite a los usuarios interactuar con tablones, crear hilos, subir imágenes y comentar. A continuación, se detallan todos los archivos del proyecto, sus funciones y cómo trabajan juntos.

---

## Archivos `.js`

### **`index.js`**
- **Propósito**: Configura el servidor Express, el motor de plantillas Nunjucks y las sesiones. También importa y utiliza los routers para manejar las rutas principales.
- **Funciones principales**:
  - **Configuración de Nunjucks**:
    ```javascript
    const env = nunjucks.configure("views", {
        autoescape: true,
        express: app,
    });
    ```
    Configura Nunjucks como motor de plantillas para renderizar vistas desde la carpeta `views`. La opción `autoescape` protege contra inyecciones de código HTML.
  - **Configuración de sesiones**:
    ```javascript
    const sessionConfig = {
        store: sessionStore,
        secret: "1234",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    };
    app.use(session(sessionConfig));
    ```
    Configura las sesiones para que se almacenen en SQLite. La cookie de sesión tiene una duración de 24 horas.
  - **Routers**:
    ```javascript
    app.use("/users", usersRouter);
    app.use("/", pagesRouter);
    app.use("/auth", authRouter);
    ```
    Define las rutas principales de la aplicación (`/users`, `/`, `/auth`) y las asocia con los routers correspondientes.

---

### **`db/init.js`**
- **Propósito**: Inicializa la base de datos SQLite y sincroniza los modelos definidos en Sequelize.
- **Funciones principales**:
  - **`initializeDB`**:
    ```javascript
    const initializeDB = async () => {
        try {
            await sequelize.sync({ force: true });
            console.log("Database initialized");
        } catch (error) {
            console.error("Error initializing database:", error);
        }
    };
    ```
    Sincroniza los modelos con la base de datos. La opción `force: true` elimina y recrea las tablas, útil para desarrollo pero no para producción.

---

### **`db/populate.js`**
- **Propósito**: Llena la base de datos con datos de prueba.
- **Funciones principales**:
  - **Crear usuarios de prueba**:
    ```javascript
    const populateUsers = async () => {
        const users = ["admin", "user1", "user2"];
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user + "pass", 10);
            await User.create({
                username: user,
                password: hashedPassword,
            });
        }
    };
    populateUsers();
    ```
    Crea usuarios con contraseñas encriptadas usando `bcrypt`.

---

### **`db/sequelize.js`**
- **Propósito**: Configura Sequelize para usar SQLite como base de datos.
- **Funciones principales**:
  - **Instancia de Sequelize**:
    ```javascript
    export const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './db/database.sqlite',
        logging: false,
    });
    ```
    Configura Sequelize para usar SQLite como base de datos. El archivo de la base de datos se almacena en `./db/database.sqlite`.

---

### **`models/user.js`**
- **Propósito**: Define el modelo `User` con Sequelize.
- **Funciones principales**:
  - **Definición del modelo**:
    ```javascript
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
    Define los campos `id`, `username` y `password` con sus respectivas validaciones. El campo `username` debe ser único.

---

### **`models/auth.js`**
- **Propósito**: Contiene la lógica de autenticación.
- **Funciones principales**:
  - **`authenticateUser`**:
    ```javascript
    export const authenticateUser = async (username, password) => {
        const user = await User.findOne({ where: { username } });
        if (!user) return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid ? user : null;
    };
    ```
    Verifica las credenciales del usuario y devuelve el usuario si son válidas, o `null` si no lo son.

---

### **`middleware/auth.js`**
- **Propósito**: Middleware para verificar si un usuario está autenticado.
- **Funciones principales**:
  - **`isAuthenticated`**:
    ```javascript
    export const isAuthenticated = (req, res, next) => {
        if (req.session.userId) {
            return next();
        }
        res.render("unauthorized.njk");
    };
    ```
    Verifica si hay un usuario autenticado en la sesión. Si no lo hay, redirige a la página de error.

---

### **`routes/users.js`**
- **Propósito**: Define rutas relacionadas con los usuarios.
- **Funciones principales**:
  - **`GET /users`**:
    ```javascript
    router.get("/", async (req, res) => {
        const users = await User.findAll();
        res.render("test", { users });
    });
    ```
    Obtiene todos los usuarios de la base de datos y los renderiza en una vista.
  - **`POST /users`**:
    ```javascript
    router.post("/", async (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json(user);
    });
    ```
    Crea un nuevo usuario con contraseña encriptada.

---

### **`routes/pages.js`**
- **Propósito**: Define rutas para las páginas principales.
- **Funciones principales**:
  - **`GET /register`**:
    Renderiza el formulario de registro.
  - **`GET /login`**:
    Renderiza el formulario de inicio de sesión.
  - **`GET /profile`**:
    Renderiza el perfil del usuario autenticado.

---

### **`routes/auth.js`**
- **Propósito**: Define rutas relacionadas con la autenticación.
- **Funciones principales**:
  - **`POST /auth/login`**:
    ```javascript
    router.post("/login", async (req, res) => {
        const { username, password } = req.body;
        const user = await authenticateUser(username, password);
        if (!user) return res.status(401).redirect("/login");
        req.session.userId = user.id;
        res.redirect("/profile");
    });
    ```
    Verifica las credenciales del usuario y crea una sesión si son válidas.

---

## Archivos `.njk`

### **`base.njk`**
- **Propósito**: Plantilla base para las demás vistas.
- **Bloques principales**:
  ```html
  <body>
    {% block content %}{% endblock %}
  </body>
  ```

---

### **`login.njk`**
- **Propósito**: Formulario para iniciar sesión.
- **Estructura**:
  ```html
  <form action="/auth/login" method="POST">
    <input type="text" name="username" required>
    <input type="password" name="password" required>
    <button type="submit">Login</button>
  </form>
  ```

---

### **`register.njk`**
- **Propósito**: Formulario para registrarse.
- **Estructura**:
  Similar al formulario de inicio de sesión, pero envía los datos a `/users`.

---

### **`profile.njk`**
- **Propósito**: Muestra el perfil del usuario autenticado.
- **Estructura**:
  ```html
  <h1>Perfil</h1>
  <p>Bienvenido, {{ user }}!</p>
  ```

---

### **`test.njk`**
- **Propósito**: Muestra una tabla con los usuarios registrados.
- **Estructura**:
  ```html
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>pass</th>
      </tr>
    </thead>
    <tbody>
      {% for user in users %}
      <tr>
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.pass }}</td>
      </tr>
      {% endfor %}
    </tbody>
  </table>
  ```

---

## Archivos `.sqlite`

### **`db/database.sqlite`**
- **Propósito**: Almacena los datos de los usuarios y cualquier otra información definida en los modelos Sequelize.

### **`db/sessions.sqlite`**
- **Propósito**: Almacena las sesiones de usuario. Gestionado automáticamente por `connect-sqlite3`.

---

¡Estudia estos apuntes para entender cómo funciona cada parte del proyecto!
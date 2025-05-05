# Autenticación

La autenticación de usuarios es un proceso crítico en cualquier aplicación.

Tenemos diferentes tipos de autenticación:
- **HTTP Basic**: En este método, el cliente envía su nombre de usuario y contraseña en cada solicitud HTTP. Este método es simple pero no es seguro, ya que las credenciales se envían en texto claro.
- **Token**: En este método, el cliente envía un token de autenticación en cada solicitud. Este token se genera después de que el usuario inicia sesión y se almacena en el cliente. Este método es más seguro que el HTTP Basic, ya que las credenciales no se envían en cada solicitud.
- **Session**: En este método, el cliente inicia sesión y se le asigna una sesión en el servidor. El servidor almacena la sesión y el cliente envía un identificador de sesión en cada solicitud.
- **Oauth**: Este método de autenticación utiliza servicios de terceros (Google, Facebook, Github, etc.) para autenticar usuarios. Con este método **NO** es necesario almacenar las credenciales del usuario en la aplicación. En su lugar, se utiliza un token de acceso que se obtiene del servicio de terceros. Este método es mucho más seguro para los usuarios y también simplifica el proceso de autenticación, pero su implementación puede ser más compleja dependiendo del servicio que usemos, las librerías que usemos y el flujo de autenticación que elijamos. Además, estamos delegando la seguridad de las credenciales a un tercero, lo que puede ser un problema si el servicio de terceros sufre una violación de seguridad.

En nuestra aplicación Express, utilizaremos el método de **autenticación por sesión**.

## Pasos durante la autenticación

1. El usuario **debe** tener una cuenta en la aplicación con un nombre de usuario y una contraseña.
2. El usuario envía su nombre de usuario y contraseña a la aplicación mediante una solicitud HTTP POST a la ruta `/login`.
3. La aplicación verifica si el nombre de usuario y la contraseña son correctos.
4. Si las credenciales son correctas, la aplicación genera una sesión y envía al cliente el ID de la sesión.
5. El cliente almacena el ID como una cookie y lo envía en cada solicitud HTTP a la aplicación.
6. La aplicación verifica la sesión en cada solicitud y permite o deniega el acceso a los recursos protegidos.
7. El usuario puede cerrar sesión enviando una solicitud HTTP POST a la ruta `/logout`, lo que invalidará la sesión y la eliminará del cliente y del servidor.
8. La sesión tiene una fecha de caducidad, por lo que el usuario deberá volver a iniciar sesión después de un tiempo.

## Implementación

Dependiendo de tu stack, puedes usar diferentes librerías que te ayudarán a implementar la autenticación.

En este caso, necesitaremos las siguientes librerías:

- **Express**: Para crear la aplicación web y los endpoints necesarios.
- **Sequelize**: Para interactuar con la base de datos y almacenar los usuarios.
- **bcrypt**: Para hashear las contraseñas de los usuarios y compararlas al iniciar sesión.
- **express-session**: Para crear y manejar las sesiones de los usuarios.
- **connect-session-sequelize**: Para almacenar las sesiones en la base de datos utilizando Sequelize.

El mecanismo de autenticación necesitará varias piezas clave:

- **Modelo de usuario**: Para almacenar los usuarios en la base de datos.
- **Ruta de registro**: Para permitir a los usuarios crear una cuenta.
- **Modelo de auth**: Para manejar la autenticación y cierre de sesión de los usuarios.
- **Ruta de login**: Para permitir a los usuarios iniciar sesión.
- **Middleware de autenticación**: Para proteger las rutas que requieren autenticación.
- **Vistas**: Para mostrar los formularios de inicio de sesión y registro.
- **Configuración de sesiones**: Como debemos almacenar las sesiones en la base de datos.

### Modelo de usuario

Estamos usando Sequielize para interactuar con la base de datos, por lo que necesitaremos crear un modelo de usuario. Este modelo contendrá los campos necesarios para almacenar la información del usuario, como el nombre de usuario y la contraseña.

Puedes encontrarlo en el archivo `models/user.js`.

### Ruta de registro

La ruta POST `/users` se encargará de registrar a los nuevos usuarios. 

Esta ruta recibirá el nombre de usuario y la contraseña del usuario y creará un nuevo registro en la base de datos.

```javascript
router.post("/", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        password: hashedPassword,
    });
    res.status(201).json(user);
});
```

En esta ruta capturamos los datos `username` y `password` del cuerpo de la solicitud, luego usamos `bcrypt` para hashear la contraseña y finalmente creamos un nuevo usuario en la base de datos usando el modelo `User` que hemos creado anteriormente.

Puedes encontrar esta ruta en el archivo `routes/users.js`.

### Vista de registro

Necesitaremos un formulario que llame a la ruta de registro:

```html
    <form action="/users" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="text" name="password" placeholder="Password" required>
        <button type="submit">Register</button>
    </form>
```

Podemos usar fetch también:

```html
    <form id="register-form">
        <input type="text" name="username" placeholder="Username" required>
        <input type="text" name="password" placeholder="Password" required>
        <button type="submit">Register</button>
    </form>

    <script>
        const form = document.getElementById("register-form");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const response = await fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert("User registered successfully");
            } else {
                alert("Error registering user");
            }
        });
    </script>
```

En nuestro caso no estamos usando `html` crudo, en su lugar usamos `nunjucks` para renderizar plantillas, puedes encontrar el formulario en la plantilla `register.njk` que se encuentra en la carpeta `views` de nuestro proyecto.

### Modelo de auth

El modelo de auth se encargará de manejar la autenticación y cierre de sesión de los usuarios:

```javascript
import {User} from "../models/user.js";
import bcrypt from "bcrypt";

const checkPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

export const authenticateUser = async (username, password) => {
    const user = await User.findOne({
        where: {
            username: username
        }
    });
    if(!user){
        return null;
    }
    const isPasswordValid = await checkPassword(password, user.password);
    if(!isPasswordValid){
        return null;
    }
    return user;
}
```

En este modelo exporamos una función asíncrona `authenticateUser` que recibe el nombre de usuario y la contraseña, busca al usuario en la base de datos y verifica si la contraseña es correcta. Si las credenciales son correctas, devuelve el usuario, de lo contrario devuelve `null`.

Puedes encontrar este modelo en el archivo `models/auth.js`.

### Ruta de login

La ruta POST `/login` se encargará de recibir las credenciales del usuario y autenticarlo haciendo uso del **modelo de auth** que hemos creado anteriormente.

```javascript
router.post("/login", async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await authenticateUser(username, password);
        if(!user){
            return res.status(401).redirect("/login")
        }
        req.session.userId = user.id;
        req.session.username = user.username;
        res.redirect("/profile");
    } catch(error){
        console.error(error);
        res.json({ error: "Hubo un error al iniciar sesion"})
    }
});
```

En esta ruta capturamos los datos `username` y `password` del cuerpo de la solicitud, luego llamamos a la función `authenticateUser` que hemos creado anteriormente. Si el usuario no existe o la contraseña es incorrecta, devolvemos un error 401. Si las credenciales son correctas, guardamos el ID y el nombre de usuario en la sesión y redirigimos al usuario a su perfil.

Puedes encontrar esta ruta en el archivo `routes/auth.js`.

### Vista de login

Muy similar a la vista de registro, pero esta apunta a la ruta de login:

```html
    <form action="/login" method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="text" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>
```

### Configuración de sesiones

Los pasos anteriores son básicos para obtener una sesión, pero necesitamos configurar las sesiones para que funcionen correctamente.

```js
import express from "express";
import session from "express-session";
import SQLiteStore from "connect-sqlite3";
const app = express();

const SQLiteStoreSession = SQLiteStore(session);

const sessionStore = new SQLiteStoreSession({
    db: "sessions.sqlite",
    dir: "./db"
})

const sessionConfig = {
    store: sessionStore,
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}

app.use(session(sessionConfig));
```

En esta parte del código estamos configurando las sesiones. Creamos una instancia de `SQLiteStore` donde configuramos el nombre y ruta de la base de datos donde se almacenarán las sesiones.

El objeto `sessionConfig` contiene la configuración de la sesión:

- `store`: Almacenamiento de la sesión, es la instancia de `SQLiteStore` creada anteriormente.
- `secret`: Secreto para firmar la sesión. Esta firma asegura que la sesión viene del servidor y no ha sido manipulada por el cliente.
- `cookie`: Configuración de la cookie de sesión. En este caso, la cookie tendrá una duración de 24 horas, transcurrido este tiempo, la sesión se eliminará automáticamente.

Puedes ver esta configuración en el archivo `index.js`.

### Middleware de autenticación

Tus usuarios ya deberían tener sesiones cuando hacen login, asi que necesitaremos un middleware que permita proteger las rutas a las que solo deberían acceder los usuarios autenticados.

Un ejemplo básico podría ser:

```javascript
export const isAuthenticated = (req, res, next) => {
    if(req.session.userId){
        return next();
    }
    res.redirect("/login");
}
```

En otros casos, se redirigirá a una página de error o se devolverá un error 401. En este caso redirigimos a la página de login.

Puedes encontrar este middleware en el archivo `middlewares/auth.js`.
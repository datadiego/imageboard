# Async/Await

`async` y `await` son dos palabras clave de JavaScript que nos ayudan a trabajar con promesas usando una sintaxis simplificada, hará que te olvides de encadenar `then()` y `catch()`.


## Promesas

Recuerda que una promesa en js no es mas que un objeto con tres estados posibles:
- **Pendiente**: La promesa está en proceso de resolución.
- **Resuelta**: La promesa se ha resuelto correctamente, para este estado se ejecuta el bloque de código dentro de `then()`.
- **Rechazada**: La promesa ha fallado, para este estado se ejecuta el bloque de código dentro de `catch()`.

```js
const promesa = funcion_asincrona() //ejecuta la funcion asincrona
promesa.then((resultado) => {
    console.log("Resultado:", resultado);
}).catch((error) => {
    console.error("Error:", error);
});
```

Vamos a recordar como trabajar con promesas usando fetch:

```js
fetch("https://api.com/data")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
```

### Ejemplo de funcion asincrona

```js
const probar_suerte = () => {
    return new Promise((resolve, reject) => {
        const suerte = Math.random() > 0.5; // Genera un número aleatorio entre 0 y 1
        sleep(suerte)
        if (suerte) {
            resolve("Ganaste");
        } else {
            reject("Perdiste");
        }
    });
};

const promesa = probar_suerte(); // ejecuta la funcion asincrona
promesa.then((resultado) => {
    console.log("Resultado:", resultado);
}).catch((error) => {
    console.error("Error:", error);
});
``` 

## 
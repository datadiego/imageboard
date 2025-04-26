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

La misma funcion asincrona pero usando async/await:

```js
async function probar_suerte() {
    const suerte = Math.random() > 0.5; // Genera un número aleatorio entre 0 y 1
    sleep(suerte)
    if (suerte) {
        return "Ganaste";
    } else {
        throw new Error("Perdiste");
    }
}
const resultado = await probar_suerte(); // ejecuta la funcion asincrona
console.log("Resultado:", resultado);
```

## Async en abstracto

Veamos un ejemplo mas reducido de como funciona async/await:

```js
async function test(){
    return "Hola Mundo"
}
const resultado = test() // ejecuta la funcion asincrona
console.log(resultado) // Es una promesa, deberiamos resolverla si queremos el resultado
```

Async hace que cualquier valor devuelto por la funcion se convierta en una promesa, prueba a eliminar el async y veras que no se convierte en una promesa, sino que se devuelve el valor directamente.

## Await en abstracto
```js
async function test(){
    return "Hola Mundo"
}
const resultado = await test() // ejecuta la funcion asincrona
console.log(resultado) // Es una promesa, deberiamos resolverla si queremos el resultado
```

Await **solo** puede usarse dentro de funciones asincronas, y hace que el programa espere a que la promesa se resuelva antes de continuar. Si la promesa se resuelve correctamente, el valor devuelto por la promesa se asigna a la variable. Si la promesa es rechazada, se lanza un error.


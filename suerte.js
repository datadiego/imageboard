async function test() {
    StylePropertyMap()
    return "Hola Mundo"
}
const resultado = await test() // ejecuta la funcion asincrona
console.log(resultado) // Imprime un objeto Promise

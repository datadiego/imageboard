const probar_suerte = () => {
    return new Promise((resolve, reject) => {
        const suerte = Math.random() > 0.5; // Genera un número aleatorio entre 0 y 1
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
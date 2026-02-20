const palabras = [
    "sol","mar","pan","voz","red","fin","luz","día","mes","uno","dos","tres","pez","rio","sur","norte",
    "casa","mesa","auto","calle","libro","tecla","raton","mouse","nivel","parte","forma","mundo","tiempo",
    "persona","grupo","lado","mano","ojos","datos","texto","campo","punto","linea","orden","valor",
    "teclado","pantalla","codigo","archivo","carpeta","ventana","sistema","usuario","control",
    "acceso","pagina","inicio","cierre","cambio","entrada","salida","carga","memoria",
    "proceso","evento","estado","funcion","variable","objeto","clase","metodo",
    "computadora","aplicacion","desarrollo","programacion","velocidad","precision","practica",
    "ejercicio","concentracion","productividad","experiencia","herramienta",
    "implementacion","configuracion","documentacion","optimizacion",
    "javascript","typescript","estructura","algoritmo","interfaz","frontend","backend",
    "servidor","cliente","navegador","internet","protocolo","conexion",
    "repositorio","version","controlador","componente","framework",
    "responsabilidad","modularidad","compatibilidad","escalabilidad",
    "mantenibilidad","interactividad","funcionalidad","asincronico",
    "sincronizacion","renderizado","actualizacion","procesamiento",
    "rapido","lento","correcto","incorrecto","intento","resultado",
    "objetivo","mejorar","aprender","practicar","escribir","teclear",
    "palabra","frase","letra","tecla","espacio","error","acierto",
    "progreso","nivel","desafio","ejemplo","prueba","ejecucion",
    "internacional","caracteristica","especializacion","automatizacion",
    "personalizacion","identificacion","visualizacion","comunicacion"
];

function generarTextoAleatorio(cPalabras) {
    let resultado = [];

    for (let i = 0; i < cPalabras; i++) {
        const indice = Math.floor(Math.random() * palabras.length);
        resultado.push(palabras[indice]);
    }

    return resultado.join(" ");
}

function cargarTexto() {
    const elementoTexto = document.getElementById("texto");
    elementoTexto.textContent = generarTextoAleatorio(30);
}

cargarTexto();
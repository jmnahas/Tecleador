
const { useState, useEffect } = React;

function Principal() {

    // ---------- ESTADOS ----------
    const [texto, setTexto] = useState("");
    const [input, setInput] = useState("");
    const [dificultad, setDificultad] = useState(null);

    const [tiempo, setTiempo] = useState(0);
    const [corriendo, setCorriendo] = useState(false);

    const [ppm, setPPM] = useState(0);
    const [errores, setErrores] = useState(0);

    const [mostrarDificultad, setMostrarDificultad] = useState(true);


    // ---------- GENERADOR DE TEXTO ----------
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


    function generarTexto(cantidad) {

        let resultado = "";

        for (let i = 0; i < cantidad; i++) {

            const palabra =
                palabras[Math.floor(Math.random() * palabras.length)];

            resultado += palabra + " ";
        }

        setTexto(resultado.trim());
        setInput("");
        setTiempo(0);
        setPPM(0);
        setErrores(0);
        setCorriendo(false);
    }


    // ---------- DIFICULTADES ----------
    function dificultadFacil() {
        generarTexto(15);
        setDificultad("facil");
        setMostrarDificultad(false);
    }

    function dificultadMedia() {
        generarTexto(30);
        setDificultad("media");
        setMostrarDificultad(false);
    }

    function dificultadDificil() {
        generarTexto(60);
        setDificultad("dificil");
        setMostrarDificultad(false);
    }

    function cambiarDificultad() {
        setMostrarDificultad(true);
    }


    // ---------- TIMER ----------
    useEffect(() => {

        let intervalo;

        if (corriendo) {

            intervalo = setInterval(() => {
                setTiempo(prev => prev + 1);
            }, 1000);

        }

        return () => clearInterval(intervalo);

    }, [corriendo]);

    function calcularErrores(valor) {
        let erroresContados = 0;
        for (let i = 0; i < valor.length; i++) {
            if (valor[i] !== texto[i]) {
                erroresContados++;
            }
        }
        setErrores(erroresContados);
    }


    function calcularPPM(valor) {
        if (tiempo === 0) return;
        const palabrasEscritas = valor.trim().split(" ").length;
        const minutos = tiempo / 60;
        const resultado = Math.round(palabrasEscritas / minutos);
        setPPM(resultado);
    }

    useEffect(() => {

    function manejarTecla(e) {

        if (mostrarDificultad) return;

        const tecla = e.key;

        // ignorar teclas raras
        if (tecla.length > 1 && tecla !== "Backspace") return;

        if (!corriendo) setCorriendo(true);

        setInput(prev => {

        if (tecla === "Backspace") {
            return prev.slice(0, -1);
        }

        return prev + tecla;
        });

    }

    window.addEventListener("keydown", manejarTecla);

    return () => window.removeEventListener("keydown", manejarTecla);

    }, [mostrarDificultad, corriendo]);
    return (

        <div className="container mt-5">

            {mostrarDificultad && (
                <div className="text-center mb-4">
                    <h3>Elegir dificultad</h3>
                    <button className="btn btn-success m-2" onClick={dificultadFacil}>Fácil</button>
                    <button className="btn btn-warning m-2" onClick={dificultadMedia}>Media</button>
                    <button className="btn btn-danger m-2" onClick={dificultadDificil}>Difícil</button>
                </div>
            )}

            {!mostrarDificultad && (
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card p-4">
                            <p className="zona-texto">
                            {texto.split("").map((letra, index) => {

                                let clase = "letra";

                                if (index < input.length) {
                                clase += letra === input[index] ? " correcta" : " incorrecta";
                                }

                                return (
                                <span key={index} className={clase}>
                                    {letra}
                                </span>
                                );
                            })}
                            </p>
                            <button className="btn btn-primary mt-3" onClick={cambiarDificultad}>Cambiar dificultad</button>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-3">
                            <h5>Estadísticas</h5>
                            <p>Tiempo: {tiempo}s</p>
                            <p>PPM: {ppm}</p>
                            <p>Errores: {errores}</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

const root = ReactDOM.createRoot(
  document.getElementById("Principal")
);

root.render(<Principal />);
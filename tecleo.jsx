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

    const [finalizado, setFinalizado] = useState(false);


    // ---------- GENERADOR ----------
    const palabras = [
        "sol","mar","pan","voz","red","fin","luz","día","mes","uno","dos","tres",
        "casa","mesa","auto","calle","libro","tecla","raton","mouse","nivel","parte",
        "persona","grupo","lado","mano","ojos","datos","texto","campo","punto","linea",
        "teclado","pantalla","codigo","archivo","ventana","sistema","usuario",
        "memoria","proceso","evento","estado","funcion","variable","objeto",
        "computadora","aplicacion","desarrollo","programacion","velocidad",
        "precision","practica","javascript","typescript","estructura","algoritmo",
        "frontend","backend","servidor","cliente","navegador","internet",
        "rapido","lento","correcto","incorrecto","resultado",
        "objetivo","mejorar","aprender","practicar","escribir","teclear",
        "palabra","frase","letra","espacio","error","acierto",
        "progreso","nivel","desafio","ejemplo","prueba","ejecucion"
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
        setFinalizado(false);
    }


    // ---------- DIFICULTADES ----------

    function dificultadFacil() {
        generarTexto(15);
        setMostrarDificultad(false);
    }

    function dificultadMedia() {
        generarTexto(30);
        setMostrarDificultad(false);
    }

    function dificultadDificil() {
        generarTexto(60);
        setMostrarDificultad(false);
    }

    function cambiarDificultad() {

        setMostrarDificultad(true);

        setTexto("");
        setInput("");

        setTiempo(0);
        setPPM(0);
        setErrores(0);

        setCorriendo(false);
        setFinalizado(false);
    }


    // ---------- TIMER ----------

    useEffect(() => {

        if (!corriendo) return;

        const intervalo = setInterval(() => {

            setTiempo(prev => prev + 1);

        }, 1000);

        return () => clearInterval(intervalo);

    }, [corriendo]);


    // ---------- ERRORES Y PPM ----------

    useEffect(() => {

        if (!corriendo) return;

        let erroresContados = 0;
        let correctos = 0;

        for (let i = 0; i < input.length; i++) {

            if (input[i] !== texto[i]) {

                erroresContados++;

            } else {

                correctos++;
            }
        }

        setErrores(erroresContados);

        if (tiempo > 0) {

            const minutos = tiempo / 60;
            const palabras = correctos / 5;

            setPPM(Math.round(palabras / minutos));
        }


        // FINALIZAR

        if (input.length >= texto.length) {

            setCorriendo(false);
            setFinalizado(true);
        }

    }, [input]);


    // ---------- TECLADO ----------

    useEffect(() => {

        function manejarTecla(e) {

            if (mostrarDificultad) return;
            if (finalizado) return;

            const tecla = e.key;

            if (tecla.length > 1 && tecla !== "Backspace") return;

            if (!corriendo) setCorriendo(true);

            setInput(prev => {

                if (tecla === "Backspace") {

                    return prev.slice(0, -1);
                }

                if (prev.length >= texto.length) return prev;

                return prev + tecla;
            });
        }

        window.addEventListener("keydown", manejarTecla);

        return () =>
            window.removeEventListener("keydown", manejarTecla);

    }, [mostrarDificultad, corriendo, finalizado, texto]);


    // ---------- PANTALLA FINAL ----------

    if (finalizado) {

        return (

            <div className="container text-center mt-5">

                <div className="card p-5">

                    <h2>Resultado</h2>

                    <p>Tiempo: {tiempo} segundos</p>

                    <p>PPM: {ppm}</p>

                    <p>Errores: {errores}</p>

                    <button
                        className="btn btn-primary mt-3"
                        onClick={cambiarDificultad}
                    >
                        Volver a jugar
                    </button>

                </div>

            </div>
        );
    }


    // ---------- UI PRINCIPAL ----------

    return (

        <div className="container mt-5">

            {mostrarDificultad && (

                <div className="text-center">

                    <h3>Elegir dificultad</h3>

                    <button className="btn btn-success m-2"
                        onClick={dificultadFacil}>
                        Fácil
                    </button>

                    <button className="btn btn-warning m-2"
                        onClick={dificultadMedia}>
                        Media
                    </button>

                    <button className="btn btn-danger m-2"
                        onClick={dificultadDificil}>
                        Difícil
                    </button>

                </div>
            )}


            {!mostrarDificultad && (

                <div className="row">

                    <div className="col-md-8">

                        <div className="card p-4">

                            <p className="zona-texto">

                                {texto.split("").map((letra, index) => {

                                    let clase = "letra";

                                    if (index < input.length) {

                                        clase += letra === input[index]
                                            ? " correcta"
                                            : " incorrecta";
                                    }

                                    if (index === input.length) {

                                        clase += " current-letter";
                                    }

                                    return (
                                        <span key={index} className={clase}>
                                            {letra}
                                        </span>
                                    );
                                })}

                            </p>

                            <button
                                className="btn btn-primary mt-3"
                                onClick={cambiarDificultad}
                            >
                                Cambiar dificultad
                            </button>

                        </div>

                    </div>


                    <div className="col-md-4">

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
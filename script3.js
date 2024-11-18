// Decodificar html << buscar para solucionar formato de comilla

let nPregunta = 0; // Número de la pregunta actual inicializada a 0.
let nAciertos = 0; // Número de preguntas acertadas.
let nFallos = 0; // Número de preguntas falladas.
(function () {
    localStorage.clear();
})();

createFetch(); // Inicialización del pintado del botón de comienzo "primera pregunta"


function createFetch() { // Pinta el botón que llamará al fetch
    let getPreguntasDiv = document.getElementById("preguntasDiv");
    let getBodyDiv = document.getElementById("bodyDivQuestions");
    let fetchDiv = document.createElement("div");
    let scoreDiv = document.createElement("div");
    scoreDiv.id = "score";
    let aciertosNode = document.createElement("p");
    aciertosNode.id = "aciertosId";
    aciertosNode.innerText = "Aciertos "+nAciertos;
    let fallosNode = document.createElement("p");
    fallosNode.id ="fallosId";
    fallosNode.innerText = "Fallos "+nFallos;

    scoreDiv.appendChild(aciertosNode);
    scoreDiv.appendChild(fallosNode);

    fetchDiv.id = "fetchDivId";
    getPreguntasDiv.appendChild(fetchDiv);
    getPreguntasDiv.appendChild(scoreDiv);
    getBodyDiv.appendChild(getPreguntasDiv);

    fetchDiv.setAttribute("onclick", "fetchQuestion(0)");
    fetchDiv.innerText = "Primera pregunta";

}

function fetchQuestion() { // Realizo el fetch
    let getPrimeraPreguntaDiv = document.getElementById("fetchDivId");
    getPrimeraPreguntaDiv.className = "hidden";
    fetch("https://opentdb.com/api.php?amount=10&category=27&type=multiple")
        .then(datos => datos.json())
        .then(json => checkFetch(json, nPregunta));
}


function checkFetch(fetch, vuelta) { // Cojo los datos que necesito del fetch y los distribullo dependiendo de la pregunta que sea (vuelta)
    let getBodyDivQuestions = document.createElement("div");
    getBodyDivQuestions.id = "hiddenDiv";

    for (let i = 0; i < fetch.results.length; i++) { // Escribo las preguntas y opciones en localStorage
        // Pintado de preguntas
        let arrayQuestion = [];
        let pregunta = fetch.results[i].question;
        arrayQuestion.push(pregunta);
        // Pintado de opciones incorrectas
        let wrongOptions = fetch.results[i].incorrect_answers;
        // manageOptions(wrongOptions, i);

        // Pintado de opciones correctas
        let correctAnswer = fetch.results[i].correct_answer;
        arrayQuestion.push(correctAnswer);

        for (let i = 0; i < wrongOptions.length; i++) {
            let wrong_option = wrongOptions[i];
            arrayQuestion.push(wrong_option);
        }
        // localStorage.setItem(`pregunta${i}`, `Opcion3` : `${correctAnswer}`);
        localStorage.setItem(`pregunta${i}`, arrayQuestion); // AQUI
        vuelta++;
    }
    paintQuestion(nPregunta);
}

// function manageOptions(options, vuelta) { // Al estar las opciones erróneas en un array, tengo una función que las escribe en el localstorage.
//     for (let i = 0; i < options.length; i++) {
//         let opcion = options[i];
//         localStorage.setItem(`pregunta${i}`, opcion);
//     }
// }

function paintQuestion(nPregunta) { // Función que pinta para el usuario la pregunta y las opciones correspondientes a la pregunta que toque, de lo cual lleva la cuenta "nPregunta".
    let cleaner = document.getElementById("divShown");
    cleaner.classList.remove("stopClick");
    if (cleaner) {
        cleaner.innerHTML = "";
    }

    let getPregunta = localStorage.getItem(`pregunta${nPregunta}`);

    let divPreguntas = document.getElementById("divShown");
    let pPregunta = document.createElement("p");
    pPregunta.innerText = getPregunta;
    pPregunta.className = "questionshown";
    divPreguntas.appendChild(pPregunta);


    let getOpcion0 = localStorage.getItem(`vuelta${nPregunta}Opcion0`);
    let getOpcion1 = localStorage.getItem(`vuelta${nPregunta}Opcion1`);
    let getOpcion2 = localStorage.getItem(`vuelta${nPregunta}Opcion2`);
    let getCorrect = localStorage.getItem(`vuelta${nPregunta}Opcion3`);

    localStorage.setItem("check", getCorrect);
    let arrayOpciones = [getOpcion0, getOpcion1, getOpcion2, getCorrect];
    arrayOpciones.sort(() => Math.random() - 0.5);

    for (let i = 0; i < arrayOpciones.length; i++) {
        let opcion = document.createElement("p");
        opcion.id = `opcion${i}`;
        opcion.className = "shown";
        opcion.innerText = arrayOpciones[i];
        let checker = arrayOpciones[i];
        opcion.setAttribute(`onClick`, `checkCorrect("${checker}","${opcion.id}")`);
        divPreguntas.appendChild(opcion);
    }
}
function checkCorrect(opcionEscogida, pEscogido) {              // Comprueba si la opción escogida es la correcta o no y avisa al usuario con cambios en el color de las opciones
    let checker = localStorage.getItem("check");
    if (nPregunta >= 10){
        let getDiv = document.getElementById("divShown");
        getDiv.innerHTML = "";
        let finish = document.createElement("p");
        finish.innerText = "Fin del quiz";
        finish.className = "questionshown";
        document.body.appendChild(finish);
        setTimeout(() => {
            reset();
        }, "3000");
    }

    if (checker != opcionEscogida) {
        nFallos++;
        let updateFallos = document.getElementById("fallosId");
        updateFallos.innerText = "Fallos "+nFallos;
        let getPtoChange = document.getElementById(pEscogido);
        getPtoChange.className = "wrong";
        getPtoChange.classList.add("stopClick");
    } else {
        nAciertos++;
        nPregunta++;
        let updateAciertos = document.getElementById("aciertosId");
        updateAciertos.innerText = "Aciertos "+nAciertos;
        let getPtoChange = document.getElementById(pEscogido);
        getPtoChange.className = "correct";
        let getDiv = document.getElementById("divShown");
        getDiv.classList.add("stopClick");
        getPtoChange.classList.add("stopClick");

        setTimeout(() => {                                      // Esperamos mostrándole al usuario que esa era la opción correcta antes de pasar a la siguiente pregunta.
            paintQuestion(nPregunta);
          }, "1000");
    }
}

function reset() {
    window.location.href = 'index.html';
}
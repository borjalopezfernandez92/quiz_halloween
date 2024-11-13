// Decodificar html << buscar para solucionar formato de comilla

(function () {
    localStorage.clear();
})();

createFetch();


function paintResults() {
    console.log("test paintResults");
}

function createFetch() { // Pinta el botón que llamará al fetch
    let getPreguntasDiv = document.getElementById("preguntasDiv");
    let getBodyDiv = document.getElementById("bodyDivQuestions");
    let fetchDiv = document.createElement("div");
    fetchDiv.id = "fetchDivId";
    getPreguntasDiv.appendChild(fetchDiv);
    getBodyDiv.appendChild(getPreguntasDiv);

    fetchDiv.setAttribute("onclick", "fetchQuestion(0)");
    fetchDiv.innerText = "Primera pregunta";

}

function fetchQuestion() { // realiza el fetch
    let getPrimeraPreguntaDiv = document.getElementById("fetchDivId");
    getPrimeraPreguntaDiv.className = "hidden";
    fetch("https://opentdb.com/api.php?amount=10&category=27&type=multiple")
        .then(datos => datos.json())
        .then(json => checkFetch(json, 0));
}


function checkFetch(fetch, vuelta) {
    let getBodyDivQuestions = document.createElement("div");
    getBodyDivQuestions.id = "hiddenDiv";


    for (let i = 0; i < fetch.results.length; i++) {
        let pregunta = fetch.results[i].question;
        localStorage.setItem(`pregunta${i}`, pregunta);

        // Pintado de opciones incorrectas
        let wrongOptions = fetch.results[i].incorrect_answers;
        manageOptions(wrongOptions, i);


        // Pintado de opciones correctas
        let correctAnswer = fetch.results[i].correct_answer;
        localStorage.setItem(`vuelta${vuelta}Opcion3`, correctAnswer);
        vuelta++;
    }
    // manageQuestions();
    paintQuestion(0);
}

function manageOptions(options, vuelta) {
    for (let i = 0; i < options.length; i++) {
        let opcion = options[i];
        localStorage.setItem(`vuelta${vuelta}Opcion${i}`, opcion);
    }
}

function paintQuestion(nPregunta) {
    let cleaner = document.getElementById("divShown");

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

    console.log(getOpcion0,
        getOpcion1,
        getOpcion2,
        getCorrect)

    localStorage.setItem("check", getCorrect);
    let arrayOpciones = [getOpcion0, getOpcion1, getOpcion2, getCorrect];
    arrayOpciones.sort(() => Math.random() - 0.5);

    for (let i = 0; i < arrayOpciones.length; i++) {
        let opcion = document.createElement("p");
        opcion.id = `opcion${i}`;
        opcion.className = "shown";
        opcion.innerText = arrayOpciones[i];
        let checker = arrayOpciones[i];
        opcion.setAttribute(`onClick`, `checkCorrect("${checker}")`);
        divPreguntas.appendChild(opcion);
    }
    nPregunta++;
}


function checkCorrect(opcionEscogida) {
    let checker = localStorage.getItem("check");
    if (checker != opcionEscogida) {
        console.log("Respuesta incorrecta");
    } else {
        console.log("Respuesta correcta!");
        paintQuestion();
    }
}
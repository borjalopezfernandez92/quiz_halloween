// Decodificar html << buscar para solucionar formato de comilla

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
        .then(json => checkFetch(json));
}


function checkFetch(fetch) {
    let getBodyDivQuestions = document.createElement("div");
    getBodyDivQuestions.id = "hiddenDiv";

    for (let i = 0; i < fetch.results.length; i++) {
        let pregunta = document.createElement("div");
        pregunta.innerText = fetch.results[i].question;
        pregunta.id = "pregunta" + [i];
        pregunta.className = "hidden";
        getBodyDivQuestions.appendChild(pregunta);
        document.body.appendChild(getBodyDivQuestions);

        // Pintado de opciones incorrectas
        let wrongOptions = fetch.results[i].incorrect_answers;
        manageOptions(wrongOptions, i);


        // Pintado de opciones correctas
        let correctAnswer = document.createElement("div");
        correctAnswer.innerText = fetch.results[i].correct_answer;
        correctAnswer.id = `vulta${i}Opcion3`;
        correctAnswer.className = "hidden";
        getBodyDivQuestions.appendChild(correctAnswer);

    }
    // manageQuestions();
    paintQuestion(0);
}

function manageOptions(options, vuelta) {
    for (let i = 0; i < options.length; i++) {
        let getBodyDivQuestions = document.getElementById("hiddenDiv");
        let option = document.createElement("div");
        // option.onclick()
        option.innerText = options[i];
        option.id = `vulta${vuelta}Opcion${i}`;
        option.className = "hidden";
        getBodyDivQuestions.appendChild(option);
        // console.log(options[i]);
    }
}

function paintQuestion(nPregunta) {
    // let cleaner = document.getElementById("divShown");

    // if (cleaner) {

    // }


    let getdivShowQuestions = document.getElementById("divShown");
    let pregunta = document.createElement("p");
    pregunta.className = "questionshown";
    pregunta.id = "questionShown";
    let getPregunta = document.getElementById("pregunta" + nPregunta).innerText;
    pregunta.innerText = getPregunta;
    getdivShowQuestions.appendChild(pregunta);




    let getOpcion0 = document.getElementById(`vulta${nPregunta}Opcion${nPregunta}`).innerText;
    let getOpcion1 = document.getElementById(`vulta${nPregunta}Opcion${nPregunta+1}`).innerText;
    let getOpcion2 = document.getElementById(`vulta${nPregunta}Opcion${nPregunta+2}`).innerText;
    let getCorrect = document.getElementById(`vulta${nPregunta}Opcion${nPregunta+3}`).innerText;
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
        getdivShowQuestions.appendChild(opcion);
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
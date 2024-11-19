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
        .then(json => checkFetch(json));
}


function checkFetch(fetch) { // Cojo los datos que necesito del fetch y los distribullo
    let getBodyDivQuestions = document.createElement("div");
    getBodyDivQuestions.id = "hiddenDiv";

    for (let i = 0; i < fetch.results.length; i++) { // Escribo las preguntas y opciones en localStorage
        let arrayQuestion = [];        // array que contiene la pregunta y las respuestas.

        let pregunta = fetch.results[i].question;        // Pintado de preguntas
        arrayQuestion.push(pregunta);

        let wrongOptions = fetch.results[i].incorrect_answers;        // Pintado de opciones incorrectas
        for (let i = 0; i < wrongOptions.length; i++) {
            let wrong_option = wrongOptions[i];
            arrayQuestion.push(wrong_option);
        }
        let correctAnswer = fetch.results[i].correct_answer;        // Pintado de opciones correctas
        arrayQuestion.push(correctAnswer);

        // JSON.stringify(arrayQuestion);

        localStorage.setItem(`pregunta${i}`, JSON.stringify({
            pregunta: `${arrayQuestion[0]}`,
            opcion0: `${arrayQuestion[1]}`,
            opcion1: `${arrayQuestion[2]}`,
            opcion2: `${arrayQuestion[3]}`,
            opcion3: `${arrayQuestion[4]}`,
        }));
    }
    paintQuestion(nPregunta);
}

function paintQuestion(nPregunta) { // Función que pinta para el usuario la pregunta y las opciones correspondientes a la pregunta que toque, de lo cual lleva la cuenta "nPregunta".
    if (nPregunta >= 10){
        let getDiv = document.getElementById("divShown");
        getDiv.innerHTML = "";
        getDiv.classList.add("stopClick");
        let finish = document.createElement("p");
        finish.innerText = "Fin del quiz, volviendo al inicio...";
        finish.className = "questionshown";
        document.body.appendChild(finish);
        toIndex();
    } else {
        let cleaner = document.getElementById("divShown"); // Elimina la clase stopClick para que el usuario pueda volver a escoger la respuesta que quiera.
        cleaner.classList.remove("stopClick");
        if (cleaner) {
            cleaner.innerHTML = "";
        }
    
        let getPregunta = JSON.parse(localStorage.getItem(`pregunta${nPregunta}`));
    
        let divPreguntas = document.getElementById("divShown");
        let pPregunta = document.createElement("p");
        pPregunta.innerHTML = getPregunta.pregunta;
        pPregunta.className = "questionshown";
        divPreguntas.appendChild(pPregunta);
    
        let getOpcion0 = getPregunta.opcion0;
        let getOpcion1 = getPregunta.opcion1;
        let getOpcion2 = getPregunta.opcion2;
        let getCorrect = getPregunta.opcion3;
    
    
        localStorage.setItem("check", getCorrect);
        let arrayOpciones = [getOpcion0, getOpcion1, getOpcion2, getCorrect];
        arrayOpciones.sort(() => Math.random() - 0.5);
    
        for (let i = 0; i < arrayOpciones.length; i++) {
            let opcion = document.createElement("p");
            opcion.id = `opcion${i}`;
            opcion.className = "shown";
            opcion.innerHTML = arrayOpciones[i];
            let checker = arrayOpciones[i];
            opcion.setAttribute(`onClick`, `checkCorrect("${checker}","${opcion.id}")`);
            divPreguntas.appendChild(opcion);
        }
    }


}
function checkCorrect(opcionEscogida, pEscogido) {              // Comprueba si la opción escogida es la correcta o no y avisa al usuario con cambios en el color de las opciones
    let checker = localStorage.getItem("check");

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

function toIndex() {
    // console.log("fallos: "+nFallos);
    // console.log("aciertos: "+nAciertos);
    localStorage.setItem(`resultados`, JSON.stringify({
        aciertos: `${nAciertos}`,
        fallos: `${nFallos}`
    }));
    setTimeout(() => {
        window.location.href = 'index.html';
    }, "3000");
};
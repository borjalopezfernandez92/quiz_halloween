createFetch();

function test() {
    alert("test");
}


// function paintDifficulty() {
//     console.log("test paintDifficulty");
//     let form = document.createElement("form");
//     form.id = "formDifficulty";
//     let radioFacil = document.createElement("input");
//     radioFacil.type = "radio";
//     radioFacil.name = "difficulty";
//     radioFacil.id = "radioFacilId";
//     let facilText = document.createElement("label");
//     facilText.name = "difficulty";
//     facilText.innerText = "Fácil";

//     let getButtonsDiv = document.getElementById("ButtonsDivId");
//     getButtonsDiv.appendChild(facilText);
//     getButtonsDiv.appendChild(radioFacil);
// }

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
    for (let i = 0; i < fetch.results.length; i++) {
        // localStorage.setItem(`pregunta${i}`, fetch.results[i].correct_answer)
        // console.log(fetch.results[i].correct_answer);
        let getBodyDivQuestions = document.getElementById("divShowQuestions");
        let pregunta = document.createElement("div");
        pregunta.innerText = fetch.results[i].question;
        pregunta.id = "pregunta" + [i];
        pregunta.className = "hidden";
        getBodyDivQuestions.appendChild(pregunta);

        // Pintado de opciones incorrectas
        let wrongOptions = fetch.results[i].incorrect_answers;
        manageOptions(wrongOptions);


        // Pintado de opciones correctas
        let correctAnswer = document.createElement("div");
        correctAnswer.innerText = fetch.results[i].correct_answer;
        correctAnswer.id = "opcion4";
        correctAnswer.className = "hidden";
        getBodyDivQuestions.appendChild(correctAnswer);

    }
    manageQuestions();
}

function manageOptions(options) {
    for (let i = 0; i < options.length; i++) {
        let getBodyDivQuestions = document.getElementById("divShowQuestions");
        let option = document.createElement("div");
        // option.onclick()
        option.innerText = options[i];
        option.id = "opcion" + [i];
        option.className = "hidden";
        getBodyDivQuestions.appendChild(option);
        // console.log(options[i]);
    }
}


function manageQuestions() {
    let nPregunta = 0;

    switch (nPregunta) {
        case 0:
            console.log("caso 0");
            let getPregunta0 = document.getElementById("pregunta0");
            getPregunta0.className = "questionshown";

            let getOpcion0 = document.getElementById("opcion0");
            let getOpcion1 = document.getElementById("opcion1");
            let getOpcion2 = document.getElementById("opcion2");
            let getCorrect = document.getElementById("opcion4");
            getOpcion0.className = "shown";
            getOpcion1.className = "shown";
            getOpcion2.className = "shown";
            getCorrect.className = "shown";
            paintOptions(getOpcion0, getOpcion1, getOpcion2, getCorrect);

            nPregunta++;
            break;

        case 1:
            console.log("caso 1");
            let getPregunta1 = document.getElementById("pregunta1");
            getPregunta1.className = "";
            nPregunta++;
            break;
        default:
            break;
    }
}

function paintOptions(opcion1, opcion2, opcion3, opcion4) {
    console.log("test paintOptions" + opcion1, opcion2, opcion3, opcion4);
}
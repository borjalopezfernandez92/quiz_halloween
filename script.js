

createWelcome();
createFetch();


function createWelcome() { // Pinta la pantalla de bienvenida
    let difficulty = "Fácil"; // Establece la dificultad "fácil" como predeterminada


    let h2 = document.createElement("h2");
    let bodyDiv = document.createElement("div");
    bodyDiv.id = "bodyDiv";
    let h2Text = document.createTextNode("Welcome");
    h2.appendChild(h2Text);
    bodyDiv.appendChild(h2);
    document.body.appendChild(bodyDiv);

    createStartButton(difficulty);
}

function createStartButton(currentDifficulty){
    let getbodyDiv = document.getElementById("bodyDiv");
    let buttonDifficulty = document.createElement("button");
    let buttonsDiv = document.createElement("div");
    buttonsDiv.id = "buttonsDivId";
    
    buttonDifficulty.setAttribute("onclick", "paintDifficulty()");
    buttonDifficulty.id = "difficultyButton";
    buttonDifficulty.innerText = "Dificultad";
    buttonsDiv.appendChild(buttonDifficulty);
    let pCurrentDifficulty = document.createElement("p");
    let textCurrentDifficulty = document.createTextNode("Dificultad actual: "+currentDifficulty);
    pCurrentDifficulty.appendChild(textCurrentDifficulty);
    buttonsDiv.appendChild(pCurrentDifficulty);

    let buttonResults = document.createElement("button");
    buttonResults.setAttribute("onclick", "paintResults()");
    buttonResults.id = "resultsButton";
    buttonResults.innerText = "Últimos resultados";
    buttonsDiv.appendChild(buttonResults);

    getbodyDiv.appendChild(buttonsDiv);
}

function paintDifficulty() {
    console.log("test paintDifficulty");
    let form = document.createElement("form");
    form.id = "formDifficulty";
    let radioFacil = document.createElement("input");
    radioFacil.type = "radio";
    radioFacil.name = "difficulty";
    radioFacil.id = "radioFacilId";
    let facilText = document.createElement("label");
    facilText.name = "difficulty";
    facilText.innerText = "Fácil";

    let getButtonsDiv = document.getElementById("ButtonsDivId");
    getButtonsDiv.appendChild(facilText);
    getButtonsDiv.appendChild(radioFacil);
}

function paintResults() {
    console.log("test paintResults");
}

function createFetch() { // Pinta el botón que llamará al fetch
    let mainDiv = document.createElement("div");
    mainDiv.id = "mainDiv";
    let fetchButton = document.createElement("button");
    fetchButton.setAttribute("onclick", "fetchQuestion()");
    fetchButton.innerText = "Fetch!";
    mainDiv.appendChild(fetchButton);
    document.body.appendChild(mainDiv);
}

function fetchQuestion() { // realiza el fetch
    fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then(datos => datos.json())
    .then(json => checkFetch(json)) // aquí
}

// function paintFetch(fetch) { 
//     let divFetch = document.createElement("div");
//     divFetch.id = "fetchDiv";
//     let fetchText = document.createTextNode(fetch);
//     divFetch.appendChild(fetchText);
//     document.body.appendChild(divFetch);
// }

function checkFetch(fetch) {
    console.log(fetch.results[0].question);
    let correctAnswer = fetch.results[0].correct_answer;
    console.log(correctAnswer);
}
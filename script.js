
createWelcome();
createFetch();


function createWelcome() {
    let createH1 = document.createElement("h1");
    let h1Text = document.createTextNode("Welcome");
    createH1.appendChild(h1Text);
    document.body.appendChild(createH1);
}

function createFetch() {
    let mainDiv = document.createElement("div");
    mainDiv.id = "mainDiv";
    let fetchButton = document.createElement("button");
    fetchButton.setAttribute("onclick", "fetchQuestion()");
    fetchButton.innerText = "Fetch!";
    mainDiv.appendChild(fetchButton);
    document.body.appendChild(mainDiv);
}

function fetchQuestion() {
    fetch("https://opentdb.com/api.php?amount=10")
    .then(datos => datos.json())
    .then(json => console.log(json.results.difficulty)) // aquí
}

function paintFetch(fetch) {
    let divFetch = document.createElement("div");
    divFetch.id = "fetchDiv";
    let fetchText = document.createTextNode(fetch);
    divFetch.appendChild(fetchText);
    document.body.appendChild(divFetch);
}
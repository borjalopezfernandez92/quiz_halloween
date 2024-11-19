// let divWip = document.createElement("div")
// divWip.className = "questionshown";
// let wipText = document.createTextNode("WIP");
// divWip.appendChild(wipText);

// document.body.appendChild(divWip);
if (window.localStorage.length == 0) {
    let getDiv = document.getElementById("bodyDivResults");
    let txtNode = document.createElement("p");
    txtNode.innerText = "No hay resultados, vuelve al inicio y juega.";
    getDiv.appendChild(txtNode);
} else {
    limpiarFecha();
}

function limpiarFecha() { // 
    let resultados = JSON.parse(localStorage.getItem("resultados"));
    let nAciertos = resultados.aciertos;
    let nFallos = resultados.fallos;
    let fecha = resultados.fecha;
    let split = fecha.split(" ");
    for (let i = 0; i < 7; i++) {
        split.pop();
    }
    crearGrafica(nAciertos, nFallos, split);
}

function crearGrafica(aciertos, fallos, fecha) {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Aciertos', 'Fallos'],
            datasets: [{
                label: `Resultados anteriores de la partida con fecha ${fecha}`,
                data: [`${aciertos}`, `${fallos}`],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
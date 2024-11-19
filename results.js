// let divWip = document.createElement("div")
// divWip.className = "questionshown";
// let wipText = document.createTextNode("WIP");
// divWip.appendChild(wipText);

// document.body.appendChild(divWip);

let resultados = JSON.parse(localStorage.getItem("resultados"));
let nAciertos = resultados.aciertos;
let nFallos = resultados.fallos;


crearGrafica(nAciertos, nFallos);

function crearGrafica(aciertos, fallos) {

    console.log(aciertos);
    console.log(fallos);
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Aciertos', 'Fallos'],
          datasets: [{
            label: 'Resultados anteriores',
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
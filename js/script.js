let notasTotal = [];
let totalPorcentaje = 100;
let booleanReiniciar = false;
let form = document.createElement("form");
let input1 = document.createElement("input");
let divCalculadora = document.getElementById("calculadora");

input1.setAttribute("type", "number");
input1.setAttribute("id", "Nota");
input1.setAttribute("step", "any");
input1.setAttribute("placeholder", "0-10");
let spanInput1 = document.createElement("span")
spanInput1.innerText = "Nota: ";

let input2 = document.createElement("input");
input2.setAttribute("type", "number");
input2.setAttribute("id", "Porcentaje");
input2.setAttribute("step", "any");
input2.setAttribute("placeholder", totalPorcentaje);
let spanInput2 = document.createElement("span")
spanInput2.innerText = "Porcentaje: ";

let divInput1 = document.createElement("div");
divInput1.setAttribute("class", "divInput");
divInput1.setAttribute("id", "divInput1");

let divInput2 = document.createElement("div");
divInput2.setAttribute("class", "divInput");
divInput2.setAttribute("id", "divInput2");

let spanPor = document.createElement("span");
spanPor.innerText = "%";

let button = document.createElement("button");
button.setAttribute("class", "btnSubmit");
button.setAttribute("type", "submit");
button.innerText = "CALCULAR";

let br = document.createElement("br");

let titulo = document.createElement("h1");
titulo.innerHTML = "¿Qué he sacao?";
let resultado = document.createElement("h3");
let resultadoFinal = document.createElement("h2");
resultadoFinal.innerHTML = "Nota final: 0/10";


let divResultados = document.createElement("div");
divResultados.setAttribute("id", "divResultados");

let buttonReiniciar = document.createElement("button");
buttonReiniciar.setAttribute("class", "btnSubmit");
buttonReiniciar.setAttribute("onclick", "reiniciar()");
buttonReiniciar.innerText = "REINICIAR";
buttonReiniciar.style.display = "none";
buttonReiniciar.style.margin = "2em";


let explicacion = document.createElement("h3");
explicacion.innerHTML = "<i>Añade la nota de tu examen/trabajo y determina su porcentaje en la nota final.<br>Puedes añadir notas hasta cubrir el 100%.</i>";

let small = document.createElement("small");
small.style.color = "#7B0000";
small.style.fontWeight = "bold";
divCalculadora.appendChild(form);
form.appendChild(titulo);
form.insertAdjacentElement('beforeend', divInput1);
divInput1.insertAdjacentElement('beforeend', spanInput1);
divInput1.insertAdjacentElement('beforeend', input1);
form.insertAdjacentElement('beforeend', divInput2);
divInput2.insertAdjacentElement('beforeend', spanInput2);
divInput2.insertAdjacentElement('beforeend', input2);
divInput2.insertAdjacentElement('beforeend', spanPor);
form.insertAdjacentElement('beforeend', br);
form.insertAdjacentElement('beforeend', small);
form.insertAdjacentElement('beforeend', br);
form.insertAdjacentElement('beforeend', button);
form.insertAdjacentElement('beforeend', buttonReiniciar);
form.insertAdjacentElement('beforeend', divResultados);
divResultados.insertAdjacentElement('beforeend', resultado);
divResultados.insertAdjacentElement('beforeend', explicacion);
form.insertAdjacentElement('beforeend', resultadoFinal);

function reiniciar() {
  resultadoFinal.innerHTML = "";
  resultado.innerHTML = "";
  small.innerText = "";
  booleanReiniciar = true;
  explicacion.style.display = "inline";
}

function submitHandler(e) {
  if (!booleanReiniciar) {

    let dato = document.getElementById('Nota').value;
    let dato2 = document.getElementById('Porcentaje').value;

    if (dato == "" || dato2 == "") {
      small.innerText = "Rellena TODO antes de enviar.";
    } else {
      if (dato < 0 || dato > 10) {
        small.innerText = "La nota debe de ser del 0 al 10";
      }
      else if (dato2 < 1 || dato2 > totalPorcentaje) {
        small.innerText = "El porcentaje debe ser del 1 al " + totalPorcentaje;
      } else {
        small.innerText = "";
        totalPorcentaje -= dato2;
        let calculo = dato * dato2 / 100;
        calculo = Number(calculo.toFixed(2));
        notasTotal.push(calculo);
        resultado.innerHTML += "Una nota de " + dato + " en un " + dato2 + "% da un total de: " + Number(calculo.toFixed(2)) + "/10.<br>";
        resultadoFinal.innerHTML = "Nota final: " + notasTotal.reduce((a, b) => a + b, 0) + "/10";
        if (totalPorcentaje == 0) {
          button.disabled = true;
          buttonReiniciar.style.display = "inline";
        }
        input2.setAttribute("placeholder", totalPorcentaje);
        form.reset();
        explicacion.style.display = "none";
      }
    }
    e.preventDefault();
    booleanReiniciar = false;
  }
}

form.addEventListener("submit", submitHandler);

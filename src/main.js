const elementos = []
const elementosDiv = document.querySelector("#container-elementos");
const titulo = document.querySelector("h1");
const droppableAreas = document.getElementsByClassName("droppable");
const input = document.querySelector("#inputElementos");
const input2 = document.querySelector("#inputTierList");
const boton = document.querySelector(".titleButton");
const boton2 = document.querySelector(".addButton")
const draggable = document.getElementsByClassName("draggable");
let actualElement = null;

boton.addEventListener("click", function() {
  titulo.innerText = 'Tier list de ' +input2.value
})

boton2.addEventListener("click", function añadirProfesor() {
  const div = document.createElement("div");
  div.classList = "draggable";
  div.setAttribute("draggable", "true");
  div.innerText = input.value;
  elementos.push(div);
  elementosDiv.appendChild(div)
  recorrerelementos();
});
function recorrerelementos() {
  Array.from(draggable).forEach(elemento => {
    elemento.addEventListener("dragstart", (event) => {
      actualElement = elemento;
      setTimeout(() => { elemento.style.display = "none"; }, 0);
    });
  });
};
  
document.body.addEventListener("dragover", function (event) {
  event.preventDefault(); // Permite que el evento drop funcione
});
document.body.addEventListener("drop", function (event) {
  event.preventDefault(); // Evita el comportamiento por defecto (por ejemplo, abrir archivos)
  actualElement.style.display = "block";
  if(Array.from(droppableAreas).includes(event.target)) {
    event.target.append(actualElement);
    actualElement = null
  } else {
    let isAssigned = false
    Array.from(droppableAreas).forEach(droppableArea => {
      Array.from(droppableArea.childNodes).forEach(droppable => {
        if (droppable == event.target) {
          droppableArea.appendChild(actualElement)
          isAssigned = true
        };
      });
    });
    if (!isAssigned) {
      elementosDiv.append(actualElement);
      actualElement = null
    };
  };
});


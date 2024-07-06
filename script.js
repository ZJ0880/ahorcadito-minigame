var [wins, losses, abortions] = [0, 0, 0];
var gameInProcess, answer, maskedAnswer, wrongGuesses;
const masthead = document.querySelector("h1");
const winsCount = document.querySelector("#wins-count");
const lossesCount = document.querySelector("#losses-count");
const abortionsCount = document.querySelector("#abortions-count");
const commonWords = [
  { word: "algoritmo", hint: "Un conjunto de instrucciones para resolver un problema" },
  { word: "variable", hint: "Un contenedor para almacenar valores" },
  { word: "funcion", hint: "Un bloque de código reutilizable" },
  { word: "objeto", hint: "Una instancia de una clase en programación orientada a objetos" },
  { word: "clase", hint: "Una plantilla para crear objetos" },
  { word: "metodo", hint: "Una función definida dentro de una clase" },
  { word: "herencia", hint: "Un principio de POO donde una clase hereda atributos y métodos de otra" },
  { word: "encapsulacion", hint: "Un principio de POO que oculta los detalles internos de un objeto" },
  { word: "polimorfismo", hint: "Un principio de POO que permite que las clases tengan métodos con el mismo nombre" },
  { word: "interfaz", hint: "Un contrato que define los métodos que una clase debe implementar" },
  { word: "compilador", hint: "Un programa que traduce código fuente a código máquina" },
  { word: "depuracion", hint: "El proceso de encontrar y corregir errores en el código" },
  { word: "script", hint: "Un archivo que contiene una serie de comandos" },
  { word: "biblioteca", hint: "Una colección de funciones y recursos reutilizables" },
  { word: "framework", hint: "Una estructura de soporte para construir aplicaciones" },
  { word: "repositorio", hint: "Un almacenamiento central para código y archivos de proyectos" },
  { word: "consola", hint: "Una interfaz para interactuar con el sistema o el entorno de desarrollo" },
  { word: "sintaxis", hint: "Las reglas que definen la estructura de un lenguaje de programación" },
  { word: "compilar", hint: "El proceso de traducir código fuente a código máquina" },
  { word: "ejecutar", hint: "Hacer que un programa realice sus funciones" },
  { word: "servidor", hint: "Un sistema que proporciona servicios a otros sistemas o dispositivos" },
  { word: "cliente", hint: "Un dispositivo o programa que utiliza servicios proporcionados por un servidor" },
  { word: "protocolo", hint: "Un conjunto de reglas para la comunicación entre dispositivos" },
  { word: "json", hint: "Un formato de intercambio de datos ligero y fácil de leer" },
  { word: "xml", hint: "Un lenguaje de marcado utilizado para almacenar y transportar datos" },
  { word: "asincronico", hint: "La capacidad de realizar operaciones sin bloquear el flujo del programa" },
  { word: "promesa", hint: "Un objeto que representa la eventual finalización de una operación asincrónica" },
  { word: "callback", hint: "Una función que se pasa como argumento a otra función y se ejecuta después de un evento" },
  { word: "recursividad", hint: "La técnica de definir una función en términos de sí misma" },
  { word: "iteracion", hint: "El proceso de repetir un conjunto de instrucciones" },
  { word: "bucle", hint: "Una estructura de control que permite la repetición de un bloque de código" },
  { word: "condicional", hint: "Una estructura de control que ejecuta un bloque de código basado en una condición" },
  { word: "array", hint: "Una colección ordenada de elementos del mismo tipo" },
  { word: "string", hint: "Una secuencia de caracteres" },
  { word: "entero", hint: "Un número sin parte decimal" },
  { word: "booleano", hint: "Un valor que puede ser verdadero o falso" },
  { word: "nodo", hint: "Un punto de conexión en una estructura de datos, como un árbol o una lista enlazada" },
  { word: "arbol", hint: "Una estructura de datos jerárquica" },
  { word: "grafico", hint: "Una estructura de datos que consiste en nodos y aristas" },
  { word: "hash", hint: "Una estructura de datos que asocia claves con valores" },
  { word: "backend", hint: "La parte de una aplicación que gestiona la lógica del servidor y la base de datos" },
  { word: "frontend", hint: "La parte de una aplicación que interactúa con el usuario" },
  { word: "desarrollador", hint: "Una persona que escribe y mantiene el código de programas" },
  { word: "usuario", hint: "La persona que utiliza una aplicación o sistema" },
  { word: "middleware", hint: "Software que actúa como intermediario entre diferentes sistemas o componentes" },
  { word: "api", hint: "Un conjunto de funciones y procedimientos para interactuar con un sistema" },
  { word: "restful", hint: "Un estilo arquitectónico para diseñar servicios web" }
];

hideAll("#tally span");
document.querySelector("#new-game a").addEventListener("click", newGame);

function newGame() {
  if (gameInProcess) {
      aborted();
  }
  gameInProcess = true;
  masthead.innerText = "Ahorcadito";
  masthead.setAttribute("status", "normal");
  let randomWordObject = newRandomWord();
  answer = randomWordObject.word;
  document.querySelector("#hint").innerText = "Pista: " + randomWordObject.hint;
  console.log("¡Oye, estás haciendo trampa! " + '¡Cierra la consola! La respuesta es "' + answer + '"');
  wrongGuesses = 0;
  resetKeypad();
  maskedAnswer = [];
  for (var i of answer)
      maskedAnswer.push("_");
  updateDisplayWord();
  hang();
}

function newRandomWord() {
    return commonWords[Math.floor(Math.random() * commonWords.length)];
}

function verifyGuess() {
    var guessedLetter = this.innerText.toLowerCase();
    if (answer.toLowerCase().includes(guessedLetter)) {
        for (var i in maskedAnswer) {
            if (answer[i] == guessedLetter)
                maskedAnswer[i] = answer[i];
        }
        updateDisplayWord();
        if (maskedAnswer.includes("_") == false) {
            escaped();
        }
        this.classList.toggle("correct-letter", true);
        this.removeEventListener("click", verifyGuess);
    } else {
        this.classList.toggle("incorrect-letter", true);
        this.removeEventListener("click", verifyGuess);
        wrongGuesses++;
        hang();
    }
}

function updateDisplayWord() {
    var display = "";
    for (var i of maskedAnswer)
        display += i + " ";
    display.slice(0, -1);
    document.querySelector("#guessing").textContent = display;
}

function aborted() {
    abortions++;
    document.querySelector("#abortions-count").innerText = abortions;
    unhideAll(".abortions");
}

function hang() {
    switch (wrongGuesses) {
        case 0:
            hideAll("svg *");
            break;
        case 1:
            unhideAll(".gallows");
            break;
        case 2:
            unhide("#head");
            break;
        case 3:
            unhide("#body");
            break;
        case 4:
            unhide("#left-arm");
            break;
        case 5:
            unhide("#right-arm");
            break;
        case 6:
            unhide("#left-leg");
            break;
        case 7:
            unhide("#right-leg");
            hanged();
            break;
        default:
            newGame();
    }
}

function hanged() {
    gameInProcess = false;
    masthead.innerText = "¡Estás ahorcado!";
    masthead.setAttribute("status", "hanged");
    losses++;
    removeAllListeners();
    unhideAll(".losses");
    document.querySelector("#losses-count").innerText = losses;
    var display = "";
    for (var i of answer)
        display += i + " ";
    display.slice(0, -1);
    document.querySelector("#guessing").textContent = display;
}

function escaped() {
    gameInProcess = false;
    masthead.innerText = "¡Escapaste!";
    masthead.setAttribute("status", "escaped");
    wins++;
    removeAllListeners();
    unhideAll(".wins");
    document.querySelector("#wins-count").innerText = wins;
}

function removeAllListeners() {
    for (let i of document.querySelectorAll("#keypad a")) {
        i.removeEventListener("click", verifyGuess);
        i.classList.toggle("finished", true);
    }
}

function resetKeypad() {
    for (var i of document.querySelectorAll("#keypad div"))
        i.innerText = "";
    populateRow(1, "QWERTYUIOP");
    populateRow(2, "ASDFGHJKL");
    populateRow(3, "ZXCVBNM");
}

function populateRow(rowNumber, rowLetters) {
    for (let i of rowLetters) {
        let key = document.createElement("a");
        key.id = i.toLowerCase();
        key.append(i);
        key.addEventListener("click", verifyGuess);
        document.querySelector("#keypad--row" + rowNumber).append(key);
    }
}

function unhide(targetElement) {
    document.querySelector(targetElement).classList.toggle("hidden", false);
}

function hideAll(targetElements) {
    for (let i of document.querySelectorAll(targetElements))
        i.classList.toggle("hidden", true);
}

function unhideAll(targetElements) {
    for (let i of document.querySelectorAll(targetElements))
        i.classList.toggle("hidden", false);
}

const urlBase = "https://pokeapi.co/api/v2/pokemon";
const PAGINADO = 50;

var btn = document.getElementById("car");
var inic = document.getElementById("ini");
var atr = document.getElementById("prv");
var sigue = document.getElementById("sig");
var ult = document.getElementById("final");
var tabula = document.getElementById("cTabla");
btn.addEventListener("click", cargaListaPokemon);
atr.addEventListener("click", atras);
sigue.addEventListener("click", siguiente);
inic.addEventListener("click", inicio);
ult.addEventListener("click", fin);

var offset = 0;
var limit = PAGINADO;
var maxNum = -1; //primero lo pongo a -1 para luego cambiarlo

function getUrlListaPokemon() {
  return `${urlBase}?offset=${offset}&limit=${limit}`;
}

function cargaListaPokemon() {
  //limpio la lista por si acaso
  tabula.innerHTML = "";

  fetch(getUrlListaPokemon())
    .then((datos) => datos.json())
    .then((datos2) => {
      for (let i = 0; i < datos2.results.length; i++) {
        fila = document.createElement("tr");
        t1 = document.createElement("td");
        a1 = document.createTextNode(`${i + offset + 1}`);
        t1.appendChild(a1);
        t2 = document.createElement("td");
        a2 = document.createTextNode(`${datos2.results[i].name}`);
        t2.appendChild(a2);
        fila.appendChild(t1);
        fila.appendChild(t2);
        tabula.appendChild(fila);
      }

      maxNum = datos2.count;
    });
  btn.removeEventListener("click", cargaListaPokemon); //quito el evento porque ya no es necesario
}

function siguiente() {
  offset += PAGINADO;
  cargaListaPokemon();
}

//para retroceder en el paginado, comprueba si puede ir atrás para que no tengar que hacer peticiones innecesarias
function atras() {
  if (offset > 0) {
    offset -= PAGINADO;
    cargaListaPokemon();
  }
}

//para ir al inicio, comprueba si ya está en el inicio para que no haga peticiones innecesarias
function inicio() {
  if (offset != 0) {
    offset = 0;
    cargaListaPokemon();
  }
}

function fin() {
  if (maxNum != -1) {
    offset =
      maxNum % PAGINADO == 0 ? maxNum - PAGINADO : maxNum - (maxNum % PAGINADO);
  }
  cargaListaPokemon();
}

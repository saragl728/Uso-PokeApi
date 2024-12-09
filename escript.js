const urlBase = "https://pokeapi.co/api/v2/pokemon";
const PAGINADO = 50;

var btn = document.getElementById("car");
var atr = document.getElementById("prv");
var sigue = document.getElementById("sig");
var tabula = document.getElementById("cTabla");
btn.addEventListener("click", cargaListaPokemon);
atr.addEventListener("click", atras);
sigue.addEventListener("click", siguiente);

var offset = 0;
var limit = PAGINADO;

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
    });
}

function siguiente() {
  offset += PAGINADO;
  cargaListaPokemon();
}

function atras() {
  offset -= PAGINADO;
  cargaListaPokemon();
}

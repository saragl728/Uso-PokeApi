const urlBase = "https://pokeapi.co/api/v2/pokemon";
const PAGINADO = 50;

var btn = document.getElementById("car");
var tabula = document.getElementById("cTabla");
var pe = document.getElementById("t");
btn.addEventListener("click", cargaDatos);

var offset = 900;
var limit = PAGINADO;

function getUrlLista() {
  return `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
}

function cargaDatos() {
  fetch(getUrlLista())
    .then((datos) => datos.json())
    .then((datos2) => {
      console.log(getUrlLista());
      for (let i = 0; i < datos2.results.length; i++) {
        //console.log(datos2.results[i].name);
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
}

function atras() {
  offset -= PAGINADO;
}

const urlBase = "https://pokeapi.co/api/v2/pokemon";
const PAGINADO = 50;

var btn = document.getElementById("car");
var atr = document.getElementById("prv");
var inic = document.getElementById("ini");
var sigue = document.getElementById("sig");
var ult = document.getElementById("final");
var tabula = document.getElementById("cTabla");
btn.addEventListener("click", cargaListaPokemon);
atr.addEventListener("click", atras);
sigue.addEventListener("click", siguiente);
inic.addEventListener("click", inicio);
ult.addEventListener("click", fin);

var offset = 900;
var limit = PAGINADO;
var maxNum = -1; //primero lo pongo a -1 para luego cambiarlo

function getUrlListaPokemon() {
  return `${urlBase}?offset=${offset}&limit=${limit}`;
}

//uso async porque con fetch puede salir desordenado
async function cargaListaPokemon() {
  //limpio la lista por si acaso
  tabula.innerHTML = "";

  const resp = await fetch(getUrlListaPokemon());
  const datos2 = await resp.json();
  lista = datos2.results;
  maxNum = datos2.count;
  for (let i = 0; i < lista.length; i++) {
    await anyadeFila(datos2.results[i].name);
  }

  btn.removeEventListener("click", cargaListaPokemon); //quito el evento porque ya no es necesario
}

async function anyadeFila(id) {
  let uri = `${urlBase}/${id}`;

  const resp = await fetch(uri);
  const daatos = await resp.json();

  fila = document.createElement("tr");
  t1 = document.createElement("td");
  t2 = document.createElement("td");
  t3 = document.createElement("td");
  t4 = document.createElement("td");
  t5 = document.createElement("td");
  t6 = document.createElement("td");
  t7 = document.createElement("td");
  t8 = document.createElement("td");
  t9 = document.createElement("td");
  t10 = document.createElement("td");
  t11 = document.createElement("td");

  a1 = document.createTextNode(daatos.id);
  t1.appendChild(a1);

  a2 = document.createTextNode(daatos.name);
  t2.appendChild(a2);

  imag = document.createElement("img");
  imag.setAttribute("src", `${daatos.sprites.front_default}`);
  t3.appendChild(imag);

  a4 = document.createTextNode(daatos.stats[0].base_stat);
  t4.appendChild(a4);

  a5 = document.createTextNode(daatos.stats[1].base_stat);
  t5.appendChild(a5);

  a6 = document.createTextNode(daatos.stats[2].base_stat);
  t6.appendChild(a6);

  a7 = document.createTextNode(daatos.stats[3].base_stat);
  t7.appendChild(a7);

  a8 = document.createTextNode(daatos.stats[4].base_stat);
  t8.appendChild(a8);

  a9 = document.createTextNode(daatos.stats[5].base_stat);
  t9.appendChild(a9);

  //tipos
  a10 = document.createTextNode(daatos.types[0].type.name);
  t10.appendChild(a10);

  a11 =
    daatos.types.length > 1
      ? document.createTextNode(daatos.types[1].type.name)
      : document.createTextNode("");
  t11.appendChild(a11);

  fila.appendChild(t1);
  fila.appendChild(t2);
  fila.appendChild(t3);
  fila.appendChild(t4);
  fila.appendChild(t5);
  fila.appendChild(t6);
  fila.appendChild(t7);
  fila.appendChild(t8);
  fila.appendChild(t9);
  fila.appendChild(t10);
  fila.appendChild(t11);
  tabula.appendChild(fila);
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
    console.log(n);
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

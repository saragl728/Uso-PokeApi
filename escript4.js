const urlBase = "https://pokeapi.co/api/v2/type";

var btn = document.getElementById("car");
var tabula = document.getElementById("cTabla");
var texto = document.getElementById("buscador");
var des = document.getElementById("descr")

var temp = ""; //variable que almacena el nombre del último tipo buscado

btn.addEventListener("click", muestraDatos);

function getUrl() {
  return `${urlBase}/${texto.value.trim()}`;
}

//se usa async para que salga en orden
async function muestraDatos() {
  if (texto.value.trim() != "") {
    const resp = await fetch(getUrl());
    const datos2 = await resp.json();

    if (temp != datos2.name) {
      des.textContent = `Se han encontrado ${datos2.pokemon.length} Pokémon`
      temp = datos2.name; //si se busca el mismo tipo, no se recrea la tabla
      lista = datos2.pokemon;

      tabula.innerHTML = "";

      for (let i = 0; i < lista.length; i++) {
        await anyadeFila(lista[i].pokemon.name);
      }
    }
  }
}

async function anyadeFila(id) {
  let uri = `https://pokeapi.co/api/v2/pokemon/${id}`;

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

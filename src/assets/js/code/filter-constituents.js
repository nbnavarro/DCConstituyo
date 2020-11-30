/* eslint no-restricted-syntax: [0, "ForOfStatement"] */
function filterConstituents() {
  function ejecutarLimpiar() {
    const listaCartas = document.getElementsByClassName('constituent');
    for (const nodo of listaCartas) {
      nodo.classList.remove('hide');
    }
  }

  function filtrarAmbasCosas(event) {
    event.preventDefault();
    ejecutarLimpiar();
    const listaCartas = document.getElementsByClassName('constituent');
    let selector = document.getElementById('selectorTopicId').value;
    let minAge = document.getElementById('minAgeInput').value;
    let maxAge = document.getElementById('maxAgeInput').value;
    if (minAge === '') {
      minAge = 0;
    }
    if (maxAge === '') {
      maxAge = 150;
    }
    if (selector !== 'nada') {
      selector = parseInt(selector, 10);
      for (const cartaConst of listaCartas) {
        let listaTemasC = cartaConst.id.split('_')[3];

        listaTemasC = JSON.parse(listaTemasC);
        if (!(listaTemasC.includes(selector))) {
          cartaConst.classList.add('hide');
        }
      }
    }

    for (const cartaConst of listaCartas) {
      let constituentEdad = cartaConst.id.split('_')[1];
      constituentEdad = parseInt(constituentEdad, 10);
      if (!(constituentEdad >= minAge && constituentEdad <= maxAge)) {
        cartaConst.classList.add('hide');
      }
    }
  }

  const botonFiltrar = document.getElementById('botonFiltrarConstituents');
  const eseForm = document.getElementById('formFilterConstituentsAge');
  const botonLimpiar = document.getElementById('botonLimpiarConstituents');
  if (botonFiltrar) {
    // botonFiltrar.addEventListener('click',filtrarAmbasCosas)
    eseForm.addEventListener('submit', filtrarAmbasCosas);
    botonLimpiar.addEventListener('click', ejecutarLimpiar);
  }
}

filterConstituents();

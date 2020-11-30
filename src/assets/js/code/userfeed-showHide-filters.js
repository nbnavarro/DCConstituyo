function userfeedShowHideFilter() {
  function showHideFilter() {
    const filterCard = document.getElementById('filterCard');
    if (filterCard.classList.contains('hide')) {
      filterCard.classList.remove('hide');
      this.innerHTML = 'Ocultar filtros';
    } else {
      filterCard.classList.add('hide');
      this.innerHTML = 'Mostrar filtros';
    }
  }

  const botonMostrarOcultar = document.getElementById('mostrarOcultarFiltro');
  if (botonMostrarOcultar) {
    botonMostrarOcultar.addEventListener('click', showHideFilter);
  }
}

userfeedShowHideFilter();

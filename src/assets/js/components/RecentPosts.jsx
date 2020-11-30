import React, { useState } from 'react';
import { hot } from 'react-hot-loader';

function RecentPosts(props) {
	const [showHideButton, setContentShowHideButton] = useState('Mostrar filtros');

	var dictFiltroConstituents = JSON.parse(props.serverData.react_filtro_constituents)
	var optionsSelectorCons = []
	for (let idC in dictFiltroConstituents){
		let esteConstituent =dictFiltroConstituents[idC]
		optionsSelectorCons.push(<option key={idC} value={esteConstituent.name}>{esteConstituent.name}</option>)
	}

	//Funcionalidades
	function showHideFilter() {
		var filterCard = document.getElementById('filterCard')
		if (filterCard.classList.contains("hide")){
				filterCard.classList.remove("hide")
				setContentShowHideButton('Ocultar filtros')
		} else {
				filterCard.classList.add("hide")
				setContentShowHideButton('Mostrar filtros')
		}
	}

	function ejecutarFiltroCons() {
		Limpiar()
		var selector = document.getElementById('selectorConstituent');
		console.log(selector.value)
		var filtradas = document.getElementsByName(selector.value);
		var cartasRecientes = document.getElementsByClassName("cartasRecientes");
		for (let nodo of cartasRecientes) {
			if (!(nodo.getAttribute('name') == selector.value)) {
				nodo.classList.add('hide')
			}
		}
	}

	function ejecutarFiltroDate() {
		Limpiar()
		var selector = document.getElementById('selectorDate');
		var cantidadDias = selector.value
		cantidadDias = parseInt(cantidadDias)
		var actualDate = new Date()
		var diaFiltro = new Date();
		diaFiltro.setDate(actualDate.getDate() - cantidadDias);

		var cartasRecientes = document.getElementsByClassName("cartasRecientes");
		for (let nodo of cartasRecientes) {
			let fechaNodo = new Date(nodo.id.split("_")[1])
			if (!(fechaNodo.getTime()>= diaFiltro.getTime())) {
				nodo.classList.add('hide')
			}
		}
	}

	function Limpiar() {
		var cartasRecientes = document.getElementsByClassName("cartasRecientes");
		for (let nodo of cartasRecientes){
			nodo.classList.remove('hide')
		}
	}

	return (
		<div>
			<div className="margen-showHideFilters">
			    <button className="button" id="mostrarOcultarFiltro" onClick={showHideFilter}>{showHideButton}</button>
			</div>
			<div className="card hide" id="filterCard">
			    <h3>Filtrar publicaciones por constituyente</h3>
			    <label>Elige un constituyente :</label>
			    <select id="selectorConstituent">
			        {optionsSelectorCons}
			    </select>
			    <button className="button" id="filtrar" onClick={ejecutarFiltroCons}>Filtrar</button>

			    <h3>Filtrar por fecha</h3>
			    <label>Publicaciones hace :</label>
			    <select id="selectorDate">
			        <option value="1" id="date1">1 día</option>
			        <option value="2" id="date2">2 días</option>
			        <option value="3" id="date3">3 días</option>
			        <option value="4" id="date4">4 días</option>
			        <option value="5" id="date5">5 días</option>
			        <option value="6" id="date6">6 días</option>
			    </select>
			    <button className="button" id="filtrarDate" onClick={ejecutarFiltroDate}>Filtrar</button>
			    
			    <div>
			        <button className="button" id="limpiar" onClick={Limpiar}>Limpiar filtros</button>
			    </div>
			
			</div>
		</div>
	);
}

export default hot(module)(RecentPosts);
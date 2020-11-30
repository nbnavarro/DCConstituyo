import React, { useState } from "react";
import { hot } from 'react-hot-loader';

function SearchSenator() {

  	const [searchedSenator, setSearchedSenator] = useState("");
	
	function updateSearchedSenator(event){
		setSearchedSenator(event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").replace(/\./g,""))
	}
	
	function filterSenatorByName(){
		console.log(searchedSenator)
		var allSenatorCards = document.getElementsByClassName("card")
		allSenatorCards = Array.prototype.slice.call(allSenatorCards)
		for (var senatorCard of allSenatorCards){
			var senatorName = senatorCard.children[0].innerHTML.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").replace(/\./g,"")
			senatorCard.classList.remove("hide")
			if (!senatorName.includes(searchedSenator)){
				senatorCard.classList.add("hide")
			}
		}
	}

	return (
		<div>

			<input placeholder="Senador" type="text" onChange={updateSearchedSenator}/>  	
			<button className="button" onClick={filterSenatorByName}>Buscar</button>

		</div>
	);
}

export default hot(module)(SearchSenator);
import React, { useState } from "react";
import { hot } from 'react-hot-loader';

function SearchConstituent() {

  	const [searchedConstituent, setSearchedConstituent] = useState("");
	
	function updateSearchedConstituent(event){
		setSearchedConstituent(event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""))
	}
	
	function filterConstituentByName(){
		console.log(searchedConstituent)
		var allConstituentCards = document.getElementsByClassName("card")
		allConstituentCards = Array.prototype.slice.call(allConstituentCards)
		allConstituentCards.shift();
		allConstituentCards.shift();
		for (var constituentCard of allConstituentCards){
			var constituentName = constituentCard.children[0].children[0].innerHTML.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"")
			constituentCard.classList.remove("hide")
			if (!constituentName.includes(searchedConstituent)){
				constituentCard.classList.add("hide")
			}
		}
	}

	return (
		<div>

			<input placeholder="constituyente" type="text" onChange={updateSearchedConstituent}/>  	
			<button className="button" onClick={filterConstituentByName}>Buscar</button>

		</div>
	);
}

export default hot(module)(SearchConstituent);
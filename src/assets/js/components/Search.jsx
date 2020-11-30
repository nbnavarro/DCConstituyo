import React, { useState } from "react";
import { hot } from 'react-hot-loader';

function Search() {

  	const [searchedTopic, setSearchedTopic] = useState("");
	
	function updateSearchedTopic(event){
		setSearchedTopic(event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""))
	}
	
	function filterTopicByName(){
		var filteredTopics = []
		var allTopicCards = document.getElementsByClassName("card")
		allTopicCards = Array.prototype.slice.call(allTopicCards)
		allTopicCards.shift();
		for (var topicCard of allTopicCards){
			var topicName = topicCard.children[0].children[0].innerHTML.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"")
			topicCard.classList.remove("hide")
			if (!topicName.includes(searchedTopic)){
				topicCard.classList.add("hide")
			}
		}
	}

	return (
		<div>

			<input placeholder="tema" type="text" onChange={updateSearchedTopic}/>  	
			<button className="button" onClick={filterTopicByName}>Buscar</button>

		</div>
	);
}

export default hot(module)(Search);
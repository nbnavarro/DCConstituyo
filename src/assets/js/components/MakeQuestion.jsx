import React, { useState } from "react";
import { hot } from 'react-hot-loader';

function MakeQuestion(props) {
	
	const [questionContent, setQuestionContent] = useState();
	
	function updateQuestionContent(){
		setQuestionContent(event.target.value)
	}

	async function postQuestion(){
		var listServerData = props.serverData.content.split("_")
		var questionType = listServerData[0]
		var constituentId = parseInt(listServerData[1])
		var authorQuestionId = parseInt(listServerData[2])

		if (process.env.NODE_ENV == 'development'){
			var urlRaiz = 'http://localhost:3000'
		} else {
			var urlRaiz = 'https://dcconstituyo.herokuapp.com'
		}

		if (questionType == "voterQuestion"){
			var ruta = `${urlRaiz}/constituents/${constituentId}/questions/voter`
		} else {
			var ruta = `${urlRaiz}/constituents/${constituentId}/questions/constituent`
		}
		
		var body = {
            "constituentId": constituentId,
			"content": questionContent,
			"authorId": authorQuestionId
		}

		body = JSON.stringify(body);

		await fetch(ruta, {
			'method': 'POST',
			'headers': {'Content-Type':'application/json'},
			'body': body
		});
		window.location.reload();

	}

	return (
		<div>
			
			<textarea placeholder="pregunta" onChange={updateQuestionContent}/>
			<button className="button" onClick={postQuestion}>Preguntar</button>
			
		</div>
	);
}

export default hot(module)(MakeQuestion);
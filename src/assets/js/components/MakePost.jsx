import React, { useState } from "react";
import { hot } from 'react-hot-loader';

function MakePost(props) {
	
	const [postContent, setpostContent] = useState();
	
	function updatePostContent(){
		setpostContent(event.target.value)
	}

	async function postPost(){
		var constituentId = props.serverData.content

		if (process.env.NODE_ENV == 'development'){
			var urlRaiz = 'http://localhost:3000'
		} else {
			var urlRaiz = 'https://dcconstituyo.herokuapp.com'
		}


		var ruta = `${urlRaiz}/constituents/${constituentId}/posts/`
		
		var body = {
			"constituentId": constituentId,
			"content": postContent,
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
			
			<textarea placeholder="Publicación" onChange={updatePostContent}/>
			<button className="button" onClick={postPost}>Publicar</button>
			
		</div>
	);
}

export default hot(module)(MakePost);
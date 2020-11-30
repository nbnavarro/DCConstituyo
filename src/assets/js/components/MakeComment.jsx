import React, { useState } from "react";
import { hot } from 'react-hot-loader';

function MakeComment(props) {
	
	const [commentContent, setCommentContent] = useState();
	
	function updateCommentContent(){
		setCommentContent(event.target.value)
	}

	async function postComment(){
		var listServerData = props.serverData.content.split("_")
		var commentType = listServerData[0]
		var postOwnerId = parseInt(listServerData[1])
		var postId = parseInt(listServerData[2])
		var authorCommentId = parseInt(listServerData[3])

		if (process.env.NODE_ENV == 'development'){
			var urlRaiz = 'http://localhost:3000'
		} else {
			var urlRaiz = 'https://dcconstituyo.herokuapp.com'
		}

		if (commentType == "voterComment"){
			var ruta = `${urlRaiz}/constituents/${postOwnerId}/posts/${postId}/comments/`
		} else {
			var ruta = `${urlRaiz}/constituents/${postOwnerId}/posts/${postId}/comments/constituent`
		}
		
		var body = {
			"postId": postId,
			"content": commentContent,
			"authorCommentId": authorCommentId
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
			
			<textarea placeholder="comentario" onChange={updateCommentContent}/>
			<button className="button" onClick={postComment}>Comentar</button>
			
		</div>
	);
}

export default hot(module)(MakeComment);
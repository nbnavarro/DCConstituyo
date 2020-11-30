import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Search from './components/Search';
import RecentPosts from './components/RecentPosts'
import Organizer from './components/Organizer'
import MakeComment from './components/MakeComment';
import MakeQuestion from './components/MakeQuestion';
import SearchConstituent from './components/SearchConstituent';
import SearchSenator from './components/SearchSenator';
import MakePost from './components/MakePost';

const reactAppContainer = document.getElementById('react-app');
if (reactAppContainer) {
  ReactDOM.render(<App />, reactAppContainer);
}

const reactSearchContainer = document.getElementById('react-search');
if (reactSearchContainer) {
  ReactDOM.render(<Search />, reactSearchContainer);
}

const reactRecentPosts = document.getElementById('react-recent-posts');
if (reactRecentPosts) {
   ReactDOM.render(<RecentPosts serverData={reactRecentPosts.dataset} />, reactRecentPosts);
}

const reactOrganizerContainer = document.getElementById('react-organizer');
if (reactOrganizerContainer) {
  ReactDOM.render(<Organizer/>, reactOrganizerContainer);
}

const newCommentDivs = document.getElementsByClassName('react-make-comment');
for (const reactMakeCommentContainer of newCommentDivs){
	ReactDOM.render(<MakeComment serverData={reactMakeCommentContainer.dataset} />, reactMakeCommentContainer);
}

const newQuestionDivs = document.getElementsByClassName('react-make-question');
for (const reactMakeQuestionContainer of newQuestionDivs){
  ReactDOM.render(<MakeQuestion serverData={reactMakeQuestionContainer.dataset} />, reactMakeQuestionContainer);
}

const reactSearchConstituentContainer = document.getElementById('react-search-constituent');
if (reactSearchConstituentContainer) {
  ReactDOM.render(<SearchConstituent />, reactSearchConstituentContainer);
}

const reactSearchSenatorContainer = document.getElementById('react-search-senator');
if (reactSearchSenatorContainer) {
  ReactDOM.render(<SearchSenator />, reactSearchSenatorContainer);
}

const reactMakePostContainer = document.getElementById('react-make-post');
if (reactMakePostContainer) {
  ReactDOM.render(<MakePost serverData={reactMakePostContainer.dataset} />, reactMakePostContainer);
}
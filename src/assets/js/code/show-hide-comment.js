function showHide() {
  const id = this.id.split('_')[1];
  const comments = document.getElementById(`comments_${id}`);
  if (comments.classList.contains('hide')) {
    comments.classList.remove('hide');
    this.innerHTML = 'Ocultar comentarios';
  } else {
    comments.classList.add('hide');
    this.innerHTML = 'Mostrar comentarios';
  }
}

const buttons = document.getElementsByClassName('button-showHide');

for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener('click', showHide);
}

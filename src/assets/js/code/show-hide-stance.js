function showHideStance() {
  const id = this.id.split('_')[1];
  const stanceOfTopic = document.getElementById(`stanceOfTopic_${id}`);
  if (stanceOfTopic.classList.contains('hide')) {
    stanceOfTopic.classList.remove('hide');
    this.innerHTML = 'Ocultar posturas';
  } else {
    stanceOfTopic.classList.add('hide');
    this.innerHTML = 'Mostrar posturas';
  }
}

const buttonsOfStances = document.getElementsByClassName('buttonStance-showHide');

for (let i = 0; i < buttonsOfStances.length; i += 1) {
  buttonsOfStances[i].addEventListener('click', showHideStance);
}

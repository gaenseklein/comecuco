function playbutton(button){
  let audio = document.getElementById(button.name);
  if(!audio)return;
  audio.play();
  audio.parentElement.classList.add('playing');
}

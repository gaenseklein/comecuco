  var calecitaactivo=0;
  var calecitatiempo=3000;
  var calecitatimer;
  function calecita(){
    let lis = document.querySelectorAll('.calecita li');
    let oldli=document.querySelector('.calecita li.activo');
    if(oldli)oldli.classList.remove('activo');
    if(lis[calecitaactivo])lis[calecitaactivo].classList.add('activo');
    calecitaactivo++;
    if(calecitaactivo>3)calecitaactivo=0;
    calecitatimer=setTimeout(calecita, calecitatiempo);
  }
  calecita();

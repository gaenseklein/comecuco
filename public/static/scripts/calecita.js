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


  function calecitanextya(){
    let lis = document.querySelectorAll('.calecita li');
    let oldli=document.querySelector('.calecita li.activo');
    let valorlisNext=0+calecitaactivo;
    if(valorlisNext>3)valorlisNext=0;
    if(oldli)oldli.classList.remove('activo');
    if(lis[valorlisNext])lis[valorlisNext].classList.add('activo');
    calecitaactivo=valorlisNext++;
    if(calecitaactivo>3)calecitaactivo=0;
  }

  function calecitaprevya(){
    let lis = document.querySelectorAll('.calecita li');
    let oldli=document.querySelector('.calecita li.activo');
    let valorlisPrev=0+calecitaactivo-1;
    if(valorlisPrev<0)valorlisPrev=3;
    if(oldli)oldli.classList.remove('activo');
    if(lis[valorlisPrev])lis[valorlisPrev].classList.add('activo');
    calecitaactivo=valorlisPrev--;
    if(calecitaactivo<0)calecitaactivo=3;
  }

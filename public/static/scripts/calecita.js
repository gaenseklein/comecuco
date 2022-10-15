  var calecitaactivo=0;
  var calecitatiempo=3000;
  var calecitatimer;
  function calecita(){
    let lis = document.querySelectorAll('.calecita li');
    let oldli=document.querySelector('.calecita li.activo');
    if(oldli)oldli.classList.remove('activo');
    if(lis[calecitaactivo])lis[calecitaactivo].classList.add('activo');
    calecitaactivo++;
    if(calecitaactivo>=lis.length)calecitaactivo=0;
    calecitatimer=setTimeout(calecita, calecitatiempo);
  }
  calecita();


  function calecitacontrol(right){
    clearTimeout(calecitatimer);
    let lis = document.querySelectorAll('.calecita li');
    let oldli=document.querySelector('.calecita li.activo');
    if (right){var valorlisNew=calecitaactivo+1;
        if(valorlisNew>=lis.length)valorlisNew=0;
    }else {var valorlisNew=calecitaactivo-1;
        if(valorlisNew<0)valorlisNew=lis.length-1;
      };
    if(oldli)oldli.classList.remove('activo');
    if(lis[valorlisNew])lis[valorlisNew].classList.add('activo');
    calecitaactivo=valorlisNew;
    calecitatimer=setTimeout(calecita, 5000);
  }

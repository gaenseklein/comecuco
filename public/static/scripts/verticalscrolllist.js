function scrollList(button){
  let wrapper = button.parentElement;
  let buttons = wrapper.querySelectorAll('button');
  let toRight = button.classList.contains('derecha');
  let listelements = wrapper.querySelectorAll('li');
  let list = wrapper.querySelector('ul');
  let listwrapper = list.parentElement;
  let actscroll = listwrapper.scrollLeft;
  let scrollamount = Math.floor(list.clientWidth/listelements.length)
  scrollamount = listelements[0].clientWidth+20;
  if(toRight){
    let newscroll=actscroll + scrollamount;
    if(newscroll>listwrapper.scrollLeftMax){
      buttons[1].disabled=true;
    }
    listwrapper.scrollLeft = newscroll;
    buttons[0].disabled=false;
  }else{
    let newscroll =actscroll - scrollamount;
    if(newscroll<=20){
      newscroll=0;
      buttons[0].disabled=true;
    }
    listwrapper.scrollLeft = newscroll;
    buttons[1].disabled=false;
  }
}

function scrollListInit(wrapperId){
  let wrapper = document.getElementById(wrapperId);
  let targetspace = wrapper.querySelector('.vertical-scroll-wrapper');
  let listelements = targetspace.querySelectorAll('li');
  let sizebetween = 20;
  let maxItems = 3;
  if(maxItems>listelements.length)maxItems=listelements.length;
  let elementwidth= targetspace.offsetWidth / maxItems- sizebetween;
  for (let x=0;x<listelements.length;x++){
    listelements[x].style.width=elementwidth+"px";
    listelements[x].style.marginright=sizebetween+"px";
  }
  console.log('elwidth:',elementwidth,'maxspace:',targetspace.offsetWidth);
}

scrollListInit('cajacolumna');

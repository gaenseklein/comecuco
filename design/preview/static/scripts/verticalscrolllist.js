function scrollList(button){
  let wrapper = button.parentElement;
  let buttons = wrapper.querySelectorAll('button');
  let toRight = button.classList.contains('derecha');
  let listelements = wrapper.querySelectorAll('li');
  let list = wrapper.querySelector('ul');
  let listwrapper = list.parentElement;
  let actscroll = listwrapper.scrollLeft;
  let scrollamount = Math.floor(list.clientWidth/listelements.length)
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

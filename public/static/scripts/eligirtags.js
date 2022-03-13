const tagcontroler = {
  createButton: function(tag){
    let b = document.createElement('button');
    b.classList.add('tagdisplay');
    b.onclick=function(){tagcontroler.handle(this)};
    b.value=tag;
    b.type="button";
    b.innerText='<- '+tag;
    return b;
    //return `<button class="tagdisplay" type="button" onclick="tagcontroler.handle(this)" value="${tag}">${tag}</button>`;
  },
  handle: function(button){
    //find out if to remove or add tag:
    let remove = button.parentElement.id=='tagdisplay';
    if(remove)this.remove(button);
    else this.add(button);
  },
  activeTags: [],
  add: function(button){
    // document.getElementById('tagdisplay').appendChild(button);
    let parent = document.getElementById('tagdisplay')
    parent.insertBefore(button, parent.lastElementChild);
    this.activeTags.push(button.value);
    button.innerText = button.value + " x";
    document.getElementById('tagsContainer').value=this.activeTags.join(',');
  },
  remove: function(button){
    document.getElementById('addTagDialog').appendChild(button);
    button.innerText = "<- " + button.value;
    for(let x=this.activeTags.length;x>=0;x--){
      if(this.activeTags[x]==button.value){
        this.activeTags.splice(x,1);
        break;
      }
    }
    document.getElementById('tagsContainer').value=this.activeTags.join(',');
  },
  openDialog: function(){
    let dialog=document.getElementById('addTagDialog');
    let b=document.getElementById('openDialog');
    dialog.classList.toggle('active');
    if(dialog.classList.contains('active'))b.innerText='cerrar tag menu';
    else b.innerText = "añadir tag";
  },
  init: function(){
    let rawc = document.getElementById('alltags');
    let raw = rawc.innerHTML;
    let dialog = document.getElementById('addTagDialog');
    let tags = raw.split('\n');
    for (let x=tags.length-1;x>=0;x--){
      let newb = this.createButton(tags[x]);
      dialog.appendChild(newb);
    }
    rawc.parentElement.removeChild(rawc);
  },
  newTag: function(){
    let newtag = prompt('escribe nuevo tag');
    if(newtag){
      let newbutton = this.createButton(newtag);
      this.add(newbutton);
    }
  },
}

tagcontroler.init();

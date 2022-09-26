async function cambiaDestacada(button){
  console.log(button.value);
  let target = button.previousElementSibling;
  let oldtext = target.innerText;
  let padre = button.parentElement;
  let newTag = prompt("elige nueva destacada");
  if(!newTag)return;
  //pregunta al servidor, espera repuesta:
  target.innerText='guardando nueva destacada, espera...';
  // let token = document.cookie.substring('jwt='.length)
  let resp = await fetch('/api/destacada',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie:document.cookie,
    },
    body: JSON.stringify({
      mes:button.value,
      valor: newTag
    })
  })
  let respobj= await resp.json();
  if(respobj.error || respobj.existoso==false){
    alert('algo no funciono')
    target.innerText=oldtext;
    return;
  }
  // await timeout(2000);
  //ponelo al target:
  target.innerText=newTag;
  padre.classList.remove('noeligido');
}

const tagadmin = {
  init: async function(){
    this.ul = document.createElement('ul')
    this.ul.id='taglist'
    document.body.appendChild(this.ul)
    let resp = await fetch('/api/tags',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie:document.cookie,
      }
    })
    let respobj= await resp.json();
    if(respobj.error || respobj.existoso==false){
      alert('algo no funciono')
      let msg = 'ooops, something went wrong'
      let msgn = document.createElement('div')
      msgn.classList.add('error')
      msgn.innerText=msg
      document.body.appendChild(msgn)
      return;
    }
    let taglist = respobj
    for(let x=0;x<taglist.length;x++){
      this.addTagToList(taglist[x])
    }
  },
  addTagToList: function(value){
    let li = document.createElement('li')
    let span = document.createElement('span')
    span.innerText=value
    let borrarbutton = document.createElement('button')
    borrarbutton.classList.add('borrar')
    borrarbutton.innerText='borrar'
    borrarbutton.value=value
    borrarbutton.onclick=function(){tagadmin.borrar(this)}
    let cambiarbutton = document.createElement('button')
    cambiarbutton.classList.add('cambiar')
    cambiarbutton.innerText='cambiar'
    cambiarbutton.value=value
    cambiarbutton.onclick=function(){tagadmin.cambia(this)}
    li.appendChild(span)
    li.appendChild(cambiarbutton)
    li.appendChild(borrarbutton)
    this.ul.appendChild(li)
  },
  nuevo: async function(){
    let n = prompt('entre nueva tag/destacada')
    if(!n)return
    let resp = await fetch('/api/tags/nuevo',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie:document.cookie,
      },
      body: JSON.stringify({
        tag:n
      })
    })
    let respobj= await resp.json();
    if(respobj.error || respobj.existoso==false){
      alert('algo no funciono')
      // target.innerText=oldtext;
      return;
    }
    this.addTagToList(n)
  },
  cambia: async function(button){
    let tag = button.value
    let n = prompt('entre nueva tag/destacada')
    if(!n)return
    let resp = await fetch('/api/tags/cambia',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie:document.cookie,
      },
      body: JSON.stringify({
        viejo:tag,
        nuevo:n
      })
    })
    let respobj= await resp.json();
    if(respobj.error || respobj.existoso==false){
      alert('algo no funciono')
      // target.innerText=oldtext;
      return;
    }
    let parent = button.parentElement
    for(let x=0;x<parent.children.length;x++){
      let act = parent.children[x]
      if(act.tagName=='SPAN')act.innerText=n
      if(act.tagName=='BUTTON')act.value=n
    }
  },
  borrar: async function(button){
    let tag = button.value
    let n = confirm('estas seguro de borrar el tag "'+tag+'"?')
    if(!n)return
    let resp = await fetch('/api/tags/borrar',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie:document.cookie,
      },
      body: JSON.stringify({
        tag:tag
      })
    })
    let respobj= await resp.json();
    if(respobj.error || respobj.existoso==false){
      alert('algo no funciono')
      // target.innerText=oldtext;
      return;
    }
    let parent = button.parentElement
    parent.parentElement.removeChild(parent)
  },
}

tagadmin.init()

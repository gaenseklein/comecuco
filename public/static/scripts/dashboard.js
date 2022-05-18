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

function timeout(time){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve();
    },time);
  });
}

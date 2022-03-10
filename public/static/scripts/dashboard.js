async function cambiaDestacada(button){
  console.log(button.value);
  let target = button.previousElementSibling;
  let newTag = prompt("elige nueva destacada");
  if(!newTag)return;
  //pregunta al servidor, espera repuesta:
  target.innerText='guardando nueva destacada, espera...';
  await timeout(2000);
  //ponelo al target:
  target.innerText=newTag;
}

function timeout(time){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve();
    },time);
  });
}

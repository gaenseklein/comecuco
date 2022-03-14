function addSocialRed(r,u,passive){
  let red = r || prompt("escriba nombre del red (p.e. facebook)");
  if(!red)return;
  let url = u || prompt("entra url para el link al red (p.e. https://facebook.com/lalenera)");
  if(!url)return;
  //<button type="button" name="button" class="redesButton" onclick="removeSocialRed()" value="facebook https://facebook.com/lalenera">facebook : https://facebook.com/lalenera x</button>
  let b = document.createElement('button');
  b.type="button";
  b.className="redesButton";
  b.value=red+" "+url;
  b.innerText=red+" : "+url+" x";
  let inp = document.getElementById('RedesUsuario');
  if(!passive){
    if(inp.value)inp.value = inp.value+" "+red+" "+url;
    else inp.value=red+" "+url;
  }
  b.onclick=function(){
    let parsedinp = inp.value.split(' ');
    let parsedval = this.value.split(' ')[1];
    for (let x=0;x<parsedinp.length;x++){
      if(parsedinp[x]==parsedval){
        parsedinp.splice(x-1,2);
        break;
      }
    }
    inp.value=parsedinp.join(' ');
    this.parentElement.removeChild(this);
  }
  document.getElementById('redesPreview').appendChild(b);
}

function initSocialRed(inp){
  let inpparsed = inp.value.split(' ');
  for (let x=0;x<inpparsed.length;x+=2){
    addSocialRed(inpparsed[x],inpparsed[x+1],true);
  }
}

initSocialRed(document.getElementById('RedesUsuario'));

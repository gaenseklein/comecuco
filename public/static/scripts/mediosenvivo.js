async function buildMediosEnVivo(toHTML){
    let url = 'https://comecuco.org:9000';///status2.xsl';
    //let resp = //await getStatus(url);
    let resp = await fetch(url); //,{mode:'no-cors'}
    let statusstring;
    statusstring = await resp.text();
    let mountpoints = ['Cuyum', 'TierraCampesina'];
    let mountnames = ['Radio Cuyum', 'Radio Tierra Campesina'];
    let html = '';    
    for(let x=0;x<mountpoints.length;x++){
        if(statusstring.indexOf('/'+mountpoints[x])==-1)continue;
        let css='';
        if(x==0)css='activo';
        let innerhtml = `<li class="${css}">
          <audio id="audio-${mountpoints[x]}" src="https://comecuco.org:9000/${mountpoints[x]}" controls="">
          </audio>
          <!-- https://unicode-table.com -->
          <button class="playbutton" onclick="activaMedioEnVivo('${mountpoints[x]}')">▶</button>
          <div class="nombre">
            ${mountnames[x]}
          </div>
        </li>`;
        html+=innerhtml;
    }
    if(toHTML){
        let ul = document.querySelector('.mediosEnVivo ul');
        ul.innerHTML = html;

        let arrleft=document.querySelector('.arrowLeft');
        let arrright=document.querySelector('.arrowRight');
        arrleft.onclick=function(){
            let act=document.querySelector('.mediosEnVivo .activo');
            let prev=act.previousElementSibling;
            if(prev==null)prev=act.parentElement.lastChild;
            prev.classList.add('activo');
            act.classList.remove('activo');
        }
        arrright.onclick=function(){
            let act=document.querySelector('.mediosEnVivo .activo');
            let next=act.nextElementSibling;
            if(next==null)next=act.parentElement.firstChild;
            next.classList.add('activo');
            act.classList.remove('activo');
        }
    }
    return html;
}
buildMediosEnVivo(true);

function activaMedioEnVivo(mountpoint){
    let audio = document.getElementById('audio-'+mountpoint);
    if(!audio)return;
    audio.play();
    audio.parentElement.classList.add('playing');
}


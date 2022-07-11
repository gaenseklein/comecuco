const fs = require('fs')

var noticias = []
var resumenes = []
var resumenesCorto = []

var parseFromHtml = function(filename){
    let i=0
    let raw = fs.readFileSync(filename, 'utf-8')
    let start = raw.indexOf('##############BEGIN')
    let bglength = '##############BEGIN'.length+1
    let end = raw.indexOf('##############END')
    let rawlist = []
    while(start>-1 && end >-1){
      rawlist.push(raw.substring(start+bglength,end-1))
      start = raw.indexOf('##############BEGIN',end)
      end = raw.indexOf('##############END',end+10)
    }
    // console.log(rawlist);
    let list = []
    for (i = 0; i < rawlist.length; i++) {
      let lines = rawlist[i].split('\n')
      let entry = {}
      let act=''
      for(var x=0;x<lines.length;x++){
        if(lines[x].substring(0,3)=='###'){
          act=lines[x].substring(3)
        }else{
          if(entry[act])entry[act]+='\n'+lines[x]
          else entry[act]=lines[x]
        }
      }
      list.push(entry)
    }
    console.log('parsed '+list.length+' entrys from html');
    for (i = 0; i < list.length; i++) {
      let act = list[i]
      let resumen = (act.title.indexOf('RESUMEN SEMANAL')>-1 ||
           (act.title.toLowerCase().indexOf('resumen')>-1  && act.title.toLowerCase().indexOf('semanal')>-1 )
         )


      if(resumen){
        let res = list[i]
        let r = /\d+/;
        let no = res.title.match(r)
        if(no){
          resumenes.push(list[i])
          // console.log(list[i].audio);
          let pubdate = list[i].postdate
          let audios = [{url:list[i].audio}]
          if(list[i].audio.indexOf('\n')>-1){
            let a = list[i].audios.split('\n')
            audios = []
            for(let aa=0;aa<a.length;aa++)audios.push({url:a[aa]})
          }
          resumenesCorto.push({
            pubdate:pubdate,
            audios:audios,
            numero:no,
            body: list[i].body
          })

        }else{
          resumen=false
        }
      }
      if(!resumen){
        noticias.push(list[i])
      }
    }
    console.log('noticias:',noticias.length,'resumenes:',resumenes.length)
    //awaits:
    //act.pubdate, act.audios[], act.audios[i].url, act.numero, act.body
}

function createHTMLResumenSemanal(){
  let data = resumenesCorto
  data.sort(function(a,b){return b.numero - a.numero})
  let lista = ''
  for(i=1;i<data.length;i++){
    let act = data[i]
    let actfecha = new Date(act.pubdate).toLocaleDateString('es')
    let actaudios = ''
    for(let aa=0;aa<act.audios.length;aa++){
      actaudios+=`<audio src="${act.audios[aa].url}" controls=""></audio>
      <a href="${act.audios[aa].url}" type="audio/mpeg;">&#9196;</a>`
    }
    let actaudio=''
    if(act.audios.length>0)actaudio = `<div class="audiosyvideos" id="controlesResumenSemanal1">
      <div class="cuadrocontrol">
        ${actaudios}
      </div>
    </div>`
    lista += `<li>
      <div class="subpagresumenSemanal">
        <input type="checkbox" id="RSC${act.numero}"name="" value="">
        <label for="RSC${act.numero}"><h4 class="subtitulo">RSC Nº${act.numero} - ${actfecha}</h4></label>
        <div class="contenidoRSC">
          <div class="contenido">
              <p>${act.body}</p>
          </div>
          ${actaudio}
        </div>
      </div>
    </li>`
  }
  fs.writeFileSync('archive/resumenes.htm',lista,'utf-8')
}

function translateToNode(){
  let allinone = []
  for(let i=0;i<noticias.length;i++){
    let n=noticias[i]
    let audios = [] //{url,description}
    let images = [] //{url,title}

    if(n.image && n.image.length>0){
      let imgurl= n.image.substring(n.image.indexOf('src="')+'src="'.length)
      imgurl = imgurl.substring(0,imgurl.indexOf('"'))
      if(imgurl.length>0){
        images.push({url:imgurl, title:''})
      }
    }
    if(n.images && n.images.length){
      let start = n.images.indexOf('src="')
      let end = n.images.indexOf('"',start+'src="'.length)
      while(start>-1 && end>-1){
        images.push({url:n.images.substring(start+'src="'.length,end),title:''})
        start = n.images.indexOf('src="',end)
        end = n.images.indexOf('"',start+'src="'.length)
      }
    }
    if(n.audio && n.audio.length>0){
      let audiosplit = n.audio.split(',')
      for(let au=0;au<audiosplit.length;au++){
        if(audiosplit[au].indexOf('sites/default/files')>-1){
          audios.push({url:audiosplit[au],description:''})
        }
      }
    }
    let obj = {
      nid:n.nid,
      title:n.title,
      subtitle:n.subtitulo,
      author:n.uid,
      pubdate:n.postdate,
      body:n.body,
      images:images,
      audios:audios,
      tags: n.tags,
      // videolink:videolink,
    }
    if(n.videourl && n.videourl.length>0){
      let ytid = ''
      if(n.videourl.indexOf('watch?v=')>-1){
        ytid=n.videourl.substring(n.videourl.indexOf('=')+1)
      }else if(n.videourl.indexOf('youtu.be/')>-1){
        ytid=n.videourl.substring(n.videourl.indexOf('youtu.be/')+'youtu.be/'.length)
      }
      if(ytid.indexOf('&')>-1)ytid = ytid.substring(0,ytid.indexOf('&'))
      if(ytid.indexOf('?')>-1)ytid = ytid.substring(0,ytid.indexOf('?'))
      if(ytid.length>0){
        obj.videolink={url:n.videourl,iframe : 'https://www.youtube.com/embed/'+ytid}
      }
    }
    allinone.push(obj)
  }
  fs.writeFileSync('./archive/noticias.json',JSON.stringify(allinone),'utf-8')
  console.log('node-version created')
  allinone.sort(function(a,b){return b.nid - a.nid})
  let pages=[]
  let i=0
  for(i=0;i<allinone.length;i++){
    let node = JSON.stringify(allinone[i])
    let path = './archive/nodes/'+allinone[i].nid+'.json'
    fs.writeFileSync(path,node,'utf-8')
    if(i==0 || i%20==0){
      pages.push([allinone[i]])
    }else{
      pages[pages.length-1].push(allinone[i])
    }
  }
  fs.writeFileSync('./archive/pages.json',JSON.stringify(pages),'utf-8')
  for(i=0;i<pages.length;i++){
    fs.writeFileSync('./archive/page'+i+'.json',JSON.stringify(pages[i]),'utf-8')
  }
  console.log(pages[0])
  console.log('created pages',pages.length);
}

function logNid(nid){
  for (var i = 0; i < noticias.length; i++) {
    if(noticias[i].nid==nid){
      console.log(noticias[i]);
      break;
    }
  }
}

parseFromHtml('api-noticia')
for(let p=1;p<37;p++){
  parseFromHtml('api-noticia?page='+p)
}
parseFromHtml('api-audio')
// logNid('3804')
// logNid('3801')
translateToNode()
// console.log(noticias[])
createHTMLResumenSemanal()
fs.writeFileSync('archive/noticiasraw.json',JSON.stringify(noticias),'utf-8')
fs.writeFileSync('archive/resumenes.json',JSON.stringify(resumenes),'utf-8')
fs.writeFileSync('archive/resumenesCorto.json',JSON.stringify(resumenesCorto),'utf-8')
// for(let r=0;r<resumenes.length;r++){
//   console.log(resumenes[r].title);
//   let res = resumenes[r]
//   let reg = /\d+/;
//   let no = res.title.match(reg)
//   console.log(''+no);
// }

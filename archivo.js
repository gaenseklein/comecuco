const fs = require('fs')

var archivo = {
  uids:[
    {name: "Aguaribay", uid: 68, icon:"/public/static/logos/aguaribay.jpg"},
    //{name: "FM El Nevado", uid: 23, icon:"/public/static/logos/nevado.jpg"},
    {name: "El Algarrobal", uid: 12, icon:"/public/static/logos/comecuco.png"},
    {name: "La Paquita", uid: 11, icon:"/public/static/logos/paquita.jpg"},
    {name: "Radio La Pujante", uid: 10, icon:"/public/static/logos/pujante.jpg"},
    {name: "Radio Tierra Campesina", uid: 9, icon:"/public/static/logos/tierracampesina.png"},
    {name: "Radio Cuyum", uid: 8, icon:"/public/static/logos/cuyum.png"},
    {name: "GiraMundo TV", uid: 5, icon:"/public/static/logos/giramundo.png"},
    {name: "La Mosquitera", uid: 4, icon:"/public/static/logos/mosquitera.png"},
    {name: "Radio sin Dueño", uid: 3, icon:"/public/static/logos/rsd.jpg"},
    {name: "La Leñera", uid: 2, icon:"/public/static/logos/lenera.jpg"},
  ],
  uidToAuthor: function(uid){
    for(let x=0;x<this.uids.length;x++){
      if(this.uids[x].uid==uid)return this.uids[x].name
    }
  },
  iconFromUid: function(uid){
    for(let x=0;x<this.uids.length;x++){
      if(this.uids[x].uid==uid)return this.uids[x].icon
    }
  },
  node: function(nid){
    if(!fs.existsSync('./archivo/archive/nodes/'+nid+'.json'))return false
    let raw = fs.readFileSync('./archivo/archive/nodes/'+nid+'.json','utf-8')
    let node = JSON.parse(raw)
    let uid=node.author
    node.author = this.uidToAuthor(uid)
    return {
      noticia: node,
      autor:{icon:this.iconFromUid(uid), name: node.author}
    }
  },
  page: function(pagenr){
    if(!fs.existsSync('./archivo/archive/page'+pagenr+'.json'))return false
    let raw = fs.readFileSync('./archivo/archive/page'+pagenr+'.json','utf-8')
    let pg = JSON.parse(raw)
    for(let n=0;n<pg.length;n++){
      pg[n].author=this.uidToAuthor(pg[n].author)
      pg[n]._id=pg[n].nid
    }
    return {
      data:pg,
      pagenr:pagenr,
      archivo:true,
    }
  },
  userpage: function(uid, pagenr){
    let fn = './archivo/archive/user'+uid+'page'+pagenr+'.json'
    if(!fs.existsSync(fn))return false
    let raw = fs.readFileSync(fn,'utf-8')
    let pg = JSON.parse(raw)
    for(let n=0;n<pg.length;n++){
      pg[n].author=this.uidToAuthor(pg[n].author)
      pg[n]._id=pg[n].nid
    }
    return {
      data:pg,
      pagenr:pagenr,
      archivo:true
    }
  },
  search: function(joinedWords){
      if(!this.searchlines){
        let searchfile = fs.readFileSync('./archivo/todosjuntos.json','utf8')
        this.searchlines = searchfile.split('\n');
      }
      let resultlines = []
      let lines = this.searchlines
      let word;

      let words = joinedWords.split(' ')
      for(let i=0;i<lines.length;i++){
        for(let w=0;w<words.length;w++){
          word = words[w]
          if(lines[i].indexOf(word)>-1){
            resultlines.push(lines[i])
            break;
          }
        }
      }
      let resultraw = resultlines.join('\n')
      resultraw = resultraw.substring(0,resultraw.length-1) //delete last comma
      resultraw = `[${resultraw}]`
      try {
        let result = JSON.parse(resultraw)
        return result
      } catch (e) {
          console.log('could not find in archive',joinedWords,e);
          return false
      }
  },
}

module.exports = archivo;

const fs = require('fs');
const Noticia = require('./model/Noticia.js');

const tags = {
    tags: [],
    allTags: function(){
      return this.tags.join(',')
    },
    init: function(){
      let oldraw = fs.readFileSync('./private/tags.dt', 'utf8');
      if(!oldraw){
        console.log('could not load old tags',oldraw);
        return;
      }
      let oldlines = oldraw.split('\n');
      for (let x=0;x<oldlines.length;x++){
        this.tags[x]=oldlines[x];
      }
      console.log('initialised tags:',this.tags.length);
      //write copy:
      let d = new Date().toLocaleDateString('de')
      fs.writeFileSync('./private/tags-'+d+'.copy',oldraw,'utf8')
    },
    cambiaTag: async function(oldtag,valor){
      let tagnr = this.tags.indexOf(oldtag);
      if(tagnr==-1)return false;
      this.tags[tagnr]=valor;
      let raw=this.tags.join('\n');
      try {
        fs.writeFileSync('./private/tags.dt',raw,'utf8');
        let noticias = Noticia.find({tags:valor});
        for (let x=0;x<noticias.length;x++){
          let not=noticias[x];
          for(let y=0;y<not.tags.length;y++)if(not.tags[y]==oldtag){
            not.tags[y]=valor;
            break;
          }
          let savednoticia = await noticias[x].save();
          console.log('updated noticia',not._id);
        }
      } catch (e) {
        console.log(e);
        return false;
      }
      return true;
    },
    addTags: function(taglist){
      console.log('adding tags',taglist);
      let count=0;
      for (let x=0;x<taglist.length;x++){
        if(taglist[x]=='')continue;
        if(this.tags.indexOf(taglist[x])==-1){
          count++
          this.tags.push(taglist[x]);
        }
      }
      console.log('added '+count+' tags');
      if(count>0){
        fs.writeFileSync('./private/tags.dt',this.tags.join('\n'),'utf8')
        console.log('saved tags to disk');
      }
    },
    removeTag: function(tag){
      for (let x=0;x<this.tags.length;x++){
        if(this.tags[x]==tag){
          this.tags.splice(x,1);
          let raw=this.tags.join('\n');
          console.log('removed tag',tag);
          try {
            fs.writeFileSync('./private/tags.dt',raw,'utf8')
          } catch (e) {
            console.log(e)
          }
          // break;
          return true
        }
      }
      return false
    },
};

module.exports = tags;

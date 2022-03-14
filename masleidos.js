const fs = require('fs');
const masleidos = {
    valores: [],
    maximoEdadEnMs: 7776000000, //90 dias
    init: function(){
      try {
        let oldraw = fs.readFileSync('masleidos.data', 'utf8');
      } catch (e) {
        console.warn(e);
        return;
      }
      if(!oldraw)oldraw="",
      let oldlines = oldraw.split('\n');
      for (let x=0;x<oldlines.length;x++){
        let linearr =oldlines[x].split(',');
        this.valores[x]={
          id:linearr[0],
          count:linearr[1],
          pubdate:linearr[2]
        }
      }
    },
    save: function(){
      let newraw = "";
      let valores=this.valores;
      for (let x=0;x<valores.length;x++){
        newraw+=valores[x].id+','+valores[x].count+','+valores[x].pubdate+'\n';
      }
      try {
        fs.writeFileSync('masleidos.data',newraw,'utf8');
      } catch (e) {
        console.warn(e);
        return false;
      }
      return true;
    },
    saveEliminados: function(eliminados){
      let newraw = "";
      for (let x=0;x<eliminados.length;x++){
        newraw+=eliminados[x].id+','+eliminados[x].count+','+eliminados[x].pubdate+'\n';
      }
      try {
        fs.appendFileSync('masleidos.old',newraw,'utf8');
      } catch (e) {
        console.warn(e);
      }
    },
    subir: function(id, pubdate){
      let pos = null;
      let count = 0;
      if(Date.now()-pubdate > this.maximoEdadEnMs)return false;
      for (let x=0;x<this.valores.length;x++){
        if(this.valores[x].id==id){
          pos=x;
          count = this.valores[x].count;
          break;
        }
      }
      if(pos==null)pos=this.valores.length;
      this.valores[pos]={
        id:id,
        count:count+1,
        pubdate:pubdate,
      }
      this.eliminaViejos();
    },
    eliminaViejos: function(){
      let eliminados = [];
      for(let x=this.valores.length;x>=0;x--){
        if(Date.now()-this.valores[x].pubdate>this.maximoEdadEnMs){
          eliminados.push(this.valores.splice(x,1));
        }
      }
      this.save();
      if(eliminados.length>0)this.saveEliminados(eliminados);
    },
    ultimos: function(max){
      let ids = [];
      for (let x=0;x<max;x++){
        if(this.valores[x]==undefined)break;
        ids.push(this.valores[x].id);
      }
      return ids;
    },
};

module.exports = masleidos;

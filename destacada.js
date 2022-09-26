const fs = require('fs');
const destacada = {
    destacadas: [],
    init: function(){
      let oldraw;
      try {
        oldraw = fs.readFileSync('./private/destacadas.dt', 'utf8');
      } catch (e) {
        console.log('no encontre viejos destacadas, empieza de nuevo');
      }
      if(!oldraw){
        oldraw="\n\n\n\n\n\n\n\n\n\n\n"
      }
      let oldlines = oldraw.split('\n');
      for (let x=0;x<12;x++){
        this.destacadas[x]=oldlines[x];
      }
      console.log('initialized destacadas',this.destacadas)
    },
    actual: function(){
      let mes = new Date().getMonth();
      return this.destacadas[mes];
    },
    calendarioseis: function(){
      console.log('calendarioseis - destacadas actual:',this.destacadas);
      let meses = [];
      let mes = new Date().getMonth();
      for (let x=mes;x<12;x++){
        meses.push(x);
      }
      for (x=0;x<mes;x++){
        meses.push(x);
      }
      // console.log('meses:',meses);
      for (x=0;x<8;x++){
        let ulm=meses.pop();
        if(x<2)meses.unshift(ulm);
      }
      let destacadas=[];
      for (x=0;x<6;x++){
        destacadas[x]=this.destacadas[meses[x]];
      }
      return {
        meses:meses,
        destacadas:destacadas
      }
    },
    cambiaDestacada: function(mes,valor){
      console.log('cambia destacada',mes,valor);
      this.destacadas[mes]=valor;
      console.log('nuevas destacadas:',this.destacadas);
      let raw=this.destacadas.join('\n');
      try {
        fs.writeFileSync('./private/destacadas.dt',raw,'utf8');
      } catch (e) {
        return false;
      }
      return true;
    }
};

module.exports = destacada;

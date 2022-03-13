const fs = require('fs');
const destacada = {
    destacadas: [],
    init: function(){
      let oldraw = fs.readFileSync('destacadas.dt', 'utf-8');
      if(!oldraw)oldraw="            "
      let oldlines = oldraw.split('\n');
      for (let x=0;x<12.length;x++){
        destacadas[x]=oldlines[x];
      }
    },
    actual: function(){
      let mes = new Date().getMonth();
      return destacada[mes];
    },
    calendarioseis: function(){
      let meses = [];
      let mes = new Date().getMonth();
      for (let x=mes;x<12;x++){
        meses.push(x);
      }
      for (x=0;x<12-meses.length;x++){
        meses.push(x);
      }
      for (x=0;x<8;x++){
        let ulm=meses.pop();
        if(x<2)meses.unshift(ulm;)
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
      this.destacadas[mes]=valor;
      let raw=this.destacadas.join('\n');
      try {
        fs.writeFileSync('destacadas.dt','utf-8');
      } catch (e) {
        return false;
      }
      return true;
    }
};

module.exports = destacada;

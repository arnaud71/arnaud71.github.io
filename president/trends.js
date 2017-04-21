const googleTrends = require('google-trends-api');


var fs = require('fs');

var keys = [
  ['nom','hamon','macron','fillon','le pen','mélenchon'],
  ['nom','hamon','macron','melenchon','marine','mélenchon'],

  ['age','hamon age','macron age','fillon age','le pen age','mélenchon age'],
  ['age','hamon age','macron age','melenchon age','marine age','mélenchon age'],

  ['femme','hamon femme','macron femme','fillon femme','le pen mari','mélenchon femme'],
  ['femme','hamon femme','macron femme','melenchon femme','marine mari','mélenchon femme'],


  ['sondage','hamon sondage','macron sondage','fillon sondage','le pen sondage','mélenchon sondage'],
  ['sondage','hamon sondage','macron sondage','melenchon sondage','marine sondage','mélenchon sondage'],


  ['programme','hamon programme','macron programme','fillon programme','le pen programme','mélenchon programme'],
  ['programme','hamon programme','macron programme','melenchon programme','marine programme','mélenchon programme'],

  ['presidentiel','hamon présidentiel','macron présidentiel','fillon présidentiel','le pen présidentiel','mélenchon présidentiel'],
  ['presidentiel','hamon présidentiel','macron présidentiel','melenchon présidentiel','marine présidentiel','mélenchon présidentiel'],

  ['2017','hamon 2017','macron 2017','fillon 2017','le pen 2017','mélenchon 2017'],
  ['2017','hamon 2017','macron 2017','melenchon 2017','marine 2017','mélenchon 2017'],

  ['economique','hamon économique','macron économique','fillon économique','le pen économique','mélenchon économique'],
  ['economique','hamon économique','macron économique','melenchon économique','marine économique','mélenchon économique'],

  ['chomage','hamon chomage','macron chomage','fillon chomage','le pen chomage','mélenchon chomage'],
  ['chomage','hamon chomage','macron chomage','melenchon chomage','marine chomage','mélenchon chomage'],

  ['education','hamon éducation','macron éducation','fillon éducation','le pen éducation','mélenchon éducation'],
  ['education','hamon éducation','macron éducation','melenchon éducation','marine éducation','mélenchon éducation'],

  ['sante','hamon santé','macron santé','fillon santé','le pen santé','mélenchon santé'],
  ['sante','hamon santé','macron santé','melenchon santé','marine santé','mélenchon santé'],

  ['europe','hamon europe','macron europe','fillon europe','le pen europe','mélenchon europe'],
  ['europe','hamon europe','macron europe','melenchon europe','marine europe','mélenchon europe'],

  ['retraite','hamon retraite','macron retraite','fillon retraite','le pen retraite','mélenchon retraite'],
  ['retraite','hamon retraite','macron retraite','melenchon retraite','marine retraite','mélenchon retraite'],

  ['immigration','hamon immigration','macron immigration','fillon immigration','le pen immigration','mélenchon immigration'],
  ['immigration','hamon immigration','macron immigration','melenchon immigration','marine immigration','mélenchon immigration'],

  ['justice','hamon justice','macron justice','fillon justice','le pen justice','mélenchon justice'],
  ['justice','hamon justice','macron justice','melenchon justice','marine justice','mélenchon justice'],

  ['ecologie','hamon écologie','macron écologie','fillon écologie','le pen écologie','mélenchon écologie'],
  ['ecologie','hamon écologie','macron écologie','melenchon écologie','marine écologie','mélenchon écologie'],

  ['livre','hamon livre','macron livre','fillon livre','le pen livre','mélenchon livre'],
  ['livre','hamon livre','macron livre','melenchon livre','marine livre','mélenchon livre'],

  ['culture','hamon culture','macron culture','fillon culture','le pen culture','mélenchon culture'],
  ['culture','hamon culture','macron culture','melenchon culture','marine culture','mélenchon culture'],

  ['politique','hamon politique','macron politique','fillon politique','le pen politique','mélenchon politique'],
  ['politique','hamon politique','macron politique','melenchon politique','marine politique','mélenchon politique'],

  ['facebook','hamon facebook','macron facebook','fillon facebook','le pen facebook','mélenchon facebook'],
  ['facebook','hamon facebook','macron facebook','melenchon facebook','marine facebook','mélenchon facebook'],

  ['twitter','hamon twitter','macron twitter','fillon twitter','le pen twitter','mélenchon twitter'],
  ['twitter','hamon twitter','macron twitter','melenchon twitter','marine twitter','mélenchon twitter'],

  ['blog','hamon blog','macron blog','fillon blog','le pen blog','mélenchon blog'],
  ['blog','hamon blog','macron blog','melenchon blog','marine blog','mélenchon blog'],

  ['youtube','hamon youtube','macron youtube','fillon youtube','le pen youtube','mélenchon youtube'],
  ['youtube','hamon youtube','macron youtube','melenchon youtube','marine youtube','mélenchon youtube'],

];


var time = [ 30, 5, 1 ];
var k;
var query;

for (var m = 0; m < keys.length;m+=2)  {

  k = keys[m];
  query = k.shift();
  console.log(query);

googleTrends.interestOverTime({keyword: k, startTime: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000))}, function(err, results) {
  if (err) {
    console.log('oh no error!', err);
  }
  else {
    var chart = [];
    var x = '';
    var tab_y = [];

    var tab = JSON.parse(results).default.timelineData;
    for (var i = 0; i < tab.length; i++) {
      //console.log(tab[i].time);
      //console.log(tab[i].value);


      // if pourcentage

      var total = 0;
      for (var j = 0; j < tab[i].value.length; j++) {
        total += tab[i].value[j];
      }

      //$total /= tab[i].value.length;

      for (j = 0; j < tab[i].value.length; j++) {
        tab[i].value[j] = tab[i].value[j]/total * 100;
      }

      for (j = 0; j < tab[i].value.length; j++) {
        //console.log(tab[i].value[j]);
        if ("undefined" === typeof tab_y[j]) {
             tab_y[j] = '';
        }

        tab_y[j] = tab_y[j]+'"'+tab[i].value[j]+'",';
        //x = x+'"'+tab[i].time+'",';


      }
      x = x+'"'+tab[i].formattedTime+'",';
    }
    x = x.substring(0, x.length - 1);
    x = '['+x+']';

    //console.log(x);
    var str = '[';
    for (var l = 0; l < this.k.length; l++) {

      str += '{'+"\n";
      str += '"x" : '+x+",\n";
      tab_y[l] = tab_y[l].substring(0,tab_y[l].length - 1);
      str += '"y" : ['+tab_y[l]+'],'+"\n";
      str += '"mode" : "lines"'+",\n";
      str += '"type" : "scatter"'+",\n";
      str += '"name" : "'+this.k[l]+'"'+"\n";
      str += "},";
    }
    str = str.substring(0, str.length - 1);
    str += "]\n";
    //console.log(str);
    //console.log(JSON.stringify(JSON.parse(str), null, 2));


    var filename = "./td_"+this.query+'.json';
    fs.writeFile(filename, JSON.stringify(JSON.parse(str), null, 2), function(err) {
      if(err) {
        return console.log(err);
      }

      console.log(filename+" was saved!");


    });

  }
}.bind( {query: query, k: k} ));

}

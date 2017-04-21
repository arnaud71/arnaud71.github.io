var googleTrends = require('google-trends-api');

var args = process.argv;
var fs = require('fs');

var k   = args.slice(2,7);
var time = args[8];
var query = args[7];

console.log('date,'+k.join(',')+','+'query'+','+'time');
googleTrends.interestOverTime({keyword: k, startTime: new Date(Date.now() - (time * 24 * 60 * 60 * 1000)), geo:'FR'}, function(err, results) {
  if (err) {
    console.log('oh no error!', err);
  }
  else {
    var tab = JSON.parse(results).default.timelineData;
    for (var i = 0; i < tab.length; i++) {
      console.log(tab[i].formattedTime+';'+tab[i].value.join(';')+';'+query+';'+time);
    }
  }
});

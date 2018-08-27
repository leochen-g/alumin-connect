var superagent = require('superagent')
var base64url = require('base64-url')

function o(t, e) {
  var n = []
	  , i = void 0
	  , o = 0
	  , r = void 0
	  , a = "";
  for (i = 0; i < 256; i++)
	n[i] = i;
  for (i = 0; i < 256; i++)
	o = (o + n[i] + t.charCodeAt(i % t.length)) % 256,
		r = n[i],
		n[i] = n[o],
		n[o] = r;
  i = 0,
	  o = 0;
  for (var s = 0; s < e.length; s++)
	i = (i + 1) % 256,
		o = (o + n[i]) % 256,
		r = n[i],
		n[i] = n[o],
		n[o] = r,
		a += String.fromCharCode(e.charCodeAt(s) ^ n[(n[i] + n[o]) % 256]);
  return a
}
var t = 'ZIYUANMAO海贼王'
e = o('aabbvveerrjfsesawdcxole',t.trim())
var x =  new Buffer(e).toString('base64')
console.log(x);

var URL = 'https://api.ziyuanmao.com/search/power';
v = function(t, e) {
  return e ? h(String(t)).replace(/[+\/]/g, function(t) {
	return "+" == t ? "-" : "_"
  }).replace(/=/g, "") : h(String(t))
}
superagent
	.post(URL)
	.type('form')
	.send({
	  'target': x,
	  'currentPage': '1',
	  'seriesNum': '5SU9W503YL6YQ4IE',
	})
	.set('Referer','https://www.ziyuanmao.org/')
	.set('Origin','https://www.ziyuanmao.org')
	.set('User-Agent','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36')
	.set("Content-Type","application/x-www-form-urlencoded; charset=UTF-8")
	.end(function (err, response) {
	  console.log(JSON.parse(response.text))
	  let list = JSON.parse(response.text)
	  let firstHash = list[1].hash
	  let firstTitle = list[1].title
	  let magnet = "magnet:?xt=urn:btih:" + firstHash + "&dn=" + encodeURIComponent(firstTitle);
	  console.log(magnet);

	  let thunder = "thunder://" + base64url.encode("AA" + magnet + "ZZ");
	  console.log(thunder);
	  // let torrent = "http://btcache.me/torrent/" + t.toUpperCase();
	  // let xiaomi = "http://d.miwifi.com/d2r/?url=" + u.Base64.encode(this.magnet) + "&name=" + this.title

	})

// console.log(https://itorrents.org/);
console.log(JSON.parse('{"service":"http%3A%2F%2Ftest.analyzer.datatist.cn%2Fanalyzer%2Faccounts%2Fsso.xhtml"}'));
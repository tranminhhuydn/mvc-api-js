'use strict';
/*
Tor Render jsHelper.js
call on address bar

http://localhost:3000/?buildJsHelper=true

And file store ./webroot/js/jsHelper.js
*/


const 
ejs = require('ejs'),
fs = require('fs'),
read = fs.readFileSync,
path = require('path'),
basename = path.basename(__filename),
helpers = {},
helperPath =  path.resolve(webroot,'src','helpers')

fs
.readdirSync(helperPath)
.filter(file => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename 
  );
})
.forEach(file => {
  var 
  name = file.slice(0,-5),
  dirFile = path.resolve(helperPath,file),
  tmp3 = read(dirFile,'utf8')
  
  tmp3 = tmp3.replace(/{{/ig,"<%")
            .replace(/}}/ig,"%>")

  tmp3 = JSON.stringify(tmp3)

  helpers[name] = tmp3

});

function buildJsHelper(res){
    var str = ''
    for(var h in res.locals.helpers){
        str +=res.locals.helpers[h]
        .toString()
    }
    var
    pathFile = `${webroot}/js/jsHelper.js`
    fs.writeFileSync(pathFile,str,'utf8')
}

module.exports = function(req,res,next){
    res.locals.helpers={}

    for(var item in helpers){
        var tmp3 = helpers[item]
        var tmpFn = `function ${item} () { 
            var data = arguments[0]
            var tmp = ejs.compile(${tmp3}, {})(data);
            return tmp
        }

        `
        eval(`res.locals.helpers[item] = `+tmpFn)
    }

    if(req.query['buildJsHelper']){
        buildJsHelper(res)
    }

    next()
} 

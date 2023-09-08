
function isPromise(p) {
  if (typeof p === 'object' && typeof p.then === 'function') {
    return true;
  }

  return false;
}
ejs.fileLoader = async function (href,options) {
  var response = await fetch(href,options)
  var tmp 
  if(!options)
  tmp = await response.text()

  if(options 
    && options.headers 
    && options.headers['Content-Type']=='application/json')
    tmp = await response.json()
  //console.log(tmp);
  return tmp  
}
// var _resolveInclude = ejs.resolveInclude
// ejs.resolveInclude = async function(name, filename, isDir){
//   var includePath = _resolveInclude(name, filename, isDir)
//   console.log(includePath);
//   return includePath
// } 

async function fileLoaderCB(href,cb){
  fetch(href)
  .then(response=>response.text())
  .then(response=>cb(response))
  //tmp = await response.text()
  //return tmp
}
async function autoRender(locales){
  document.querySelectorAll('template')
  .forEach(async(item)=>{
    if(item.dataset.target){
      var target = item.dataset.target
      await render('#'+item.id,target,locales)
      //console.log(item.id)
      //console.log(item.dataset.target)
    }
  })
    // var tmp = ejs.render(await getTemplate(querystring),locales);

    // if(target)
    //   document.querySelector(target).innerHTML = tmp

    // return tmp
}
async function render(querystring,target,locales){
    //ejs.render
    //var temp = await getTemplate(querystring)
    var tmp = ejs.render(await getTemplate(querystring),locales);

    if(target)
      document.querySelector(target).innerHTML = tmp

    return tmp
}
async function getTemplate(querystring){
  var e = document.createElement('textarea');

  var item = document.querySelector(querystring)
  if(item.attributes.href){
    var href = item.attributes.href.nodeValue
    var response = await fetch(href)
    item.innerHTML =  await response.text()
  }
  e.innerHTML = item.innerHTML
  
  // handle case of empty input
  var tmp = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  tmp = tmp.replace(/{{/ig, '<%').replace(/}}/ig, '%>')

  return tmp
}
function decodeHTML(innerHTML){
  var e = document.createElement('textarea');
  e.innerHTML = innerHTML
  var tmp = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  tmp = tmp.replace(/{{/ig, '<%').replace(/}}/ig, '%>')
  parten = /[\<\%\s].+-include\([\s'"]+([^'"]+)['"\s]+\)[\s\%\>].+/g
  r = parten.exec(tmp)
  //console.log(tmp);
  //console.log(r);
  if(r && r[1]){
    divLoad = `<div data-link="${r[1]}"></div>`
    tmp = tmp.replace(r[0], divLoad)
    //console.log(tmp);
  }

  
  return tmp
}
function oneTagRender(item,template,locales,cb){
  template = decodeHTML(template)
  template = ejs.render(template,locales)
  item.innerHTML = template
  cb && cb(template)
  getDataLink(item)
}
async function oneGetDataLink(item){
  var {link,linkData} = item.dataset
    var locals = {}
    if(linkData){
      //console.log(linkData);
      locals.data = await ejs.fileLoader(linkData,
        {headers: {
          'Content-Type': 'application/json'
        }})
      //locals.data = JSON.parse(locales.data)
      //locals.data = JSON.parse(locales.data)
      //console.log(locals)
    }
    var template = await ejs.fileLoader(link)
    oneTagRender(item,template,locals,callScript)
}
async function getDataLink(obj){
  var all = obj.querySelectorAll('[data-link]')
  all.forEach(async(item)=>{
    await oneGetDataLink(item)
    //tagRender()
  })
}
async function tagRender (event){
  //console.log(event.target.body);
  getDataLink(event.target.body)
}
function callScript(html){
  var parten =  /<script([\s\S]*?)>([\s\S]*?)<\/script>/gi
  var r = parten.exec(html)
  if(r && r[2]){
    //console.log(r[2])
    eval(r[2])
  } 
  
}
exports = { render }
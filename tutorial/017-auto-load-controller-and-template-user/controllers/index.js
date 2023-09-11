const 
fs = require('fs'),
path = require('path'),
{join} = path
express = require('express'),
{static} = express,

dir = join(appRoot, 'controllers'),
ctrs = []

fs
.readdirSync(dir)
.forEach(function(ctrName) {
    var file = join(dir, ctrName)
    if (!fs.statSync(file).isDirectory()) 
    return;
   
    var
    ctr = require(file)
    ctrs.push({name:ctrName,fn:ctr})

})

module.exports = function(app) {
    ctrs
    .map((ctr)=>{
        var
        name = ctr.name
        subApp = express(),
        pathCtr =`${appRoot}/controllers/${name}`,
        pathSub = `${pathCtr}/webroot/src/views/${name}`,
        pathRoot = `${appRoot}/webroot/src/views/${name}`,
        pathWebRootSub= `${pathCtr}/webroot/src/views`,
        pathWebRoot=  `${appRoot}/webroot/src/views`,

        //set locals
        subApp.locals = app.locals

        subApp
        .set('views', [
            pathRoot,
            pathSub,
        ])
        .use([
            static(join(pathCtr,'webroot')),

            static(pathWebRoot),
            static(pathWebRootSub)
        ])
        console.log(`*** auto load controller ***`);
        for(var action in ctr.fn){
            var 
            fn = ctr.fn[action],
            route = `/${name}/${action}`
            
            if(action=='index'){
                var 
                route1 = `/${name}`
                subApp.all(route1,fn)
            }
            console.log(`   ${route}`);
            subApp.all(route,fn)
        }

        subApp.locals.controller = `/${name}`

        app.use(subApp)
    })
}
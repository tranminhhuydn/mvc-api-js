const 
path = require('path'),
{join,resolve} = path

global.appRoot = resolve(__dirname),
global.webroot = resolve(appRoot,'webroot');

const 
express = require('express'),
ejs = require('ejs'),
expressLayouts = require('express-ejs-layouts')
app = express()

app
.set('views',`${appRoot}/webroot/src`)
.set('view engine', 'html') // Load View Engine
.engine('html', ejs.renderFile)


app.get('/', function (req, res) {
  res.render('home')
})

var port = 3000,
server = app.listen(port,()=>{
    console.log('Server started on port %s...', port);
})

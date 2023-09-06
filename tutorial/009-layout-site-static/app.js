const 
path = require('path'),
{join,resolve} = path

global.appRoot = resolve(__dirname),
global.webroot = resolve(appRoot,'webroot');

const 
express = require('express'),
{static} = express,
ejs = require('ejs'),
expressLayouts = require('express-ejs-layouts')
app = express()

app
.set('views',`${appRoot}/webroot/src`)
.set('view engine', 'html') // Load View Engine
.engine('html', ejs.renderFile)

.set('layout', `${appRoot}/webroot/src/layout`)
.set("layout extractScripts", true)
.use(expressLayouts)

.use(static(`${appRoot}/webroot`)) // Set Public Folder
.use(static(`${appRoot}/webroot/src`)) // Set Public Folder

.use('/css',[
  static(`${appRoot}/node_modules/bootstrap/dist/css`),
  static(`${appRoot}/node_modules/bootstrap-icons`),
])
.use('/js',static(`${appRoot}/node_modules/bootstrap/dist/js`))
.use('/js/moment',static(`${appRoot}/node_modules/moment/dist`))
.use('/js/ejs',static(`${appRoot}/node_modules/ejs`))


app.get('/', function (req, res) {
  res.render('home')
})

var port = 3000,
server = app.listen(port,()=>{
  console.log('Server started on port %s...', port);
})

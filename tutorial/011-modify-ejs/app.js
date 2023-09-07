const 
fs = require('fs'),
path = require('path'),
{join,resolve} = path

i18next = require('i18next'),
Backend = require('i18next-fs-backend'),
i18nextMiddleware = require('i18next-http-middleware'),


global.appRoot = resolve(__dirname),
global.webroot = resolve(appRoot,'webroot');

const 
express = require('express'),
{static} = express,
ejs = require('ejs'),
expressLayouts = require('express-ejs-layouts')
app = express()

i18next
.use(Backend)
.use(i18nextMiddleware.LanguageDetector)
.init({
    fallbackLng: 'en',
    backend: {
        loadPath: './config/locales/{{lng}}/translation.json',
        addPath: './config/locales/{{lng}}/{{ns}}.missing.json'
    },
    saveMissing: true
})

app.use(i18nextMiddleware.handle(i18next));

// EJS OVER WRITE TAG EJS
function fileLoader (filePath){
  var tmp = fs.readFileSync(filePath,'utf8');
  tmp = tmp.replace(/{{/ig,"<%").replace(/}}/ig,"%>")
  return tmp
};
ejs.fileLoader = fileLoader;

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

//middleware 
.use(function(req,res,next){
  res.locals.title = 'MVC-API'
  next()
});

app.get('/', function (req, res) {
  res.locals.title = req.t("hello home page")
  res.render('home')
})

var port = 3000,
server = app.listen(port,()=>{
  console.log('Server started on port %s...', port);
})

console.log('------ mkTutorial ----');
console.log('----------------------');
//console.log(process.argv);

const 
path = require('path'),
{join,resolve} = path,
fs = require('fs'),
dir = __dirname

function copySync(src, dest) {
    var data = fs.readFileSync(src);
    fs.writeFileSync(dest, data);
}


var
ignore = [
    'node_modules',
    'mkTutorial.js',
    'rollbackTutorial.js',
    '.gitignore',
    '.git',
    'package-lock.json',
    'package.json',
    'tutorial',
    'README.md'
],

video = process.argv[2]||'video-default',
dest = join(dir,'tutorial',video)


switch (video){
    case 'list': list();break
    default: 
    cp()
}
function list(){
    var myDir = join(dir,'tutorial')
    fs
    .readdirSync(myDir)
    .forEach((name)=>{
    
        console.log(`${name}`);    
    })
}


function cp (){
    if (!fs.existsSync(dest)){
        fs.mkdirSync(dest);
    }
    
    fs
    .readdirSync(dir)
    .forEach((name)=>{
        if(ignore.indexOf(name)!=-1)
        return
        console.log(name);
        var
        file = join(dir,name)
        if(fs.statSync(file).isDirectory()){
            
            var
            src = join(dir,name)
            destSub = join(dest,name)
            fs.cpSync(src, destSub, {recursive: true});
        }
    
        if(!fs.statSync(file).isDirectory()){
            var
            src = join(dir,name)
            destSub = join(dest,name)
            fs.cpSync(src, destSub, {recursive: false});
        }
    })
    
}

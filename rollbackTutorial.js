const { log } = require('console');

console.log('------ roll back Tutorial ----');
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
    rm()
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

function rm (){

    fs
    .readdirSync(dir)
    .forEach((name)=>{
        if(ignore.indexOf(name)!=-1)
        return
    
        console.log(`delete ${name}`);
    
        fs.rmSync(name, { recursive: true });
    
    })
}


//copy frome dest to currnet
function cp (){
    fs
    .readdirSync(dest)
    .forEach(name=>{
        var file = join(dest,name)
        if(fs.statSync(file).isDirectory()){
            console.log(name);
            var
            src = join(dest,name)
            destSub = join(dir,name)
            fs.cpSync(src, destSub, {recursive: true});
        }
        if(!fs.statSync(file).isDirectory()){
            var
            src = join(dest,name)
            destSub = join(dir,name)
            fs.cpSync(src, destSub, {recursive: false});
        }
    })
}
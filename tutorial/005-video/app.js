const 
express = require('express'),
app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

var port = 3000,
server = app.listen(port,()=>{
    console.log('Server started on port %s...', port);
})

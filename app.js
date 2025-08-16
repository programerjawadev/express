const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile('./index.html',{root: __dirname})
})
app.get('/about', (req, res) => {
  res.sendFile('./about.html',{root: __dirname})
})

app.get('/contact', (req, res) => {
  res.sendFile('./contact.html',{root: __dirname})
})


app.get('/produk/:id/categori/:idCategori',(req,res) => {
  res.send('Produk I : ' + req.params.id + 'Categori ID : ' + req.params.idCategori)
})


app.use('/',(req,res) =>{
  res.status(404)
  res.send("<h1>404</h1>")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






// const http = require('http');
// const port = 3000;
// const fs = require('fs');


// const renderHTML = (path,res) =>{
//     fs.readFile(path,(err,data)=>{
//             if(err){
//                 res.writeHead('404');
//                 res.write("Error makdhe file not found");
//             }else{
//                 res.write(data);
//             }
//             res.end();
//         })
// }

// http.createServer((req,res) => {
//     res.writeHead(200,{
//         'Content-Type' : 'text/html',
//     })
//     const url = req .url;
//     if(url === '/about'){
//         renderHTML('about.html',res);
//     }else if (url === '/contact'){
//         renderHTML('contact.html',res);
//     }else{
//         renderHTML('index.html',res);
//     }
// }).listen(port,()=>{
//     console.log(`server menyala di port ${port}`)
// })




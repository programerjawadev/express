const express = require('express');
const expressLayout = require('express-ejs-layouts');
const {loadContact,findContact,addContact,cekDuplikat }  = require('./utils/contacts');
const {body,validationResult,check} = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


const app = express();
const port = 3000;

// konfigurasi flash 
app.use(cookieParser('secret'));
app.use(
  session({
    cookie : {maxAge: 6000},
    secret : 'secret',
    resave : true,
    saveUninitialized : true,
  })
);
app.use(flash())

//gunakan ejs

app.set('view engine','ejs');
app.use(expressLayout);
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: "hadi",
      email: "hadi@gmial.com",
    },
    {
      nama: "ali",
      email: "ali@gmial.com",
    },
    {
      nama: "labib",
      email: "labib@gmial.com",
    },

  ]
  res.render('index',{
    layout: "layouts/main-layouts",
    nama: "hadi",
    title : "anu iku",
    mahasiswa,
  })
});

app.get('/about', (req, res) => {
  res.render('about',{
    layout:'layouts/main-layouts',
    title : "halaman about",
  });
})

app.get('/contact', (req, res) => {
  const contacts = loadContact();
  res.render('contact',{
    layout:'layouts/main-layouts',
    title : "halaman contact",
    contacts,
    msg : req.flash('msg'),
  })
})


app.get('/contact/add',(req,res) =>{
  res.render('add-contact',{
    title : 'From Tambah Contact',
    layout : 'layouts/main-layouts'
  })
})


app.post('/contact',[
  body('nama').custom((value) =>{
    const duplikat = cekDuplikat(value);
    if(duplikat){
      throw new Error('Nama kontak sudah di gunakan')
    }
    return true;
  }),
  check('email','email tidak valid').isEmail(),
  check('nohp','No Hp tidak valid').isMobilePhone('id-ID')

],(req,res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.render('add-contact',{
      title: "form tambah data contact",
      layout: "layouts/main-layouts",
      errors : errors.array(),  
    }) 
  }else{
    addContact(req.body);
    req.flash('msg','Data contact berhasil di tambahkan')
    res.redirect('/contact')
  }


  
})

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail',{
    layout:'layouts/main-layouts',
    title : "halaman contact",
    contact,
  })
})

app.use('/',(req,res) =>{
  res.status(404)
  res.send("<h1>404</h1>")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append server log');
    }
  })
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
});


//中介層等待
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));


// app.get('/', (req, res) => {
//  // res.send('<h1>hello express</h1>');
//   res.send({
//     name:'angel',
//     likes:[
//       'biking',
//       'citys'
//     ]
//   })
// })


var aasa = fs.readFileSync(__dirname + '/apple-app-site-association');

app.get('/apple-app-site-association', function(req, res) {
     res.set('Content-Type', 'application/json');
     res.status(200).send(aasa);
});




app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle:'About Page Yes'
  });
});



app.get('/projects', (req, res) => {
  res.render('projects.hbs',{
    pageTitle:'Projects'
  });
});

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle:'Home page',
    userName:'Machi.Angel'
  });
});


app.get('/bad', (req, res) => {
  res.send({
    errorMsg:'unable to send request'
  });
});


app.listen(port, () => {
  console.log(`server is up on ${port}`);
});

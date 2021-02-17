require('./model/db');
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const employeeController = require('./controllers/employeeController')

const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


const app = express();
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ 
    extname: 'hbs', 
    defaultLayout: 'mainLayout', 
    layoutsDir: __dirname + '/views/layouts',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'hbs');

app.listen(3001, ()=> {
    console.log('Port started');
})

app.use('/', employeeController);
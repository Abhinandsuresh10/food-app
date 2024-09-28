const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const fileupload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(expressLayouts);



app.use(cookieParser('cookingBlogSecure'));
app.use(session({
    secret: 'cookingBlogSecureSession',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());
app.use(fileupload());





app.set('view engine','ejs');
app.set('layout', './layouts/main');


const routes = require('./server/routes/recipeRoute.js');

app.use('/',routes);

app.listen(port, () => {
    console.log(`server is running at port: http://localhost:${port}`);
    
})

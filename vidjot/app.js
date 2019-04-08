const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const bodyParser=require('body-parser');
const flash=require('connect-flash');
const session=require('express-session');
const methodOverride=require('method-override');
const passport=require('passport');
const mongoose=require('mongoose');




const app=express();



//load routes
const ideas=require('./routes/ideas');
const users=require('./routes/users');

//passport config
require('./config/passport')(passport);

//db config
const db=require('./database/database');

//MAP GLOBAL PROMISE
mongoose.Promise=global.Promise;

//connect to mongoose
mongoose.connect(db.mongoURI,{
     useNewUrlParser:true
})
.then(() =>console.log('MONGODB connected ...'))    
.catch(err=>console.log('mongo error'+err));


//Handlebars Middleware 
app.engine('handlebars',exphbs(
    {defaultLayout:'main'
}));
app.set('view engine','handlebars');


//express is series of functIONS Of middleware
//creating a piece of middleware 
//HOW MIDDLEWARE WORKS
/*app.use(function(req,res,next){
console.log(Date.now());
req.name='ANAS ANSARI';  
next();
}); 
*/

//for using static files of imags and css we use
app.use(express.static(path.join(__dirname,'public')));




//body parser middleware
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json());
// we can access what is submitted so that is possible through only middeware

//METHOD OVERRIDE MIDDLEWARE
app.use(methodOverride('_method'));

//middleware for express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))

//passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
 
//using flash
  app.use(flash());



//setting global variables for flash messages
app.use(function(req,res,next){
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user=req.user||null;
    next();
})

//INDEX ROUTE
app.get('/',(req,res)=>
{
    const title='Welcome';
res.render('index',{
    title:title
});

//send something to the browser and here it is INDEX;
});
//when type a url make a get request and post request when we submit a form
//get going to page and post is used to update the server.
//about route
app.get('/about' ,(req,res)=>
{
    res.render('about');
});

//use routes
app.use('/ideas',ideas);
app.use('/users',users);

const port=process.env.PORT||5000;
app.listen(port,()=>{
console.log(`Server started on port ${port}`);//ES6 way of write
//console.log(`Server started on port `+port); //another way to write
});


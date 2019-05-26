let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let expressValidator = require('express-validator');

let app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parsers middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static Paths
app.use(express.static(path.join(__dirname, 'public')))

//Express validator
app.use(expressValidator());

let users  = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@mail.com',
    },
    {
        id: 2,
        first_name: 'Peter',
        last_name: 'Parker',
        email: 'john@mail.com',
    },
    {
        id: 3,
        first_name: 'John',
        last_name: 'Snow',
        email: 'john@mail.com',
    },

]

app.get('/', function(req, res){
    res.render('index', {
        title: 'Homepagina',
        users: users
    });
});

app.get('/index.html', function(req, res){
    res.render('index', {
        title: 'Homepagina',
        users: users
    });
});

app.get('/profile.html', function(req, res){
    res.render('profile', {
        title: 'Jouw profiel',
        users: users
    });
});


app.get('/matches.html', function(req, res){
    res.render('matches', {
        title: 'Jouw matches',
        users: users
    });
});


app.get('/home.html', function(req, res){
    res.render('home', {
        title: 'Vind een match',
        users: users
    });
});

app.get('/new.html', function(req, res){
    res.render('new', {
        title: 'Nieuw account',
        users: users
    });
});

app.post('/users/add', function(req, res){

    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('email', 'email name is required').notEmpty();

    let errors = req.validationErrors();
    if(errors){
        res.render('index', {
            title: 'Titel',
            users: users,
            errors: errors
        });
    } else{
        let newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email  
        }
        console.log('aangemaakt');

        db.users.insert(newUser, (err, res) => {
            
        })

    }




});
app.listen(3000, function(){
    console.log('server started on port 3000..');
})
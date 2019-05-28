let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let expressValidator = require('express-validator');
let mongojs = require('mongojs');
let db = mongojs('datingapp', ['users']);
let ObjectId = mongojs.ObjectID;

let app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parsers middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static Paths
app.use(express.static(path.join(__dirname, 'public')))

// Global vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});
// express validator middleware
 app.use(expressValidator()); 

app.get('/', function(req, res){
    db.users.find(function(err, docs) {
        res.render('index', {
            title: 'Homepagina',
            users: docs
    });
  })
});

app.get('/home.html', function(req, res){
    db.users.find(function(err, docs) {
    res.render('home', {
        title: 'Vind een match',
        users: docs
    });
 })
});

app.get('/index.html', function(req, res){
    db.users.find(function(err, docs) {
    res.render('index', {
        title: 'Homepagina',
        users: docs
    });
})
});

app.get('/profile.html', function(req, res){
    db.users.find(function(err, docs) {
    res.render('profile', {
        title: 'Jouw profiel',
        users: docs
    });
})
});

app.get('/matches.html', function(req, res){
    db.users.find(function(err, docs) {
    res.render('matches', {
        title: 'Jouw matches',
        users: docs
    });
})
});

app.get('/new.html', function(req, res){
    db.users.find(function(err, docs) {
    res.render('new', {
        title: 'Nieuw account',
        users: docs
    });
})
});

app.post('/users/add', function(req, res){

    req.checkBody('voornaam', 'Voornaam is verplicht').notEmpty();
    req.checkBody('achternaam', 'Achternaam is verplicht').notEmpty();
    req.checkBody('email', 'email is verplicht').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        db.users.find(function(err, docs) {
        res.render('new', {
            title: 'Matches',
            users: docs,
            errors: errors
        });
        })
    } else{
        let newUser = {
            voornaam: req.body.voornaam,
            achternaam: req.body.achternaam,
            email: req.body.email
        }
        db.users.insert(newUser, function(err, result){
            if(err){
                console.log(err);
            }
            res.redirect('/home.html');
        });
    }
});

app.delete('/users/delete/:id', function(req, res){
    db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
         if(err){
            console.log(err);
        }
       res.redirect('/home.html');
     });
    // console.log(req.params.id);
});

app.listen(3000, function(){
    console.log('server started on port 3000..');
})
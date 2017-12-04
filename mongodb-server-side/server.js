//BASE SETUP
//=============================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var Image = require('./app/models/images');
var Collection = require('./app/models/imageCollection');
var User = require('./app/models/User');
var Rating = require('./app/models/rating');
var port = 8081;
var router = express.Router();
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});
//ROUTES
//=============================================

router.route('/users') 
    .post(function(req, res){
        var salt = bcrypt.genSaltSync(saltRounds);
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = bcrypt.hashSync(req.body.password, salt);
        user.admin = req.body.admin;
        user.save(function(err){
            if(err)
                res.send(err);
            res.json({message: 'User Created!'});
        });
    })
    
    .get(function(req, res){
        User.find(function(err, users){
            if(err)
                res.send(err);
            res.json(users);
        });
    });
router.route('/users/:user_id')
    .get(function(req, res){
        User.findById(req.params.user_id, function(err, users){
            if(err)
                res.send(err);
            res.json(users);
        });
    })
    .put(function(req, res){
        var salt = bcrypt.genSaltSync(saltRounds);
        User.findById(req.params.user_id, function(err, user){
            if(err)
                res.send(err);
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = bcrypt.hashSync(req.body.password, salt);
            user.admin = req.body.admin;
            
            user.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'User updated!'});
            });
        });
    })
    .delete(function(req, res){
        User.remove({
            _id: req.params.user_id
        }, function(err, user){
            if(err)
                res.send(err);
            res.json({message: 'Successfully deleted'});
        });
    });
router.route('/collections')
    .post(function(req, res){
        var collection = new Collection();
        collection.name = req.body.name;
        collection.descrip = req.body.descrip;
        collection.creator = req.body.creator;
        collection.priv = req.body.priv;
        collection.rating = 0;
        collection.save(function(err){
            if(err)
                res.send(err);
            res.json({message: 'Collection Created!'});
        });
    })
    .get(function(req, res){
        Collection.find(function(err, collections){
            if(err)
                res.send(err);
            res.json(collections);
        });
    });
router.route('/collections/:collection_id')
    .put(function(req, res){
        Collection.findById(req.params.collection_id, function(err, collection){
            if(err)
                res.send(err);
            collection.name = req.body.name;
            collection.description = req.body.description;
            collection.creator = req.body.creator;
            collection.priv = req.body.priv;
            collection.rating = 0;
            collection.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Collection updated!'});
            });
        });
    })
    .delete(function(req, res){
        Collection.remove({
            _id: req.params.collection_id
        }, function(err, collection){
            if(err)
                res.send(err);
            res.json({message: 'Successfully deleted'});
        });
    });
router.route('/images')
    .post(function(req, res){
        var image = new Image();
        image.imageURL = req.body.imageURL;
        image.imageCollection = req.body.imageCollection;
        image.save(function(err){
            if(err)
                res.send(err);
            res.json({message: 'Image Created!'});
        });
    })
    .get(function(req, res){
        Image.find(function(err, images){
            if(err)
                res.send(err);
            res.json(images);
        });
    });
router.route('/images/:image_id')
    .put(function(req, res){
        Image.findById(req.params.image_id, function(err, image){
            if(err)
                res.send(err);
            image.imageURL = req.body.imageURL;
            image.imageCollection = req.body.imageCollection;
            image.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Image updated!'});
            });
        });
    })
    .delete(function(req, res){
        Image.remove({
            _id: req.params.image_id
        }, function(err, image){
            if(err)
                res.send(err);
            res.json({message: 'Successfully deleted'});
        });
    });
router.route('/ratings')
    .post(function(req, res){
        var rating = new Rating();
        rating.collectionID = req.body.collectionID;
        rating.User = req.body.User;
        rating.Rating = req.body.Rating;
        rating.save(function(err){
            if(err)
                res.send(err);
            res.json({message: 'Rating Created!'});
        });
    })
    .get(function(req, res){
        Rating.find(function(err, ratings){
            if(err)
                res.send(err);
            res.json(ratings);
        });
    });
router.route('/ratings/:rating_id')
    .put(function(req, res){
        Rating.findById(req.params.rating_id, function(err, rating){
            if(err)
                res.send(err);
            rating.collectionID = req.body.collectionID;
            rating.User = req.body.User;
            rating.Rating = req.body.Rating;
            rating.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Rating updated!'});
            });
        });
    })
    .delete(function(req, res){
        Rating.remove({
            _id: req.params.rating_id
        }, function(err, rating){
            if(err)
                res.send(err);
            res.json({message: 'Successfully deleted'});
        });
    });
router.route('/login')
    .post(function(req, res){
        User.find({email:req.body.email}, function(err, users){
            var auth = false;
            //if there is an error, send the error back
            if(err){
                res.send(err);
            }
            //if no users, notify that the user has entered an invalid email
            else if(users.length==0){
                res.status(200).json({message:'Invalid Email.'});
            }
            //if no errors and there are users, check if user is authenticated
            else{
                //now check that the email matches an email in the database, and that the password has a matching bcrypt password
                for(var i=0; i<users.length; i++){
                    //if their entered password equals one of the unhashed passwords, then log the user in
                    if(users[i].email==req.body.email&&bcrypt.compareSync(req.body.password, users[0].password)==true){
                        //send a response saying that the query worked
                        res.status(200).json({
                            message: 'User logged in.',
                            user: users[i]
                        });
                        auth=true;
                    }
                    //if their entered password equals one of the passwords (before hashing was introduced), let the user login
                    else if(users[i].email==req.body.email&&users[i].password==req.body.password){
                        res.status(200).json({
                            message: 'User logged in.',
                            user: users[i]
                        });
                        auth=true;
                    }
                }
                //otherwise user entered wrong credentials
                if(auth==false){
                    res.status(200).json({
                        message: 'Invalid Login'
                    });
                }
            }
        });
    });
//REGISTER ROUTES
//=============================================
app.use('/api', router);

//START SERVER
//=============================================
app.listen(port);
console.log('Magic happens on port '+ port);
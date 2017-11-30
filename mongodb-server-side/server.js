//BASE SETUP
//=============================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var Image = require('./app/models/images');
var Collection = require('./app/models/imageCollection');
var User = require('./app/models/User');
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
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
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
    .put(function(req, res){
        User.findById(req.params.user_id, function(err, user){
            if(err)
                res.send(err);
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = req.body.password;
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
        collection.rating = req.body.rating;
        collection.numOfRatings = req.body.numOfRatings;
        collection.creator = req.body.creator;
        collection.priv = req.body.priv;
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
            collection.rating = req.body.rating;
            collection.numOfRatings = req.body.numOfRatings;
            collection.creator = req.body.creator;
            collection.priv = req.body.priv;
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
        image.name = req.body.name;
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
            image.name = req.body.name;
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
//REGISTER ROUTES
//=============================================
app.use('/api', router);

//START SERVER
//=============================================
app.listen(port);
console.log('Magic happens on port '+ port);
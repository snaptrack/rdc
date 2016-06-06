var express = require('express');
var router = express.Router();
var request = require('request');
var jsonwebtoken = require("jsonwebtoken");



router.get('/photos',function(req,res,next){
    var id = req.user.id;
    var url='https://rdc2016.firebaseio.com/Users/'+id+'.json';
    request.get({
        url: url,
        json: true,
        headers: {
            "content-type": "application/json"
        }
    },function(error,response,body){
        if(!error && response.statusCode==200){
            var photos=response.body.Person.photos;
            res.json({photos: photos});
            
        }
        else{
            console.log(error);
            res.json({});
        }
    });
});


router.get('/friends',function(req,res,next){
    var id = req.user.id;
    var url='https://rdc2016.firebaseio.com/Users/'+id+'.json';
    request.get({
        url: url,
        json: true,
        headers: {
            "content-type": "application/json"
        }
    },function(error,response,body){
        if(!error && response.statusCode==200){
            var friends=response.body.Person.friends;
            res.json({friends: friends});
            
        }
        else{
            console.log(error);
            res.json({});
        }
    });
});


router.get('/places',function(req,res,next){
    var id = req.user.id;
    var url='https://rdc2016.firebaseio.com/Users/'+id+'.json';
    request.get({
        url: url,
        json: true,
        headers: {
            "content-type": "application/json"
        }
    },function(error,response,body){
        if(!error && response.statusCode==200){
            var places=response.body.Person.luoghi;
            res.json({places: places});
            
        }
        else{
            console.log(error);
            res.json({});
        }
    });
});












module.exports = router;

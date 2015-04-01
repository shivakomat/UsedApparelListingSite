var express = require('express');
var posts = express.Router();

//***POST OBJ JSON FORMAT
//{"post_id":123,"category":"SHOES",title":"Sample Post","description":"This is my first post","price":50}

posts.get('/get/gender/:type', function(req,res) {	
	var db = req.mongodb;
	var gender = req.params.type;
  	db.collection('posts').find({gender:gender}).toArray(function (err,items){
    	res.json(items);
  	});
});

posts.get('/get/category/:type', function(req,res) {	
	var db = req.mongodb;
	var category = req.params.type;
  	db.collection('posts').find({category:category}).toArray(function (err,items){
    	res.json(items);
  	});
});

posts.get('/get/all', function(req,res) {	
	var db = req.mongodb;
	db.collection('posts').find().toArray(function (err,content){ res.json(content); });	
});

posts.put('/insert',function(req,res) {
	var db = req.sqldb;
	db.collection('posts').insert(req.body,function(err,result){ res.send((err === null) ? { msg: '' } : { msg: err }); });
});

posts.put('/update',function(req,res) {
	var db = req.mongodb;
	var post = req.body;
  	db.collection('posts').update({name:post.name}, {$set:{post_id : post.id, category : post.category, title : post.title, description : post.description, price : post.price}}, function(err,result) {
        res.send((result === 1) ? { msg: '' } : { msg: 'error:' + err });
  	});
});

posts.delete('/delete/:id',function(req,res) {
	var db = req.mongodb;	
	db.collection('posts').removeById(req.params.id,function(err,result) {
		res.send((result === 1) ? { msg: '' } : { msg: 'error:' + err });
	});
});




module.exports = posts;
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const update = require('./util/update.js');
const remove = require('./util/remove.js');

const dbUrl = "mongodb://localhost:27017/todo";

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extend:false}));

router.post('/save', function(req, res){
  try{
  	MongoClient.connect(dbUrl, update(req.body));
  	res.json({status:'1', message:"ok"});
  }catch(err){
  	res.json({status:'0', message: err.message});
  }
});

router.post('/remove', function(req, res){
  try{
  	MongoClient.connect(dbUrl, remove(req.body));
  	res.json({status:'1', message:"ok"});
  }catch(err){
  	res.json({status:'0', message: err.message});
  }
});

router.post('/init', function(req, res){
  try{
  	MongoClient.connect(dbUrl, function(err, client){
		if (err) throw err;

		const db = client.db('todo');

		db.collection("todo").find({user:req.body.user},{_id:0}).toArray(function(err,result){
			if (err) throw err;
			if (result.length > 0){
				res.render('item',result[0],function(err,html){
					if (err) throw err;
					res.send(html);
				});
			}else{
        res.send('');
      }
		});
		client.close();
	});
  }catch(err){
  	res.send('');
  }
});

module.exports = router;
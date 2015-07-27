//Adding required node modules
//Please use MongoDB 1.4.x(npm install mongodb@1.4.x)
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    express=require('express'),
    http = require('http'),
    express = require('express'),
    path = require('path'),
    app = express();
	app.set('port', 9600); 
	app.set('views', path.join(__dirname, 'views')); //A
	app.use(express.static(path.join(__dirname, 'public')));
	//Create mongoclient instance with supplied hostname and port
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
	//Connection Intiation
	mongoclient.open(function(err, mongoclient) {
	// Intiage DB Instance
	var db = mongoclient.db("accedo_db");    
	//app routing
	app.get('/', function (req, res) {
	   	res.status('200').send('<html><body><h1>Accedo DB Server</h1></body></html>');
	});

	//main http routng with 3 parameters
	//method = command
	//username = user
	//score=score
	
	app.get('/:method?/:username?/:score?', function (req,res) {
		var method=req.params.method;
		if(method=="insert"){
			db.collection('userscore').insert({ "username" : req.params.username, "score" : req.params.score },function(err,result){
			 	if(err){
			 		logger("error",err);
			 	}
			 	else{
			 		logger("success",result);
			 		res.status('200').send(result);
			 	}
			});
		}
		else if(method=="get"){
			db.collection('userscore').find({username:req.params.username}).toArray(function(err,result){
				if(err){
					logger("error",err);
			 	}
			 	else{
			 		logger("success",result);
			 		res.set('Content-Type','application/json'); //G
			 		res.status('200').send(result);
			 	}
			});
		}
		else if(method=="getall"){
			db.collection('userscore').find().toArray(function(err,result){
				if(err){
					logger("error",err);
			 	}
			 	else{
			 		logger("success",result);
			 		res.set('Content-Type','application/json'); //G
			 		res.status('200').send(result);
			 	}
			});
		}
		else{
			mongoclient.close();
		}
	}); 

	function logger(type,data){
		console.log(new Date());
		if(type=="success"){
			console.log("---------SUCCESS----------");
			console.log(data);
		}
		else{
			console.log("---------ERRROR----------");
			console.log(data);
		}
	}

	app.use(function (req,res) {
	    res.status('404').send({url:req.url});
	});
	 
	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});

});

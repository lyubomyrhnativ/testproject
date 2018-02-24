var users=[
{
	username:'Petro',
	password:'123'
},
{
	username:'Ivan',
	password:'124'
}
];
var fs=require('fs');
var express=require('express');
var app=express();
app.use(express.static(__dirname));

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',function(req,res){
	res.sendFile(__dirname+'/main.html');
})
app.get('/send',function(req,res){
	console.log(req.query);
	var user=req.query;
	if(users.some(function(item){
		return item.username==user.username && item.password==user.password
	}))
	res.send('success!');
	res.send('error!');
})
app.post('/send',function(req,res){
	console.log(req.body);
	var user=req.body;
	if(users.some(function(item){
		return item.username==user.username && item.password==user.password
	}))
	res.send('success!');
	res.send('error!');

})
app.get('/getajax',function(req,res){
	console.log('post');
	console.log(req.query);
	res.send('success!');

})
app.post('/postajax',function(req,res){
	console.log(req.body);
	res.send('test');
})
app.get('/getfile',function(req,res){
	//var file=fs.readFileSync('data.json','utf-8');
	fs.readFile('data.json','utf-8',function(err,data){
		console.log(data);
		res.send(data);
	})
	//file=JSON.parse(file);
	//res.send(file);

})
app.post('/adduser',function(req,res){
	console.log(req.body);
	var user=req.body;
	fs.readFile('data.json','utf-8',function(err,data){
		data=JSON.parse(data);
		data.push(user);
		data=JSON.stringify(data);
		fs.writeFile('data.json',data);
		res.send("adduser");
	})
	
})
app.listen(process.env.PORT||8080);
console.log('run server!');
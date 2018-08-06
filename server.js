var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var product = require('./product');

var baseUrl='http://localhost:8090/products';
//use body parser
app.use(bodyParser.urlencoded({extended:true}));

//setting your view engine
app.set('view engine', 'ejs');

//useful things
app.use('/slider/',express.static(__dirname+'./slider'));

//this is use to insert into the collection
app.get('/products',function(req, res){
product.find({},function(err, data){
		//console.log(data);
if (err) { 
	res.send('error');
}
res.render('products', {datas : data,});


	});
});
//getting data from view and posting it to Mongodb
app.post('/products',function(req,res){
// get data from the view and pass is to the model
var p = product(req.body);
//console.log(p);
p.save(function(err,data){
	if (err) {
		res.send('error');
		console.log('error');}
	
	res.redirect(baseUrl);
	//console.log(data);

});
});

//update
app.get('/update/:update_id',function(req, res){
	product.findOne({_id:req.params.update_id}, function(err, prod){
		console.log(prod);
		if (err) res.send(err);
		res.render('update',{
			dataA : prod
		});
		//res.json(prod);
	});
});
app.post('/update/:update_id',function(req, res){
	product.findByIdAndUpdate(req.params.update_id,req.body, function(err, prod){
		//console.log(prod._id);
		if (err) res.send(err);
		res.redirect(baseUrl);
		
	});
});

app.get('/delete/:product_id',function(req, res){
	product.findByIdAndRemove(req.params.product_id, function(err, prod){
		if (err) res.send(err);
		res.redirect(baseUrl);
	});
});

app.listen(8090);
console.log('rest api is running on port 8090');
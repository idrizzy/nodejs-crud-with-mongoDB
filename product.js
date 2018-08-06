var mongoose = require('mongoose');
//connection to the database!!!
mongoose.connect('mongodb://localhost:27017/testaroo', function(err){
	if (err) throw err;
	console.log('successfully connected to the database!!!')
});

var Schema = mongoose.Schema;
var productSchema = new Schema({
title:String,
price:Number,
instock:Boolean,
photo:String
});
module.exports = mongoose.model('testeds', productSchema);

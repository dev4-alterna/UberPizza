const mongoose= require('mongoose');

const Schema= mongoose.Schema

const ProductsSchema= new Schema({
	name:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	price:{
		type:String,
		required:true
	},
	profile_picture:{
		type:String,
		required:true
	},
	providers:{
		type:Schema.Types.ObjectId,
		ref:'providers'
	},
	is_active:{
		type:Boolean,
		default:true
	}
	
},{collection:"products",timestamps:true})

module.exports= mongoose.model('products',ProductsSchema);
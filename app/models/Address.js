const mongoose= require('mongoose');

const Schema= mongoose.Schema

const AddressSchema= new Schema({
	street:{
		type:String,
		required:true
	},
	inside_number:{
		type:String,
		required:true
	},
	outside_number:{
		type:String
	},
	crossing:{
		type:String,
		required:true
	},
	cp:{
		type:String,
		required:true
	},
	colony:{
		type:String,
		required:true
	},
	reference:{
		type:String
	},
	latitude:{
		type:Number
	},
	longitude:{
		type:Number
	},
	customer:{
		type:Schema.Types.ObjectId,
		ref:'customers'
	},
	default:{
		type:Boolean,
		default:false
	},
	is_active:{
		type:Boolean,
		default:true
	}
	
},{collection:"address",timestamps:true})

module.exports= mongoose.model('address',AddressSchema);
const mongoose= require('mongoose');
const bcrypt= require("bcrypt");

const Schema= mongoose.Schema;

const ProvidersSchema= new Schema({
	
	first_name:{
		type:String,
		required:true
	},
	last_name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	},
	address:{
		/*listado de direcciones*/
		type:[Schema.Types.ObjectId],
		ref:'address' 
	},
	profile_picture:{
		type:String
	},
	balance:{ 
		/*saldo actual*/
		type:Number,
		require:true,
		default:0
	},
	score:{
		/*puntaje*/
		type:Number,
		default:0
	},
	is_active:{
		type:Boolean,
		default:true
	}
},{collection:"providers",timestamps:true});

ProvidersSchema.pre('save',function(next){
	const Providers=this;
	const SALT_FACTOR=10

	if(!Providers.isModified("password")){ return next()}
	bcrypt.genSalt(SALT_FACTOR,function(err,salt){
		if(err) return next(err);

		bcrypt.hash(Providers.password,salt,function(err,hash){
			if(err) return next(err);
			Providers.password= hash;
			next();
		})

	})
	
});

module.exports= mongoose.model('providers',ProvidersSchema);
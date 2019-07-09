const jwt =  require('jsonwebtoken')
const CustomersModel =  require('../models/Customers')
const ProvidersModel =  require('../models/Providers')

const verifyToken = async (req) => {
	const Authorization =  req.get('Authorization')
	
	if(!Authorization){
		return req
	} else{
		const  formatedToken =  Authorization.replace('JWT ',"");
		const payload =  jwt.verify(formatedToken, process.env.SECRET_KEY)
		
		if(!payload) return req
		if(!payload.typeUser)return req
		
		if(payload.typeUser=="C"){
			const user =  await CustomersModel.findOne({_id:payload._id})
			if(!user) return req;
			
			return {...req,user,payload}
		}
		else if(payload.typeUser=="P"){
			//console.log(payload.typeUser)
			const user =  await ProvidersModel.findOne({_id:payload._id})
			if(!user) return req;
			
			return {...req,user,payload}
		}
	}
}

module.exports =  verifyToken;
const bcrypt = require('bcrypt');
const CustomersModel =  require('../models/Customers');
const ProvidersModel =  require('../models/Providers');
const createToken =  require('./createToken');

const authenticate =  ({ email, password,typeUser }) => {
	return new Promise((resolve,reject) => {
		
		if(typeUser=="C")
		{
			CustomersModel.findOne({email}).then((user) => {
				if(!user) reject(new Error("Usuario no existe"))
				//console.log(user)
				bcrypt.compare(password,user.password,(err,isValid) => {
					if(err) reject(new Error("Error al crear el Token "))
					user['typeUser']=typeUser;
					isValid ? resolve(createToken(user)) : reject("Password no coinciden")
	
				})
	
	
			}).catch(e  => reject(e) );
		}else if(typeUser=="P")
		{
			ProvidersModel.findOne({email}).then((user) => {
				if(!user) reject(new Error("Usuario no existe"))
	
				bcrypt.compare(password,user.password,(err,isValid) => {
					if(err) reject(new Error("Error al crear el Token "))
					user['typeUser']=typeUser;
					isValid ? resolve(createToken(user)) : reject("Password no coinciden")
	
				})
	
	
			}).catch(e  => reject(e) );
		}
		else{
			reject(new Error("No existe el tipo de Usuario"))
		}
		

	})

}

module.exports =  authenticate;
const CustomersModel=require('../../models/Customers');
const authenticate= require('../../utils/authenticate');
const storage=require('../../utils/storage');

const createCustomers= async(root,params,context,info)=>{
	
	if(params.data.profile_picture){
		//se obtiene la direccion de la foto
		const { createReadStream}=await params.data.profile_picture;
		const stream = createReadStream();
		const {url}= await storage({stream});

		params.data.profile_picture=url;
	}
	//crea el cliente
	const newCustomer= await CustomersModel.create(params.data)
								.catch(e=>{throw new Error(e.message)})
	//valida si se creo el cliente								  
	if(!newCustomer) throw new Error("No se creo el 'Cliente'");								  
	
	return newCustomer.toObject();
}
const updateCustomers= async(root,params,context,info)=>{
	const {data} = params 
	const {user}=context
	//console.log(params.data);
	if(params.data.profile_picture){
		//se obtiene la direccion de la foto
		const { createReadStream}=await params.data.profile_picture;
		const stream = createReadStream();
		const {url}= await storage({stream});

		params.data.profile_picture=url;
	}
	//valida que el cliente exista
	let Customers=await CustomersModel.findById(user._id)
	if(!Customers) throw new Error("cliente no existe")
	//actualiza los datos
	Object.keys(data).map( key => Customers[key] = data[key])
	const updateCustomers= await Customers.save({new:true})
	return updateCustomers.toObject();
}
const deleteCustomers= async(root,params,context,info)=>{
	const {user}=context
	//console.log(params.data);
	//valida que el cliente exista
	const Customers=await CustomersModel.findById(user._id);
	if(!Customers) throw new Error("cliente no existe")
	//baja logica del cliente
	Customers.is_active=false;
	const deleteCustomers=await Customers.save({new:true})
	return "Cliente eliminado"
}
const login= async(root,params,context,info)=>{
	//valida autentificacion
	//console.log(params);
	const token= await authenticate(params).catch(e=>{throw e})
	return{
		token,
		message:"OK"
	}
}

module.exports={
	createCustomers,
	updateCustomers,
	deleteCustomers,
	login
}
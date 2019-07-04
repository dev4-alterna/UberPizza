const AddressModel=require('../../models/Address');

const createAddress= async(root,params,context,info)=>{
	
	const newAddress= await AddressModel.create(params.data)
								.catch(e=>{throw new Error(e.message)})
									  
	if(!newAddress) throw new Error("No se creo el 'Direccion'");								  
	
	return newAddress.toObject();
}
const updateAddress= async(root,params,context,info)=>{
	const {data} = params 
	const {user}=context
	//valida que la direccion exista
	let Address=await AddressModel.findById(user._id)
	if(!Address) throw new Error("Dirección no existe")
	//actualiza los datos
	Object.keys(data).map( key => Address[key] = data[key])
	const updateAddress= await Address.save({new:true})
	return updateAddress.toObject();
}
const deleteAddress= async(root,params,context,info)=>{
	const {user}=context
	//valida que el cliente exista
	const Address=await AddressModel.findById(user._id);
	if(!Address) throw new Error("Dirección no existe")
	//baja logica del cliente
	Address.is_active=false;
	const deleteAddress=await Address.save({new:true})
	return "Cliente eliminado"
}

module.exports={
	createAddress,
	updateAddress,
	deleteAddress
}
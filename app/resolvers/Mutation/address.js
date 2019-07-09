const AddressModel=require('../../models/Address');
const CustomerModel=require('../../models/Customers');
const ProvidersModel=require('../../models/Providers');


const createAddress= async(root,params,context,info)=>{
	
	const {user} = context;
	const {payload}=context;

	// usuario debe esta logueado para recuperar el id
	const Address = await AddressModel.create(params.data)
								.catch( e => {throw new Error("Error al crear la dirección")} )
	const newAddress= await AddressModel.findOne({_id:Address._id});

	if(payload.typeUser=='C')
	{
		await CustomerModel.findByIdAndUpdate(user.id,{$push:{address:Address}})
	}
	else if(payload.typeUser=='P')
	{
		await ProvidersModel.findByIdAndUpdate(user.id,{$push:{address:Address}})
	} 
	return newAddress;
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
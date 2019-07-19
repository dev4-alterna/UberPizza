const AddressModel=require('../../models/Address');
const CustomersModel=require('../../models/Customers');
const ProviderModel= require('../../models/Providers')

//Enlista todas la direcciones activos
const listAddress= async(root,params,context,info)=>{
	const {user} = context;
	const {payload}=context;
	
	
	//console.log(customer[0].address)
	if(payload.typeUser=='C')
	{
		const customer =await CustomersModel.find({_id:user.id})
		const addressCustomer=await AddressModel.find({_id:customer[0].address}).populate('address');
		return addressCustomer
	}
	else if(payload.typeUser=='P')
	{
		const Provider =await ProviderModel.find({_id:user.id})
		const addressProvider=await AddressModel.find({_id:Provider[0].address}).populate('address');
		return addressProvider
	} 
}
//listar una dirección en particular
const singleAddress= async(root,params,context,info)=>{

	const Address =  await AddressModel.findById(params.id).populate('customers');
	if(!Address) throw new Error("Dirección no existe");
	return Address.toObject();
}

module.exports={
        listAddress,
        singleAddress
    }
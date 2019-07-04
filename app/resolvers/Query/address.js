const AddressModel=require('../../models/Address');

//Enlista todas la direcciones activos
const listAddress= async(root,params,context,info)=>{
	const address= await AddressModel.find({is_active:true}).populate('customer');
	return address
}
//listar una dirección en particular
const singleAddress= async(root,params,context,info)=>{

	const Address =  await AddressModel.findById(params.id).populate('customer');
	if(!Address) throw new Error("Dirección no existe");
	return Address.toObject();
}

module.exports={
        listAddress,
        singleAddress
    }
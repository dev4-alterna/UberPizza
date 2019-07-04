const ProvidersModel=require('../../models/Providers');

//Enlista todos los proveedores activos
const listProviders=async(root,params,context,info)=>{
	const provider= await ProvidersModel.find({is_active:true}).populate('address');
	return provider
}
// listar proveedor en particular
const singleProviders= async(root,params,context,info)=>{

	const provider =  await ProvidersModel.findById(params.id).populate('address');
	if(!provider) throw new Error("Proveedor no existe");
	return provider.toObject();
}

module.exports={
        listProviders,
        singleProviders
    }
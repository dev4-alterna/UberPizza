const ProvidersModel=require('../../models/Providers');
const storage=require('../../utils/storage');
const authenticate= require('../../utils/authenticate');

const createProviders= async(root,params,context,info)=>{
	if(params.data.profile_picture){
		//se obtiene la direccion de la foto
		const { createReadStream}=await params.data.profile_picture;
		const stream = createReadStream();
		const {url}= await storage({stream});

		params.data.profile_picture=url;
	}
	//crear al proveedor
	const newProviders= await ProvidersModel.create(params.data)
								.catch(e=>{throw new Error(e.message)})
	//valida si se creo el proveedor									  
	if(!newProviders) throw new Error("No se creo el 'Proveedor'");								  
	
	return newProviders.toObject();
}
const updateProviders= async(root,params,context,info)=>{
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
	let Providers=await ProvidersModel.findById(user._id)
	if(!Providers) throw new Error("Proovedor no existe")
	//actualiza los datos
	Object.keys(data).map( key => Providers[key] = data[key])
	const updateProviders= await Providers.save({new:true})
	return updateProviders.toObject();
}
const deleteProviders= async(root,params,context,info)=>{
	const {user}=context
	//console.log(params.data);
	//valida que el Proovedor exista
	const Providers=await ProvidersModel.findById(user._id);
	if(!Providers) throw new Error("Proovedor no existe")
	//baja logica del Proovedor
	Providers.is_active=false;
	const deleteProviders=await Providers.save({new:true})
	return "Proovedor eliminado"
}

module.exports={
	createProviders,
	updateProviders,
	deleteProviders
}
const ProductsModel=require('../../models/Products');
const ProvidersModel=require('../../models/Providers');
const storage=require('../../utils/storage');


const createProducts= async(root,params,context,info)=>{
	const {user} = context;
	params.data.provider = user;
	if(params.data.profile_picture){
		//se obtiene la direccion de la foto
		const { createReadStream}=await params.data.profile_picture;
		const stream = createReadStream();
		const {url}= await storage({stream});

		params.data.profile_picture=url;
	}
	//crear producto
	const Product = await ProductsModel.create(params.data)
								.catch( e => {throw new Error("Error al crear producto")} )
	//buscar producto
	const newProducts = await ProductsModel.findOne({_id:Product._id}).populate('provider');
	// actualizar provider
	await ProvidersModel.findByIdAndUpdate(user.id,{$push:{products:Product}})
	return newProducts;
}
const updateProducts = async(root,params,context,info) => {

	const {id,data} = params;
	const {user} = context;
	
	//valida que el producto exista
	let Products=await ProductsModel.findById(user._id)
	if(!Products) throw new Error("Producto no existe")

	if(data.profile_picture){
		//se obtiene la direccion de la foto
		const { createReadStream}=await data.profile_picture;
		const stream = createReadStream();
		const {url}= await storage({stream});

		data.profile_picture=url;
	}

	const updatedPost = await ProductsModel.findOneAndUpdate({_id:id,provider:user._id},{$set:{...data}},{new:true})

	return updatedPost.toObject();

}
const deleteProducts = async(root,params,context,info) => {

	const {id} = params;
	const {user} = context;

	await ProductsModel.findOneAndUpdate({_id:id,provider:user._id},{$set:{is_active:false}})

	return "Producto eliminado"

}
module.exports={
	createProducts,
	updateProducts,
	deleteProducts
}
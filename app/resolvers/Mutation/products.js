const ProductsModel=require('../../models/Products');

const createProducts= async(root,params,context,info)=>{
	
	const newProducts= await ProductsModel.create(params.data)
								.catch(e=>{throw new Error(e.message)})
									  
	if(!newProducts) throw new Error("No se creo el 'Producto'");								  
	
	return newProducts.toObject();
}
module.exports={
	createProducts
}
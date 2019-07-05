const ProductsModel=require('../../models/Products');

const listProducts=async(root,params,context,info)=>{
	const product= await ProductsModel.find({});
	return product
}

const singleProducts= async(root,params,context,info)=>{

	const product =  await ProductsModel.findById(params.id).populate('providers');
	if(!product) throw new Error("Producto no existe");
	return product.toObject();
}

module.exports={
        listProducts,
        singleProducts
    }
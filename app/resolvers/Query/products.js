const ProductsModel=require('../../models/Products');

const listProducts=async(root,params,context,info)=>{
	const product= await ProductsModel.find({});
	return product
}

module.exports={
        listProducts 
    }
const SalesModel=require('../../models/Sales');
const SalesDetailModel=require('../../models/sales_detail');

const listSales= async(root,params,context,info)=>{ 
	const {user}=context
	const Sales= await SalesModel.find({is_active:true,status:params.status,customer:user._id}).populate('address').populate('sales_detail');

	for (i in Sales) {
		const detail= Sales[i];
		const details=await SalesDetailModel.find({sales:detail._id}).populate('product');		
		Sales[i].sales_detail=details
    }
	//console.log(Sales)
	return Sales
}

const singleSales= async(root,params,context,info)=>{

	const Sales =  await SalesModel.findById(params.id).populate('sales_detail');
	if(!Sales) throw new Error("Venta no existe");
	return Sales.toObject();
}

module.exports={
	listSales,
	singleSales
}
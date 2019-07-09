const SalesModel=require('../../models/Sales');

const listSales= async(root,params,context,info)=>{
	const Sales= await SalesModel.find({is_active:true}).populate('sales_detail');
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
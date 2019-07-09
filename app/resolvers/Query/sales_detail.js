const SalesDetailModel=require('../../models/sales_detail');

const listSalesDetail=async(root,params,context,info)=>{
	const SalesDetail= await SalesDetailModel.find({is_active:true}).populate('sales_detail');
	return SalesDetail
}
const singleSalesDetail= async(root,params,context,info)=>{

	const SalesDetail =  await SalesDetailModel.findById(params.id).populate('sales_detail');
	if(!SalesDetail) throw new Error("Venta no existe");
	return SalesDetail.toObject();
}

module.exports={
        listSalesDetail,
        singleSalesDetail
    }
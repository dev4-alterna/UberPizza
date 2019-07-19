const SalesDetailModel=require('../../models/sales_detail');
const SalesModel=require('../../models/Sales');


const createSalesDetail= async(root,params,context,info)=>{
    const {user} = context;
    
    //buscar la venta activa con estatus de pedido
    const Sales = await SalesModel.findOne({customer:user._id,status:"Pedido",is_active:true});
    console.log(Sales);
    params.data.sales=Sales;

	//crea detalles de la venta
	const SalesDetail= await SalesDetailModel.create(params.data)
								.catch(e=>{throw new Error(e.message)})
	//valida si se creo la venta							  
	if(!SalesDetail) throw new Error("No se creo el detalle");								  
	const newSalesDetail = await SalesDetailModel.findOne({_id:SalesDetail._id}).populate('products');
	
	await SalesModel.findByIdAndUpdate(Sales._id,{$push:{sales_detail:SalesDetail}})

    return newSalesDetail.toObject();

}

const updateSalesDetail= async(root,params,context,info) => {

	const {id,data} = params;
	const {user} = context;
	
	//valida que el producto exista
	let Sales=await SalesDetailModel.findById(user._id)
	if(!Sales) throw new Error("Pedido no existe")

	const updatedSales = await SalesDetailModel.findOneAndUpdate({_id:id},{$set:{...data}},{new:true})

	return updatedSales.toObject();

}

const deleteSalesDetail = async(root,params,context,info) => {

	const {id} = params;

	await SalesDetailModel.findOneAndUpdate({_id:id},{$set:{is_active:false}})

	return "detalle de pedido eliminado"

}

module.exports={
    createSalesDetail,
    updateSalesDetail,
    deleteSalesDetail
}
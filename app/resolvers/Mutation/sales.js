const SalesModel=require('../../models/Sales');

const createSales= async(root,params,context,info)=>{
    const {user} = context;
    //Obtiene el customer
    params.data.customer = user;

	//crea la venta
	const Sales= await SalesModel.create(params.data)
								.catch(e=>{throw new Error(e.message)})
	//valida si se creo la venta							  
	if(!Sales) throw new Error("No se creo la venta");								  
    const newSales = await SalesModel.findOne({_id:Sales._id}).populate('sales_detail');

    return newSales.toObject();

}

const updateSales = async(root,params,context,info) => {

	const {id,data} = params;
	const {user} = context;
	
	//valida que el producto exista
	let Sales=await SalesModel.findById(user._id)
	if(!Sales) throw new Error("Pedido no existe")

	const updatedSales = await SalesModel.findOneAndUpdate({_id:id,customer:user._id},{$set:{...data}},{new:true})

	return updatedSales.toObject();

}

const deleteSales = async(root,params,context,info) => {

	const {id} = params;
	const {user} = context;

	await SalesModel.findOneAndUpdate({_id:id,customer:user._id},{$set:{is_active:false}})

	return "Pedido eliminado"

}

module.exports={
    createSales,
    updateSales,
    deleteSales
}

const SalesModel=require('../../models/Sales');
const SalesDetail=require('../../models/sales_detail');

const createSales= async(root,params,context,info)=>{
    const {user} = context;
    const {sales_detail}=params.data;
    //Obtiene el customer
    params.data.customer = user;
    //elimina el arreglo de detalles
    params.data.sales_detail=null;
	//crea la venta
	const Sales= await SalesModel.create(params.data)
								.catch(e=>{throw new Error(e.message)})
	//valida si se creo la venta							  
	if(!Sales) throw new Error("No se creo la venta");								  
    const newSales = await SalesModel.findOne({_id:Sales._id}).populate('sales_detail');
    const arreglo=[];
    for (i in sales_detail) {
        //recorre los detalles
        const detail= sales_detail[i];
        detail['sales']=Sales._id;
        const newSalesDetail=await SalesDetail.create(detail).catch(e=>{throw new Error(e.message)});
        
        arreglo.push(newSalesDetail._id);
        // solo se pone el ultimo
    }
    
    await SalesModel.findByIdAndUpdate({_id:Sales._id},{$set:{sales_detail:arreglo}},{new:true})

    return newSales.toObject();
    
}

module.exports={
	createSales
}

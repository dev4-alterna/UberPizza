const CustomersModel=require('../../models/Customers');

//Enlista todos los clientes activos
const listCustomers= async(root,params,context,info)=>{
	const customer= await CustomersModel.find({is_active:true}).populate('address');
	//console.log(customer);
	return customer
}

// lista cliente en particular
const singleCustomer= async(root,params,context,info)=>{

	const customer =  await CustomersModel.findById(params.id).populate('address');
	if(!customer) throw new Error("Cliente no existe");
	return customer.toObject();
}

module.exports={
	listCustomers,
	singleCustomer
}
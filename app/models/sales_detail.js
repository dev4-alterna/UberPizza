const mongoose= require('mongoose');

const Schema= mongoose.Schema

const Sales_DetailSchema= new Schema({
    sales:{
		type:Schema.Types.ObjectId,
        ref:'sales',
        require:true,
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'products',
        require:true,
    },
    quantity:{
        type:Number
    },
    amount:{
        type: Number
    }


},{collection:"sales_detail",timestamps:true})

module.exports= mongoose.model('sales_detail',Sales_DetailSchema);
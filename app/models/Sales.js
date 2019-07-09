const mongoose= require('mongoose');

const Schema= mongoose.Schema

const SalesSchema= new Schema({
    customer:{
		type:Schema.Types.ObjectId,
        ref:'customers'
        //,require:true
    },
    payment_method:{
        type:String,
        enum:["E","T"],
        default:"E",
        require:true
    },
    address:{
        type:Schema.Types.ObjectId,
        ref:'address'
        ,require:true
    },
    sales_detail:{
        type:[Schema.Types.ObjectId],
        ref:'sales_detail'
        ,require:true
    },
    commentary:{
        type:String
    },
    deliver_date:{
        type: Date
    },
    date_order:{
        type: Date
    },
    status:{
        type:String,
        enum:["Pedido","Pagado","Preparacion","Horno","Detalles","Repartidor","Entregado","Cancelado"],
        default:"Pedido"
    },
    is_active:{
		type:Boolean,
		default:true
    },
    totals:{
        type:Number,
        default:0
    },
    Subtotals:{
        type:Number,
        default:0
    },
    charge:{
        type:Number,
        default:0
    }


},{collection:"sales",timestamps:true})

module.exports= mongoose.model('sales',SalesSchema);
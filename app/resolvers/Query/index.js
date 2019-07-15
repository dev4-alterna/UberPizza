const QueryCustomers =require('./customers');
const QueryAddress =require('./address');
const QueryProducts =require('./products');
const QueryProviders =require('./providers');
const QuerySales=require('./sales');
const QuerySalesDetail=require('./sales_detail');

module.exports={
    ...QueryCustomers,
    ...QueryAddress,
    ...QueryProducts,
    ...QueryProviders,
    ...QuerySales,
    ...QuerySalesDetail
}
const MutationCustomers=require('./customers');
const MutationAddress=require('./address');
const MutationProducts=require('./products');
const MutationProviders=require('./providers');
const MutationSales=require('./sales');
const MutationSalesDetail=require('./salesDetail');

//console.log(MutationCustomers);

module.exports={
    ...MutationCustomers,
    ...MutationAddress,
    ...MutationProducts,
    ...MutationProviders,
    ...MutationSales,
    ...MutationSalesDetail
}

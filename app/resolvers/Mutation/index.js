const MutationCustomers=require('./customers');
const MutationAddress=require('./address');
const MutationProducts=require('./products');
const MutationProviders=require('./providers');

//console.log(MutationCustomers);

module.exports={
    ...MutationCustomers,
    ...MutationAddress,
    ...MutationProducts,
    ...MutationProviders
}

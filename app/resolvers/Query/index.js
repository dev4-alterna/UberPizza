const QueryCustomers =require('./customers');
const QueryAddress =require('./address');
const QueryProducts =require('./products');
const QueryProviders =require('./providers');

module.exports={
    ...QueryCustomers,
    ...QueryAddress,
    ...QueryProducts,
    ...QueryProviders
}
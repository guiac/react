const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({new: true, runValidators: true})    //new:true - request retornar uma resposta atualizada
BillingCycle.after('post', errorHandler). after('put', errorHandler)   //interceptar "depois" os métodos post e put para aplicar o middleware que faz o tratamento de erro                                                        //run... - valores (min..máx..etc) não valer apenas para o post

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else{
            res.json({value})   // value: quantidade de elementos que existe na collection BillingCycle
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate({
        $project: {credit:{$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
    }, {
        $group: {_id: null, credit:{$sum:"$credit"}, debt:{$sum:"$debt"}},
    },{
        $project: {_id: 0, credit: 1, debt: 1}  //tirando o id para que apareça apenas crédito e débito
    },(error, result) => {
        if(error) {
            res.status(500). json({errors: [error]})
        } else {
            res.json(result[0] || { credit: 0, debt:0 })
        }
    })
})
module.exports = BillingCycle
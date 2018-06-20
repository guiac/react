const mongoose = require('mongoose')    //esse arquivo configura a conexão com o mongodb
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://localhost/mymoney') //mymoney é o nome do banco
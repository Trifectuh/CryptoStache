const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();

var gdax = {
    log: function(){
        console.log('LOGGED');
    }
};

module.exports = gdax;
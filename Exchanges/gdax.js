const Gdax = require('gdax');
const GTT = require('gdax-trading-toolkit');
const publicClient = new Gdax.PublicClient();

var gdax = {
    getCoinInfo: function(coin) {
        publicClient
            .getProductTicker(coin)
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err)
        });
    }
};

module.exports = gdax;
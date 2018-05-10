const Gdax = require('gdax');
const GTT = require('gdax-trading-toolkit');

const logger = GTT.utils.ConsoleLoggerFactory();
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
    },

    orderBookStream: function(coin) {
        var orderbookSync = new Gdax.OrderbookSync(coin);
        orderbookSync.on('message',data => {
            var book = orderbookSync.books[coin].state();
            if(book.bids.length == 0 && book.asks.length == 0){
                console.log("Waiting for data...");
            }
            else {
                console.log((book));
            }
        });
    },

    priceFeed: function(coin){
        return new Gdax.WebsocketClient(coin);
    },

    name: 'Gdax'


};

module.exports = gdax;
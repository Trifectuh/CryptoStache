const Gdax = require('gdax');
const Chart = require('gdax-candles');
const GTT = require('gdax-trading-toolkit');

const logger = GTT.utils.ConsoleLoggerFactory();
const publicClient = new Gdax.PublicClient();

var gdax = {
    name: 'Gdax',

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

    priceFeed: function(pair){
        return new Gdax.WebsocketClient(pair);
    },

    ticker: function(pair, timeframe){
        return new Chart({ product: pair, timeframe: timeframe }).start();
    }
};

module.exports = gdax;
const Gdax = require('gdax');
const Chart = require('gdax-candles');
const view = require('../Frontend/view');
const fs = require("fs");

const configContents = fs.readFileSync("config.json");
const config = JSON.parse(configContents);

const apiURI = 'https://api.gdax.com';
const sandboxURI = 'https://api-public.sandbox.gdax.com';

const authedClient = new Gdax.AuthenticatedClient(
    config.gdax.key,
    config.gdax.secret,
    config.gdax.passphrase,
    sandboxURI
);

var gdax = {
    name: 'Gdax',

    getFills: function() {
        view.status(JSON.stringify(authedClient.getFills()));
    },

    log: function(price, size, product_id) {
        view.status(size + " " + product_id + " at " + price);
    },

    buy: function(price, size, product_id) {
        const buyParams = {
            type: 'market',
            size: size,
            product_id: product_id,
        };
        authedClient.buy(buyParams, this.log(size, product_id));
    },

    sell: function(price, size, product_id) {
        const buyParams = {
            type: 'market',
            size: size,
            product_id: product_id,
        };
        authedClient.sell(buyParams, this.log(price, size, product_id));
    },

    getCoinInfo: function(coin) {
        authedClient
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
        orderbookSync.on('message', data => {
            var book = orderbookSync.books[coin].state();
            if (book.bids.length == 0 && book.asks.length == 0) {
                console.log("Waiting for data...");
            } else {
                console.log((book));
            }
        });
    },

    priceStream: function(pair) {
        return new Gdax.WebsocketClient(pair);
    },

    candleBuilder: function(pair, timeframe) {
        return new Chart({ product: pair, timeframe: timeframe }).start();
    }
};

module.exports = gdax;
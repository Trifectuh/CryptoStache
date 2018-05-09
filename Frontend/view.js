const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var view = {
    infoBar: function(strategy, pair, exchange) {
        console.log('Strategy: ' + strategy +
            '    Pair: ' + pair +
            '    Exchange: ' + exchange);
    },

    priceStream: function(price, timestamp) {
        console.log(price + '        ' +
            timestamp);
    },

    alert: function(alert) {
        console.log(alert);
    },

    status: function(status) {
        console.log(status);
    },

    tradeResult: function(res) {
        console.log('You made ' + res + ' on that one dawg.');
    },

    pandl: function(profit) {
        console.log('P/L this run: ' + profit);
    }
};

module.exports = view;
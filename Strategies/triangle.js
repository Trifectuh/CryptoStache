const chart = require('./Utilities/chart.js');

var strategy = {
    name: 'Triangular Arbitrage',
    type: 'USD -> BTC -> ETH -> USD',
    suggestedPairs: ['BTC-USD', 'ETH-BTC', 'LTC-BTC'],
    suggestedTimeframes: ['1s', '5s', '1m', '15m', '1h', '4h', '1d'],
    view: null,

    run: function(exchange, pair, view, timeframe) {
        console.log('running');
        var btcusdPrice = 0;
        var ethbtcPrice = 0;
        var ethusdPrice = 0;

        var btcCanBuy = 0;
        var ethCanBuy = 0;
        var usdCanBuy = 0;
        var capital = 100;
        // Open constant price feed
        const btcusdStream = exchange.candleBuilder('BTC-USD', '1s');
        btcusdStream.on('close', data => {
            /*if (data.reason === 'filled' && data.price !== NaN) {
                btcusdPrice = data.price;
                btcCanBuy = capital / btcusdPrice;
            }*/
            console.log(data);
        });
        const ethbtcStream = exchange.priceStream('ETH-BTC');
        ethbtcStream.on('message', data => {
            if (data.price !== NaN) {
                ethbtcPrice = data.price;
                ethCanBuy = btcCanBuy / ethbtcPrice;
            }
        });
        const ethusdStream = exchange.priceStream('ETH-USD');
        ethusdStream.on('message', data => {
            if (data.reason === 'filled' && data.price !== NaN) {
                ethusdPrice = data.price;
                usdCanBuy = ethCanBuy * ethusdPrice;
                /*   console.log('');
                   console.log('Can buy: ' + btcCanBuy + ' BTC for ' + capital + ' USD');
                   console.log('Then buy: ' + ethCanBuy + ' ETH');
                   console.log('Then sell for: ' + usdCanBuy + ' USD'); */
                var profit = usdCanBuy - capital;
                capital = capital + profit;
            }
        });
    }
}

module.exports = strategy;
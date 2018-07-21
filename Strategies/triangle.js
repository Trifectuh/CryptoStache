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
        console.log('waiting for price data...');
        const btcusdStream = exchange.candleBuilder('BTC-USD', timeframe);
        btcusdStream.on('close', data => {
            if (data.price != null) {
                btcusdPrice = data.price;
            }
        });
        const ethbtcStream = exchange.candleBuilder('ETH-BTC', timeframe);
        ethbtcStream.on('close', data => {
            if (data.price != null) {
                ethbtcPrice = data.price;
            }
        });
        const ethusdStream = exchange.candleBuilder('ETH-USD', timeframe);
        ethusdStream.on('close', data => {
            ethusdPrice = data.price;
            if (data.price != null) {
                if (btcusdPrice !== 0 && ethbtcPrice != 0 && ethusdPrice !== 0) {
                    btcCanBuy = (capital * 0.997) / btcusdPrice;
                    ethCanBuy = (btcCanBuy * 0.997) / ethbtcPrice;
                    usdCanBuy = (ethCanBuy * 0.997) * ethusdPrice;
                    var profit = usdCanBuy - capital;
                    if (profit > 0) {
                        console.log('');
                        console.log('Can buy: ' + btcCanBuy + ' BTC at ' + btcusdPrice + ' for ' + capital.toFixed(2) + ' USD');
                        console.log('Then buy: ' + ethCanBuy + ' ETH at ' + ethbtcPrice);
                        console.log('Then sell for: ' + usdCanBuy + ' USD at ' + ethusdPrice);
                        console.log('Profit: ' + profit);
                        capital = capital + profit;
                    } else console.log('bad trade found: ' + profit.toFixed(2));
                }
            }
        });
    }
}

module.exports = strategy;
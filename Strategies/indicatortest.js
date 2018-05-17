const macd = require('./Indicators/macd.js');
const chart = require('./Utilities/chart.js');

var indicatortest = {
    name: 'Indicator Test',
    type: 'basic macd',
    suggestedPairs: ['BTC-USD', 'ETH-USD'],
    suggestedTimeframes: ['1m', '15m', '1h', '4h', '1d'],

    run: function (exchange, pair, view, timeframe) {
        const _exchange = exchange;
        const _pair = pair;
        const priceFeed = _exchange.priceFeed(_pair);
        const ticker = _exchange.ticker(_pair, timeframe);

        view.infoBar(this.name, pair, exchange.name);
        if (!this.suggestedPairs.includes(pair)) {
            console.log('This strategy isn\'t meant to be used with this pair. ' +
                'I hope you know what you\'re doing...');
        }

        priceFeed.on('message', data => {
            if (data.reason === 'filled' && data.price !== undefined) {
                view.priceStream(data.price, data.time);
            }
        });

        ticker.on('close', candle => {
            view.alert('Last candle closed at ' + candle.close);
            view.candle(candle);
        });

        chart.run(ticker, view);
    }
};

module.exports = indicatortest;
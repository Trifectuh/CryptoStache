const Chart = require('gdax-candles');
const tulind = require('tulind');

var macd = {
    candleHistory: {
        open: [],
        close: [],
        high: [],
        low: [],
        volume: []
    },
    currentCandle: null,

    run: function (chart, view) {
        view.alert('macd running!');
        chart.on('close', candle => {
            view.alert('Last candle closed at ' + candle.close);
            view.candle(candle);
            this.addCandleToHistory(candle);
            currentCandle = candle;
            this.checkSignal(this.candleHistory);
        });
    },
    //sma for testing. should be macd or two moving averages.
    checkSignal: function(candleChart){
        var close = candleChart.close;
        tulind.indicators.sma.indicator([this.candleHistory.close], [3], function(err, results) {
            console.log("Result of sma is:");
            console.log(JSON.stringify(results[0]));
        });
    },

    addCandleToHistory: function(candle){
        this.candleHistory.open.push(candle.open);
        this.candleHistory.close.push(candle.close);
        this.candleHistory.high.push(candle.high);
        this.candleHistory.low.push(candle.low);
        this.candleHistory.volume.push(candle.volume);
    }
};

module.exports = macd;
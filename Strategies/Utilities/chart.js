const Chart = require('gdax-candles');

var chart = {
    candleHistory: {
        open: [],
        close: [],
        high: [],
        low: [],
        volume: []
    },
    currentCandle: null,

    run: function (ticker) {
        ticker.on('close', candle => {
            this.addCandleToHistory(candle);
            this.currentCandle = candle;
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

module.exports = chart;
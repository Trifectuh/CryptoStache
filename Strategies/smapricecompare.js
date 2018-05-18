const chart = require('./Utilities/chart.js');
const tulind = require('tulind');
var strategy = {
    name: 'SMA Price Comparison',
    type: 'Simple 9-period SMA/Price comparison',
    suggestedPairs: ['BTC-USD', 'ETH-USD'],
    suggestedTimeframes: ['5s', '1m', '15m', '1h', '4h', '1d'],
    view: null,

    run: function (exchange, pair, view, timeframe) {
        //Set global view to the one passed to run() (for helper functions)
        strategy.view = view;
        // Display strategy info and check that we're using it correctly
        view.infoBar(this.name, pair, exchange.name);
        usageCheck(pair, timeframe);
        // Open constant price feed and send it to the view
        openPriceStream(exchange, pair, view);
        // Turn on candleBuilder for specified timeframe and begin updates
        const candleBuilder = exchange.candleBuilder(pair, timeframe);
        startCandleView(candleBuilder);
        // Initialize variables for tracking trade activity
        let lastBuy = 0;
        let tradeProfit = 0;
        let runProfit = 0;
        // Start recording candle history for charting purposes
        chart.run(candleBuilder);

        // Strategy Description:
        // If the price is above the 9 period SMA, buy. If it's below, sell.
        // Simple test strat using tulip indicators
        candleBuilder.on('close', candle => {
            tulind.indicators.sma.indicator([chart.candleHistory.close], [9], function(err, results) {
                const smaResult = parseFloat(results[0][results[0].length - 1]).toFixed(2);
                if (isNaN(smaResult)){
                    view.indicator('Waiting for data...');
                }
                else {
                    view.indicator("SMA 9: $" + smaResult + '      ');
                    if(candle.close > smaResult){
                        if(lastBuy !== 0 && lastBuy < candle.close){
                            view.status('Holding 1 ETH at $' + lastBuy + ': $' +
                                (candle.close - lastBuy).toFixed(2) + ' unrealized P/L     ');
                        }
                        else{
                            view.status('Bought 1 ETH at $' + candle.close + '         ');
                            lastBuy = candle.close;
                        }
                    }
                    else if(candle.close < smaResult){
                        if(lastBuy !== 0){
                            view.status('Sold 1 ETH at $' + candle.close  + ': $' +
                                (candle.close - lastBuy).toFixed(2) + ' realized P/L     ');
                            tradeProfit = candle.close - lastBuy;
                            view.tradeResult(tradeProfit);
                            runProfit += tradeProfit;
                            view.pandl(runProfit);
                            lastBuy = 0;
                        }
                    }
                }
            });
        });

    }
};

module.exports = strategy;

// Helper functions below
// ----------------------
// Check and warn if this strategy shouldn't be used with this pair/timeframe
function usageCheck(pair, timeframe){
    if (!strategy.suggestedPairs.includes(pair)) {
        strategy.view.alert('This strategy isn\'t meant to be used with this pair');
    }
    if (!strategy.suggestedTimeframes.includes(timeframe)) {
        strategy.view.alert('This strategy isn\'t meant to be used in this timeframe');
    }
}

// Turn on constant price-feed and update view
function openPriceStream(exchange, pair, view) {
    const priceStream = exchange.priceStream(pair);
    priceStream.on('message', data => {
        if (data.reason === 'filled' && data.price !== undefined) {
            var parsedPrice = parseFloat(data.price).toFixed(2);
            strategy.view.priceStream(parsedPrice, data.time);
        }
    });
}

// Send candle data to view on close
function startCandleView(candleBuilder){
    candleBuilder.on('close', candle => {
        strategy.view.candle(candle);
    });
}
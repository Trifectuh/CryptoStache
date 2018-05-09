var test = {
    name: 'test algorithm',
    type: 'bad',
    suggestedPairs: ['BTC-USD', 'ETH-USD'],

    run: function (exchange, pair) {
        console.log('started strategy \'test\' on pair ' + pair + ' at ' + exchange.name);
        if (!test.suggestedPairs.includes(pair)){
            console.log('This strategy isn\'t meant to be used with this pair. ' +
                        'I hope you know what you\'re doing...');
        }
        var _exchange = exchange;
        var feed = _exchange.priceFeed(pair);
        var prevPrice = 0;
        var boughtPrice = 0;
        var soldPrice = 0;
        var profit = 0;

        feed.on('message', data => {
            if (data.reason === 'filled' && data.price !== undefined) {
                if (prevPrice === 0) {
                    prevPrice = data.price;
                }
                if (data.price > prevPrice) {
                    prevPrice = data.price;
                    if (boughtPrice === 0) {
                        boughtPrice = data.price;
                        soldPrice = data.price;
                    }
                    if (boughtPrice < data.price) {
                        console.log('holding position at ' + boughtPrice);
                    }
                    else {
                        console.log('going up! bought at ' + data.price);
                        boughtPrice = data.price;
                    }
                }
                if (data.price < prevPrice) {
                    if (boughtPrice === 0) {
                        prevPrice = data.price;
                    }
                    else {
                        console.log('PANIC! sold at ' + data.price);
                        prevPrice = data.price;
                        soldPrice = data.price;
                        profit = profit + (soldPrice - boughtPrice);
                        console.log('made ' + (soldPrice - boughtPrice) + ' USD on that one dawg.');
                        console.log('profit this run: ' + profit);
                        boughtPrice = 0;
                    }
                }
                console.log(data.price);
            }
        })
    }
};

module.exports = test;
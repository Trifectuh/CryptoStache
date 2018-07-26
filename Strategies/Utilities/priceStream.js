var priceStream = {
    start: function(exchange, pair, view) {
        const priceStream = exchange.candleBuilder(pair, '1s');
        priceStream.on('close', data => {
            if (data.price !== undefined && data.price !== NaN && data.price !== null) {
                var parsedPrice = parseFloat(data.price).toFixed(2);
                view.priceStream(parsedPrice, data.timestamp.toLocaleTimeString() +
                    ' ' + data.timestamp.getMonth() + '/' + data.timestamp.getDate() +
                    '/' + data.timestamp.getFullYear());
            }
        });
    }
};

module.exports = priceStream;
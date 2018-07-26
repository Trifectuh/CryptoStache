var trade = {
    placeBuyOrder: function(exchange, price, size, pair) {
        exchange.buy(price, size, pair);
    },

    placeSellOrder: function(exchange, price, size, pair) {
        exchange.sell(price, size, pair);
    }
}

module.exports = trade;
const readline = require('readline');
// const asciichart = require('asciichart');

var view = {
    infoBar: function(strategy, pair, exchange) {
        readline.cursorTo(process.stdout, 0, 8);
        process.stdout.write('Strategy: ' + strategy);
        readline.cursorTo(process.stdout, 35, 8);
        process.stdout.write('Pair: ' + pair);
        readline.cursorTo(process.stdout, 52, 8);
        process.stdout.write('Exchange: ' + exchange);
    },

    priceStream: function(price, timestamp) {
        readline.cursorTo(process.stdout, 77, 8);
        process.stdout.write('Current price: $' + price + '       ' + timestamp);
    },

    alert: function(alert) {
        readline.cursorTo(process.stdout, 0, 11);
        process.stdout.write('Alerts: ' + alert);
    },

    status: function(status) {
        readline.cursorTo(process.stdout, 0, 10);
        process.stdout.write('Current Trade: ' + status);
    },

    tradeResult: function(res) {
        readline.cursorTo(process.stdout, 77, 11);
        process.stdout.write('Last Trade P/L: $' + res.toFixed(2));
    },

    pandl: function(profit) {
        readline.cursorTo(process.stdout, 77, 10);
        process.stdout.write('Profit/Loss: $' + profit.toFixed(2));
    },

    populateUI: function() {
        readline.clearScreenDown(process.stdout);
        readline.cursorTo(process.stdout, 0, 0);
        process.stdout.write('-------------------------------------------------------------------------------------------------------------------------------------');
        readline.cursorTo(process.stdout, 0, 1);
        process.stdout.write(' oooooooo8                                       o8                oooooooo8    o8                           oooo                    ');
        readline.cursorTo(process.stdout, 0, 2);
        process.stdout.write('o888     88 oo oooooo   oooo   oooo ooooooooo   o888oo   ooooooo   888         o888oo   ooooooo     ooooooo    888ooooo    ooooooooo8');
        readline.cursorTo(process.stdout, 0, 3);
        process.stdout.write('888          888    888  888   888   888    888  888   888     888  888oooooo   888     ooooo888  888     888  888   888  888oooooo8 ');
        readline.cursorTo(process.stdout, 0, 4);
        process.stdout.write('888o     oo  888          888 888    888    888  888   888     888         888  888   888    888  888          888   888  888        ');
        readline.cursorTo(process.stdout, 0, 5);
        process.stdout.write(' 888oooo88  o888o           8888     888ooo88     888o   88ooo88   o88oooo888    888o  88ooo88 8o   88ooo888  o888o o888o   88oooo888');
        readline.cursorTo(process.stdout, 0, 6);
        process.stdout.write('                         o8o888     o888                                                                                             ');
        readline.cursorTo(process.stdout, 0, 7);
        process.stdout.write('-------------------------------------------------------------------------------------------------------------------------------------');
        readline.cursorTo(process.stdout, 0, 8);
        process.stdout.write('Strategy:                          Pair:            Exchange:     ');
        readline.cursorTo(process.stdout, 77, 8);
        process.stdout.write('Current price: $$$$$$$$$$$$  $$$$$$$$$$$$$$$$$$$$$$$$$$$');
        readline.cursorTo(process.stdout, 0, 9);
        process.stdout.write('-------------------------------------------------------------------------------------------------------------------------------------');
        readline.cursorTo(process.stdout, 0, 10);
        process.stdout.write('Current Trade:     ');
        readline.cursorTo(process.stdout, 77, 10);
        process.stdout.write('Profit/Loss:     ');
        readline.cursorTo(process.stdout, 77, 11);
        process.stdout.write('Last Trade P/L:     ');
        readline.cursorTo(process.stdout, 0, 11);
        process.stdout.write('Alerts:     ');
        readline.cursorTo(process.stdout, 0, 12);
        process.stdout.write('-------------------------------------------------------------------------------------------------------------------------------------');
        readline.cursorTo(process.stdout, 0, 13);
        process.stdout.write('Most recent candle: ');
        readline.cursorTo(process.stdout, 0, 14);
        process.stdout.write('Indicator Info: ');
    },

    candle: function(candle) {
        readline.cursorTo(process.stdout, 0, 13);
        process.stdout.write('Most recent candle: Open: ' + JSON.stringify(candle.open) +
            '   Close: ' + JSON.stringify(candle.close) +
            '   High: ' + JSON.stringify(candle.high) +
            '   Low: ' + JSON.stringify(candle.low) +
            '   Volume: ' + JSON.stringify(candle.volume) + '                           ');
    },

    indicator: function(message) {
        readline.cursorTo(process.stdout, 0, 14);
        process.stdout.write('Indicator Info: ' + message);
    },

    /*  chart: function(pricedata){
            readline.cursorTo(process.stdout, 0, 16);
            if(pricedata.length < 3){
                process.stdout.write('Waiting for chart data...');
            }
            // Hacky workaround for when the first few entries are identical:
            else if(pricedata.length == 3){
                pricedata[0] -= 0.01;
                process.stdout.write(asciichart.plot(pricedata, { height: 6 }));
            }
            else if(pricedata.length <= 116){
                process.stdout.write(asciichart.plot(pricedata, { height: 6 }));
            }
            else process.stdout.write(asciichart.plot(pricedata.slice(pricedata.length-116, pricedata.length-1),
                    { height: 6 }));
            }
    */

};

module.exports = view;
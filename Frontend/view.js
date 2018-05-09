const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var view = {
    infoBar: function(strategy, pair, exchange) {
        console.log('Strategy: ' + strategy +
            '    Pair: ' + pair +
            '    Exchange: ' + exchange);
    },

    priceStream: function(price, timestamp) {
        console.log(price + '        ' +
            timestamp);
    },

    alert: function(alert) {
        console.log(alert);
    },

    status: function(status) {
        console.log(status);
    },

    tradeResult: function(res) {
        console.log('You made ' + res + ' on that one dawg.');
    },

    pandl: function(profit) {
        console.log('P/L this run: ' + profit);
    }
    
    powerlogo: function() {
        console.log(" oooooooo8                                       o8                oooooooo8    o8                           oooo                    ");
        console.log("o888     88 oo oooooo   oooo   oooo ooooooooo   o888oo   ooooooo   888         o888oo   ooooooo     ooooooo    888ooooo    ooooooooo8"); 
        console.log("888          888    888  888   888   888    888  888   888     888  888oooooo   888     ooooo888  888     888  888   888  888oooooo8 "); 
        console.log("888o     oo  888          888 888    888    888  888   888     888         888  888   888    888  888          888   888  888        "); 
        console.log(" 888oooo88  o888o           8888     888ooo88     888o   88ooo88   o88oooo888    888o  88ooo88 8o   88ooo888  o888o o888o   88oooo888"); 
        console.log("                         o8o888     o888                                                                                             ");
    }
};

module.exports = view;

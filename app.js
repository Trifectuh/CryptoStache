const gdax = require('./Exchanges/gdax.js');

var ethFeed = gdax.priceFeed('ETH-USD');
var prevPrice = 0;
var boughtPrice = 0;
var soldPrice = 0;
var profit = 0;

//mock algo to see if this actually works.
ethFeed.on('message', data => {
    if(data.reason === 'filled' && data.price !== undefined){
        if (prevPrice === 0){
            prevPrice = data.price;
        }
        if (data.price > prevPrice){
            prevPrice = data.price;
            if (boughtPrice === 0)
            {
                boughtPrice = data.price;
                soldPrice = data.price;
            }
            if(boughtPrice < data.price){
                console.log('holding position at ' + boughtPrice);
            }
            else{
                console.log('going up! bought at ' + data.price);
                boughtPrice = data.price;
            }
        }
        if (data.price < prevPrice){
            if(boughtPrice === 0){
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
});
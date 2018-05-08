const gdax = require('./Exchanges/gdax.js');

var newSocket = gdax.socket;

newSocket.on('message', data => {
    if(data.reason === 'filled' && data.price !== undefined){
        console.log(data.price);
    }
});
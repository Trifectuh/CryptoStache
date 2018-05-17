// import exchanges and strategies
const exchanges = require('./Exchanges/exchanges.js');
const strategies = require('./Strategies/strategies.js');
const view = require('./Frontend/view.js');
const fs = require('fs');

// set configuration for this run.
// these should be set by command-line arguments in the future
var configContents = fs.readFileSync("config.json");
var config = JSON.parse(configContents);
/*const config = {
    exchange: exchanges.gdax,
    pair: 'ETH-USD',
    strategy: strategies.indicatortest,
    timeframe: '5s',
};*/
// populate the UI with all the stuff we wanna look at
view.populateUI();
// run the strategy on the exchange for chosen pair
strategies[config.strategy].run(exchanges[config.exchange], config.pair, view, config.timeframe);


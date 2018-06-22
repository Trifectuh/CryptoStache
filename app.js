// import exchanges and strategies
const exchanges = require('./Exchanges/exchanges.js');
const strategies = require('./Strategies/strategies.js');

const view = require('./Frontend/view.js');
const fs = require('fs');

// set configuration for this run based on config.json
const configContents = fs.readFileSync("config.json");
const config = JSON.parse(configContents);

// populate the UI with all the stuff we wanna look at
view.populateUI();
// run the strategy on the exchange for chosen pair
strategies[config.strategy].run(exchanges[config.exchange], config.pair, view, config.timeframe);
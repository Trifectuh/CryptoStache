// import exchanges and strategies
const exchanges = require('./Exchanges/exchanges.js');
const strategies = require('./Strategies/strategies.js');

// set configuration for this run.
// these should be set by command-line arguments in the future
const config = {
    exchange: exchanges.gdax,
    pair: 'ETH-USD',
    strategy: strategies.test
};

// run the strategy on the exchange for chosen pair
config.strategy.run(config.exchange, config.pair);


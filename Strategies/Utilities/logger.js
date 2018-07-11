const { createLogger, format } = require('winston');
const { combine, timestamp } = format;

const logger = createLogger({
    levels: {
        error: 0,
        loss: 1,
        gain: 2,
        status: 3
    },
    transports: [
        new winston.transports.File({filename: test.log})
    ],
    format: combine(
        winston.format.json,
        timestamp()
    ),
})
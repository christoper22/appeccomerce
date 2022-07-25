const winston = require('winston');
const { combine, timestamp, label, prettyPrint } = winston.format;

const logger = winston.createLogger({
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        prettyPrint()
    ),
    level: 'info',
    defaultMeta: { service: 'order-service' },
    transports: [
      new winston.transports.File({ filename: 'error/error.log', level: 'error' }),
    ],
});
module.exports = logger
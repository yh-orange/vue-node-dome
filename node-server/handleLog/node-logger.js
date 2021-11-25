'use strict';

/**
 * Created by yinhu on 2021/11/25.
 */
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const customFormat = printf((info) => {
    let { message } = info;
    if (typeof message === 'object') {
        let cache = [];
        message = JSON.stringify(message, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Duplicate reference found
                    try {
                        // If this value does not reference a parent it can be deduped
                        return JSON.parse(JSON.stringify(value));
                    } catch (error) {
                        // discard key if value cannot be deduped
                        return undefined;
                    }
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
        cache = [];
    }
    return `> ${info.timestamp} ${info.level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        format.colorize(),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        customFormat,
    ),
    transports: [new transports.Console()],
});

module.exports = logger;
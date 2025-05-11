const winston = require('winston')
const { combine, timestamp, printf } = winston.format
const logLocation = require('app-root-path').resolve('/logs')

// meta param is ensured by splat()
const myFormat = printf(({timestamp, level, message}) => {
  return `{'${timestamp} [${level}]' : '${message}'}`
})

const options = {
  file_info: {
    level: 'info',
    handleExceptions: false,
    filename: logLocation + '/info/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    json: true,
    format: combine(timestamp(), myFormat),
    colorize: false,
    maxFiles: '14d',
    zippedArchive: true
  },
  file_error: {
    level: 'error',
    handleExceptions: true,
    filename: logLocation + '/error/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    json: true,
    format: combine(timestamp(), myFormat),
    colorize: false,
    maxFiles: '14d',
    zippedArchive: true
  }
}

const DailyRotateFile = require('winston-daily-rotate-file')

const logger_info = winston.createLogger({
  transports: [
    new DailyRotateFile(options.file_info)
  ]
})

const logger_error = winston.createLogger({
  transports: [
    new DailyRotateFile(options.file_error)
  ]
})

module.exports.logger_info = logger_info.info
module.exports.logger_error = logger_error.error

import fs from 'fs-extra';
import path from 'path';

class Logger {
    constructor() {
        this.logDir = path.join(process.cwd(), '.mbs', 'logs');
        this.logFile = path.join(this.logDir, 'mbs.log');
        this.ensureLogDir();
    }

    async ensureLogDir() {
        await fs.ensureDir(this.logDir);
    }

    formatMessage(level, message, data = null) {
        const timestamp = new Date().toISOString();
        let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

        if (data) {
            logMessage += `\nData: ${JSON.stringify(data, null, 2)}`;
        }

        return logMessage + '\n';
    }

    async writeLog(level, message, data = null) {
        const formattedMessage = this.formatMessage(level, message, data);
        await fs.appendFile(this.logFile, formattedMessage);
    }

    info(message, data = null) {
        this.writeLog('info', message, data);
    }

    error(message, data = null) {
        this.writeLog('error', message, data);
    }

    warn(message, data = null) {
        this.writeLog('warn', message, data);
    }

    debug(message, data = null) {
        this.writeLog('debug', message, data);
    }
}

export const logger = new Logger();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
const logger_1 = require("./shared/logger");
process.on('uncaughtException', error => {
    logger_1.errorLogger.error(error);
    process.exit(1);
});
let server;
async function main() {
    try {
        await mongoose_1.default.connect(index_1.default.database_url);
        logger_1.logger.info(`Database is connected successfully`);
        server = app_1.default.listen(index_1.default.port, () => {
            logger_1.logger.info(`Example app listening on port ${index_1.default.port}`);
        });
    }
    catch (err) {
        logger_1.errorLogger.error(`failed to connect database ${err.message}`);
    }
    process.on('unhandledRejection', error => {
        // eslint-disable-next-line no-console
        console.log('Unhandled Rejection is detected, we are closing our server.....');
        if (server) {
            server.close(() => {
                logger_1.errorLogger.error('Failed to connect database', error);
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
}
main();
process.on('SIGTERM', () => {
    logger_1.logger.info('SIGTERM is received');
    if (server) {
        server.close();
    }
});

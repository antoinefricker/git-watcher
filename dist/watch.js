#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./constants");
const GitWhiner_1 = require("./helpers/GitWhiner");
const ServiceManager_1 = require("./helpers/ServiceManager");
ServiceManager_1.serviceManager.verbose = true;
const arnaudTilbian = new GitWhiner_1.GitWhiner();
const emergency = arnaudTilbian.evaluateEmergencyLevel();
ServiceManager_1.serviceManager.log(`Write emergency level to: ${emergency.toFixed(0)}`);
fs_1.default.writeFile(constants_1.LOG_FILEPATH, emergency.toFixed(0), (err) => {
    if (err) {
        ServiceManager_1.serviceManager.exitWithError(`Error writing to log file: ${err}`);
    }
});
//# sourceMappingURL=watch.js.map
#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./constants");
const ServiceManager_1 = require("./helpers/ServiceManager");
const ArduinoPortSelector_1 = require("./helpers/ArduinoPortSelector");
const SerialPortManager_1 = require("./helpers/SerialPortManager");
let serialportManager;
const main = async () => {
    ServiceManager_1.serviceManager.verbose = true;
    ServiceManager_1.serviceManager.neverStop();
    const portPath = await ArduinoPortSelector_1.ArduinoPortSelector.getArduinoPort();
    ServiceManager_1.serviceManager.log(`Selected port: ${portPath}`);
    serialportManager = new SerialPortManager_1.SerialPortManager();
    serialportManager.openPort(portPath);
    update();
};
const update = () => {
    fs_1.default.readFile(constants_1.LOG_FILEPATH, 'utf8', (err, data) => {
        if (err) {
            ServiceManager_1.serviceManager.error('Unable to readfile', err);
            return;
        }
        const emergency = parseInt(data);
        ServiceManager_1.serviceManager.log(`Update arduino monitor | emergency: ${emergency}`);
        sendData({ emergency: parseInt(data) });
    });
    setTimeout(update, 2000);
};
const sendData = ({ emergency }) => {
    serialportManager.write(emergency.toFixed(0));
};
main();
//# sourceMappingURL=monitor.js.map
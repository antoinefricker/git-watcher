#!/usr/bin/env node

import fs from 'fs';

import { LOG_FILEPATH } from './constants';
import { serviceManager } from './helpers/ServiceManager';
import { ArduinoPortSelector } from './helpers/ArduinoPortSelector';
import { SerialPortManager } from './helpers/SerialPortManager';

let serialportManager: SerialPortManager;

const main = async () => {
    serviceManager.verbose = true;
    serviceManager.neverStop();

    const portPath = await ArduinoPortSelector.getArduinoPort();
    serviceManager.log(`Selected port: ${portPath}`);

    serialportManager = new SerialPortManager();
    serialportManager.openPort(portPath);
    update();
};

const update = (): void => {
    fs.readFile(LOG_FILEPATH, 'utf8', (err, data) => {
        if (err) {
            serviceManager.error('Unable to readfile', err);
            return;
        }

        const emergency = parseInt(data);
        serviceManager.log(`Update arduino monitor | emergency: ${emergency}`);

        sendData({ emergency });
    });
    setTimeout(update, 2000);
};

const sendData = ({ emergency }: { emergency: number }): void => {
    serialportManager.write(emergency.toFixed(0));
};

main();

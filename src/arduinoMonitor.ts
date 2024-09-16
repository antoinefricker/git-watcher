import { SerialPort } from 'serialport';
import inquirer from 'inquirer';
import fs from 'fs';

import { LOG_FILEPATH } from './constants';

let _port: SerialPort;
let verbose = false;

process.argv.forEach(function (val, index) {
    if (val === '--verbose') {
        verbose = true;
    }
});

const listArduinoPorts = async (): Promise<void> => {
    const ports = await SerialPort.list();

    const arduinoManufacturerRegEx = /Arduino/i;
    const arduinoPorts = ports.filter((port) =>
        arduinoManufacturerRegEx.test(port.manufacturer),
    );
    askPortPath(arduinoPorts.map((port) => port.path));
};

const askPortPath = async (arduinoPortPaths: string[]): Promise<void> => {
    if (arduinoPortPaths.length === 0) {
        console.error('No arduino ports found');
        return;
    }

    inquirer
        .prompt({
            type: 'list',
            name: 'portPath',
            message: 'Please enter the path to the arduino port: ',
            choices: arduinoPortPaths,
        })
        .then((answers) => {
            setPortPath(answers.portPath);
        })
        .catch((error) => {
            console.error(
                error.isTtyError
                    ? "Prompt couldn't be rendered in the current environment"
                    : 'Unable to retrieve Arduino port answer',
            );
        });
};

const setPortPath = (portPath: string): void => {
    if (verbose) {
        console.log(`Setting port path to: ${portPath}`);
    }
    _port = new SerialPort({
        path: portPath,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        baudRate: 9600,
        autoOpen: false,
    });
    _port.on('open', async (error) => {
        if (error) {
            console.error('Error while opening port', error);
            return;
        }
        update();
    });
    update();
};

const update = (): void => {
    if (verbose) {
        console.log('Update arduino monitor');
    }
    fs.readFile(LOG_FILEPATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const emergency = parseInt(data);
        if (verbose) {
            console.log(`Reading from log file: emergency: ${emergency}`);
        }
        sendData({ emergency: parseInt(data) });
    });
    setTimeout(update, 2000);
};

const sendData = ({ emergency }: SerialData): void => {
    _port.write(emergency.toFixed(0));
};

type SerialData = {
    emergency: number;
};

listArduinoPorts();

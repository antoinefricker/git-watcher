import { SerialPort } from 'serialport';
import inquirer from 'inquirer';
import { serviceManager } from './ServiceManager';

export class ArduinoPortSelector {
    static async getArduinoPort(): Promise<string> {
        const ports = await SerialPort.list();

        const arduinoManufacturerRegEx = /Arduino/i;
        const arduinoPorts = ports.filter((port) =>
            arduinoManufacturerRegEx.test(port.manufacturer),
        );

        const arduinoPortPaths = arduinoPorts.map((port) => port.path);

        if (arduinoPortPaths.length === 0) {
            serviceManager.exitWithError('No arduino ports found');
        }

        if (arduinoPortPaths.length === 1) {
            return Promise.resolve(arduinoPortPaths[0]);
        }

        inquirer
            .prompt({
                type: 'list',
                name: 'portPath',
                message: 'Please select the path to the Arduino port: ',
                choices: arduinoPortPaths,
            })
            .then((answer) => {
                return answer.portPath;
            })
            .catch((error) => {
                serviceManager.exitWithError(
                    error.isTtyError
                        ? "CLI prompt couldn't be rendered in the current environment"
                        : 'Unable to retrieve Arduino port answer',
                );
            });
    }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArduinoPortSelector = void 0;
const serialport_1 = require("serialport");
const inquirer_1 = __importDefault(require("inquirer"));
const ServiceManager_1 = require("./ServiceManager");
class ArduinoPortSelector {
    static async getArduinoPort() {
        const ports = await serialport_1.SerialPort.list();
        const arduinoManufacturerRegEx = /Arduino/i;
        const arduinoPorts = ports.filter((port) => arduinoManufacturerRegEx.test(port.manufacturer));
        const arduinoPortPaths = arduinoPorts.map((port) => port.path);
        if (arduinoPortPaths.length === 0) {
            ServiceManager_1.serviceManager.exitWithError('No arduino ports found');
        }
        if (arduinoPortPaths.length === 1) {
            return Promise.resolve(arduinoPortPaths[0]);
        }
        inquirer_1.default
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
            ServiceManager_1.serviceManager.exitWithError(error.isTtyError
                ? "CLI prompt couldn't be rendered in the current environment"
                : 'Unable to retrieve Arduino port answer');
        });
    }
}
exports.ArduinoPortSelector = ArduinoPortSelector;
//# sourceMappingURL=ArduinoPortSelector.js.map
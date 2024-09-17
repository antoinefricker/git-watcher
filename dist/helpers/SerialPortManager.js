"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerialPortManager = void 0;
const serialport_1 = require("serialport");
const ServiceManager_1 = require("./ServiceManager");
class SerialPortManager {
    _port;
    constructor() { }
    openPort(portPath) {
        this._port = new serialport_1.SerialPort({
            path: portPath,
            dataBits: 8,
            parity: 'none',
            stopBits: 1,
            baudRate: 9600,
            autoOpen: false,
        });
        this._port.on('open', async (error) => {
            if (error) {
                ServiceManager_1.serviceManager.error('Error while opening port', error);
                return;
            }
        });
    }
    write(data) {
        this._port.write(data, (error) => {
            if (error) {
                ServiceManager_1.serviceManager.error('Error while writing to port', error);
            }
        });
    }
}
exports.SerialPortManager = SerialPortManager;
//# sourceMappingURL=SerialPortManager.js.map
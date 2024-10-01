import { SerialPort } from 'serialport';
import { serviceManager } from './ServiceManager';

export class SerialPortManager {
    private _port: SerialPort;
    constructor() {}

    openPort(portPath: string): void {
        this._port = new SerialPort({
            path: portPath,
            dataBits: 8,
            parity: 'none',
            stopBits: 1,
            baudRate: 9600,
            autoOpen: true,
        });
        this._port.on('open', async (error) => {
            if (error) {
                serviceManager.error('Error while opening port', error);
                return;
            }
        });
    }

    write(data: string): void {
        this._port.write(data, (error) => {
            if (error) {
                serviceManager.error('Error while writing to port', error);
            }
        });
    }
}

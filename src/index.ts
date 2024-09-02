import { GitWhiner } from './GitWhiner';
import { ReadlineParser, SerialPort } from 'serialport';

const main = async () => {
    const arnaud = new GitWhiner();
    arnaud.update();

    await SerialPort.list().then((ports) => {
        const arduinoManufacturerRegEx = /Arduino/i;
        console.log(
            'ports',
            ports.filter((port) =>
                arduinoManufacturerRegEx.test(port.manufacturer),
            ),
        );
    });

    const port = new SerialPort({
        path: '/dev/ttyACM0',
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        baudRate: 9600,
        autoOpen: false,
    });
    port.on('open', async (error) => {
        if (error) {
            console.error('Error while opening port', error);

            return;
        }
    });

    const parser = new ReadlineParser({ delimiter: '\n' });
    parser.on('data', (data) => {
        data = data.trim();
        console.log('arduino>', data);
        if (data === 'pingback') {
            port.write(arnaud.emergency.toFixed(0));
        }
    });
    port.pipe(parser);

    port.open();
};

main();

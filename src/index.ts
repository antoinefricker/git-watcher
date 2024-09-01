import { GitWhiner } from './GitWhiner';
import { ReadlineParser, SerialPort } from 'serialport';

const main = async () => {
    const arnaud = new GitWhiner();
    arnaud.update();

    const port = new SerialPort({
        path: '/dev/ttyACM1',
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        baudRate: 9600,
        autoOpen: false,
    });
    port.on('open', (error) => {
        if (error) {
            console.error('Error while opening port', error);
            return;
        }
        const value = Math.floor(Math.random() * 11);
        port.write(value.toFixed(0));
        console.log(`Sending "${value}" to Arduino`);
    });

    const parser = new ReadlineParser();
    parser.on('data', console.log);
    port.pipe(parser);

    port.open();
};

main();

import fs from 'fs';
import { LOG_FILEPATH } from './constants';
import { GitProxy } from './GitProxy';

const gitProxy = new GitProxy();
const { files, insertions, deletions } = gitProxy.getDiffShortstat();

let emergency = 0;
emergency += Math.floor(files / 4);
emergency += Math.floor(insertions / 35);
emergency += Math.floor(deletions / 45);
emergency = Math.min(10, emergency);

console.log(`Write emergency level to: ${emergency.toFixed(0)}`);

fs.writeFile(LOG_FILEPATH, emergency.toFixed(0), (err) => {
    if (err) {
        console.error(`Error writing to log file: ${err}`);
    }
});

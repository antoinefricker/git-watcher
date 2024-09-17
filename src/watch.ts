#!/usr/bin/env node

import fs from 'fs';
import { LOG_FILEPATH } from './constants';
import { GitWhiner } from './helpers/GitWhiner';
import { serviceManager } from './helpers/ServiceManager';

serviceManager.verbose = true;

const arnaudTilbian = new GitWhiner();
const emergency = arnaudTilbian.evaluateEmergencyLevel();

serviceManager.log(`Write emergency level to: ${emergency.toFixed(0)}`);
fs.writeFile(LOG_FILEPATH, emergency.toFixed(0), (err) => {
    if (err) {
        serviceManager.exitWithError(`Error writing to log file: ${err}`);
    }
});

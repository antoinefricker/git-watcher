"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceManager = void 0;
const DEFAULT_VERBOSE = false;
class ServiceManager {
    _verbose = DEFAULT_VERBOSE;
    constructor() { }
    exitWithError(message) {
        console.error(message);
        process.exit(1);
    }
    log(message) {
        if (this._verbose) {
            console.log(message);
        }
    }
    error(message, error) {
        console.error(message, error);
    }
    neverStop() {
        process.stdin.resume();
    }
    set verbose(value) {
        this._verbose = value;
    }
    defineVerboseFromArgv() {
        console.log(process.argv);
        process.argv.forEach((value) => {
            if (value === '--verbose') {
                this._verbose = true;
            }
        });
        this._verbose = false;
    }
}
exports.serviceManager = new ServiceManager();
//# sourceMappingURL=ServiceManager.js.map
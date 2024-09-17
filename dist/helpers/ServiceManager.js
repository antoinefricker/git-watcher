"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceManager = void 0;
const DEFAULT_VERBOSE = false;
class ServiceManager {
    verbose = DEFAULT_VERBOSE;
    constructor() { }
    exitWithError(message) {
        console.error(message);
        process.exit(1);
    }
    log(message) {
        if (this.verbose) {
            console.log(message);
        }
    }
    error(message, error) {
        console.error(message, error);
    }
    neverStop() {
        process.stdin.resume();
    }
    defineVerbose() {
        process.argv.forEach(function (value) {
            if (value === '--verbose') {
                this.verbose = true;
                return;
            }
        });
        this.verbose = false;
    }
}
exports.serviceManager = new ServiceManager();
//# sourceMappingURL=ServiceManager.js.map
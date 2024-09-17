const DEFAULT_VERBOSE = false;

class ServiceManager {
    private _verbose: boolean = DEFAULT_VERBOSE;

    constructor() {}

    exitWithError(message: string): void {
        console.error(message);
        process.exit(1);
    }

    log(message: string): void {
        if (this._verbose) {
            console.log(message);
        }
    }

    error(message: string, error: Error): void {
        console.error(message, error);
    }

    neverStop(): void {
        process.stdin.resume();
    }

    set verbose(value: boolean) {
        this._verbose = value;
    }

    defineVerboseFromArgv(): void {
        console.log(process.argv);
        process.argv.forEach((value) => {
            if (value === '--verbose') {
                this._verbose = true;
            }
        });
        this._verbose = false;
    }
}

export const serviceManager = new ServiceManager();

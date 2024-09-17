declare class ServiceManager {
    private _verbose;
    constructor();
    exitWithError(message: string): void;
    log(message: string): void;
    error(message: string, error: Error): void;
    neverStop(): void;
    set verbose(value: boolean);
    defineVerboseFromArgv(): void;
}
export declare const serviceManager: ServiceManager;
export {};
//# sourceMappingURL=ServiceManager.d.ts.map
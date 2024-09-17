declare class ServiceManager {
    private verbose;
    constructor();
    exitWithError(message: string): void;
    log(message: string): void;
    error(message: string, error: Error): void;
    neverStop(): void;
    defineVerbose(): void;
}
export declare const serviceManager: ServiceManager;
export {};
//# sourceMappingURL=ServiceManager.d.ts.map
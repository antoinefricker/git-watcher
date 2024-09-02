import { DiffShortstatData, GitProxy } from './GitProxy';
import shell from 'shelljs';

export class GitWhiner {
    private gitProxy: GitProxy;

    private _emergency: number = 0;

    constructor() {
        this.gitProxy = new GitProxy();
    }

    update(): void {
        const diffShortStats = this.gitProxy.getDiffShortstat();
        this.evaluate(diffShortStats);
    }
    evaluate({ files, insertions, deletions }: DiffShortstatData): void {
        let emergency = 0;
        emergency += Math.floor(files / 4);
        emergency += Math.floor(insertions / 35);
        emergency += Math.floor(deletions / 45);
        emergency = Math.min(10, emergency);
        console.log(`emergency: ${emergency}`);

        this._emergency = emergency;
    }

    get emergency(): number {
        return this._emergency;
    }
}

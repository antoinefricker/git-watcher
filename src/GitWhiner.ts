import { DiffShortstatData, GitProxy } from './GitProxy';
import shell from 'shelljs';

export class GitWhiner {
    private gitProxy: GitProxy;

    constructor() {
        this.gitProxy = new GitProxy();
    }

    update(): void {
        const diffShortStats = this.gitProxy.getDiffShortstat();
        this.evaluate(diffShortStats);
    }
    evaluate({ files, insertions, deletions }: DiffShortstatData): void {
        shell.echo(`Arnaud complains that ${files} files have been changed`);
        shell.echo(
            `Arnaud whines about the ${insertions} lines that have been added`,
        );
        shell.echo(`Arnaud accepts that ${deletions} lines have been removed`);
    }
}

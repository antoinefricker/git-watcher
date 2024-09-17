import shell from 'shelljs';
import { serviceManager } from './ServiceManager';

export class GitWhiner {
    constructor() {
        this.checkGitSupport();
    }

    evaluateEmergencyLevel() {
        const diffShortstat: DiffShortstatData = this.getDiffShortstat();
        let emergency = 0;
        emergency += Math.floor(diffShortstat.files / 4);
        emergency += Math.floor(diffShortstat.insertions / 35);
        emergency += Math.floor(diffShortstat.deletions / 45);
        return Math.min(10, emergency);
    }

    private checkGitSupport() {
        if (!shell.which('git')) {
            serviceManager.exitWithError('Service requires git');
            shell.exit(1);
        }
    }

    private getDiffShortstat(): DiffShortstatData {
        const rawDiff = shell.exec('git diff --shortstat', {
            silent: !serviceManager.verbose,
        }).stdout;
        console.log('rawDiff', rawDiff);
        const [files = 0, insertions = 0, deletions = 0] = rawDiff
            .split(',')
            .map((x: string) => parseInt(x))
            .map((x: number) => (isNaN(x) ? 0 : x));

        return { files, insertions, deletions };
    }
}

type DiffShortstatData = {
    files: number;
    insertions: number;
    deletions: number;
};

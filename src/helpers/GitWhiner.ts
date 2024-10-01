import shell from 'shelljs';
import { serviceManager } from './ServiceManager';

export class GitWhiner {
    constructor() {
        this.checkGitSupport();
    }

    evaluateEmergencyLevel() {
        const diffShortstat: DiffShortstatData = this.getDiffShortstat();
        let emergency = 0;
        emergency += diffShortstat.files / 3;
        emergency += diffShortstat.insertions / 35;
        emergency += diffShortstat.deletions / 45;
        return Math.min(10, emergency);
    }

    private checkGitSupport() {
        if (!shell.which('git')) {
            serviceManager.exitWithError('Service requires git');
            shell.exit(1);
        }
    }

    private getCurrentBranch(): string {
        const branch = shell.exec('git rev-parse --abbrev-ref HEAD', {
            silent: !serviceManager.verbose,
        }).stdout;
        return branch.trim();
    }

    private getDiffShortstat(): DiffShortstatData {
        // pushed changes
        const currentBranch = this.getCurrentBranch();

        const pushedRawDiff = shell.exec(
            `git diff main...${currentBranch} --shortstat`,
            {
                silent: !serviceManager.verbose,
            },
        ).stdout;
        const pushedShortstatData = this.parseRawDiff(pushedRawDiff);
        serviceManager.log(
            'pushedShortstatData: ' +
                JSON.stringify(pushedShortstatData, null, 2),
        );

        // unstaged changes
        const unstagedRawDiff = shell.exec('git diff --shortstat', {
            silent: !serviceManager.verbose,
        }).stdout;
        const unstagedShortstatData = this.parseRawDiff(unstagedRawDiff);
        serviceManager.log(
            'unstagedShortstatData: ' +
                JSON.stringify(unstagedShortstatData, null, 2),
        );

        // all changes
        const allShortstatData: DiffShortstatData = {
            files: pushedShortstatData.files + unstagedShortstatData.files,
            insertions:
                pushedShortstatData.insertions +
                unstagedShortstatData.insertions,
            deletions:
                pushedShortstatData.deletions + unstagedShortstatData.deletions,
        };
        serviceManager.log(
            'allShortstatData: ' + JSON.stringify(allShortstatData, null, 2),
        );
        return allShortstatData;
    }

    private parseRawDiff(rawDiff: string): DiffShortstatData {
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

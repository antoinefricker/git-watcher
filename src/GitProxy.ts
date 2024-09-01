import shell from 'shelljs';

export class GitProxy {
    private isSupported: boolean = false;

    constructor() {
        this.isSupported = this.checkGitSupport();
    }

    private checkGitSupport() {
        if (!shell.which('git')) {
            shell.echo('Sorry, this script requires git');
            shell.exit(1);
        }
        return true;
    }

    getDiffShortstat(): DiffShortstatData {
        const rawDiff = shell.exec('git diff --shortstat');

        const [files, insertions, deletions] = rawDiff
            .split(',')
            .map((x: string) => parseInt(x));

        return { files, insertions, deletions };
    }
}

export type DiffShortstatData = {
    files: number;
    insertions: number;
    deletions: number;
};

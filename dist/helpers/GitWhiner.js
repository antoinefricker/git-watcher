"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitWhiner = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
const ServiceManager_1 = require("./ServiceManager");
class GitWhiner {
    constructor() {
        this.checkGitSupport();
    }
    evaluateEmergencyLevel() {
        const diffShortstat = this.getDiffShortstat();
        let emergency = 0;
        emergency += Math.floor(diffShortstat.files / 4);
        emergency += Math.floor(diffShortstat.insertions / 35);
        emergency += Math.floor(diffShortstat.deletions / 45);
        return Math.min(10, emergency);
    }
    checkGitSupport() {
        if (!shelljs_1.default.which('git')) {
            ServiceManager_1.serviceManager.exitWithError('Service requires git');
            shelljs_1.default.exit(1);
        }
    }
    getDiffShortstat() {
        const rawDiff = shelljs_1.default.exec('git diff --shortstat', {
            silent: !ServiceManager_1.serviceManager.verbose,
        }).stdout;
        console.log('rawDiff', rawDiff);
        const [files = 0, insertions = 0, deletions = 0] = rawDiff
            .split(',')
            .map((x) => parseInt(x))
            .map((x) => (isNaN(x) ? 0 : x));
        return { files, insertions, deletions };
    }
}
exports.GitWhiner = GitWhiner;
//# sourceMappingURL=GitWhiner.js.map
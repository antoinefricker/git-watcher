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
        const rawDiff = shelljs_1.default.exec('git diff --shortstat');
        const [files, insertions, deletions] = rawDiff
            .split(',')
            .map((x) => parseInt(x));
        return {
            files: files ?? 0,
            insertions: insertions ?? 0,
            deletions: deletions ?? 0,
        };
    }
}
exports.GitWhiner = GitWhiner;
//# sourceMappingURL=GitWhiner.js.map
import type { Team } from "./Team";

export class Match {

    private startedAt?: number;
    private finishedAt?: number;

    constructor(
        public id: string | number,
        public homeTeam: Team,
        public awayTeam: Team
    ) {}

    start(timestamp: number) {
        if (this.startedAt || this.finishedAt) {
            return;
        }

        this.startedAt = timestamp;
    }

    finish(timestamp: number) {
        if (!this.startedAt || this.finishedAt) {
            return;
        }

        this.finishedAt = timestamp;
    }

    isOngoing () {
        return !!this.startedAt && !this.finishedAt;
    }

    isFinished () {
        return !!this.startedAt && !!this.finishedAt;
    }

    whenStarted () {
        return this.startedAt;
    }

    whenFinished () {
        return this.finishedAt;
    }
}
import { EventEmitter } from "node:events";
import type { Match } from "./Match";
import type { IClock } from "./interfaces/IClock";
import type { IMatchRepository, UpdateParams } from "./interfaces/IMatchRepository";
import { InMemoryStorage } from "../adapters/InMemoryStorage";
import { RankStrategy } from "../adapters/RankStrategy";
import type { IRankStrategy } from "./interfaces/IRankStrategy";

interface ScoreboardEvents {
    matchStarted: (match: Match) => void;
    matchFinished: (matchId: string | number) => void;
    updatedScore: (matchId: string | number, params: Required<UpdateParams>) => void;
}

export interface Scoreboard {
    on<K extends keyof ScoreboardEvents>(eventName: K, listener: ScoreboardEvents[K]): this;
    off<K extends keyof ScoreboardEvents>(eventName: K, listener: ScoreboardEvents[K]): this;
    emit<K extends keyof ScoreboardEvents>(eventName: K, ...args: Parameters<ScoreboardEvents[K]>): boolean;
}

export class Scoreboard extends EventEmitter {

    constructor (
        private clock: IClock = Date,
        private storage: IMatchRepository = new InMemoryStorage()
    ) {
        super();
    }

    startNewMatch (match: Match) {
        try {
            const exists = this.storage.findById(match.id);
            if (exists && exists.isOngoing() && !exists.isFinished()) {
                throw new Error('Match already exists and started');
            }
        } catch {}


        match.start(this.clock.now());
        this.storage.save(match);
        
        this.emit('matchStarted', match);
    }

    updateScore (matchId: string | number, params: Required<UpdateParams>) {
        this.storage.update(matchId, params);
        this.emit('updatedScore', matchId, params);
    }

    finish (matchId: string | number) {
        const match = this.storage.findById(matchId);
        match.finish(this.clock.now());
        this.storage.delete(matchId);
        this.emit('matchFinished', matchId);
    }

    getSummary (strategy: IRankStrategy = new RankStrategy()) {
        const matches = this.storage.findAll().filter(match => {
            if (match.isFinished()) {
                this.storage.delete(match.id);
                return false;
            }

            return true;
        });

        return strategy.getSummary(matches);
    }
}
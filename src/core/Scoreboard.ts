import { EventEmitter } from "node:events";
import type { Match } from "./Match";
import type { IClock } from "./interfaces/IClock";
import type { IMatchRepository, UpdateParams } from "./interfaces/IMatchRepository";
import { InMemoryStorage } from "../adapters/InMemoryStorage";
import { RankStrategy } from "../adapters/RankStrategy";
import type { IRankStrategy } from "./interfaces/IRankStrategy";

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
    }

    updateScore (matchId: string | number, params: Required<UpdateParams>) {
        this.storage.update(matchId, params);
    }

    finish (matchId: string | number) {
        const match = this.storage.findById(matchId);
        match.finish(this.clock.now());
        this.storage.delete(matchId);
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
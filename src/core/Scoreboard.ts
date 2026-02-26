import { EventEmitter } from "node:events";
import type { Match } from "./Match";
import type { IClock } from "./interfaces/IClock";
import { IMatchRepository } from "./interfaces/MatchRepository";
import { InMemoryStorage } from "../adapters/InMemoryStorage";

export class Scoreboard extends EventEmitter {

    constructor (
        private clock: IClock = Date,
        private storage: IMatchRepository = new InMemoryStorage()
    ) {
        super();
    }

    startNewMatch (match: Match) {
        match.start(this.clock.now());
        this.storage.save(match);
    }

    updateScore (matchId: string | number, params: { home: number, away: number }) {
        
    }

    finish (matchId: string | number) {

    }

    getSummary () {

    }
}
import { EventEmitter } from "node:events";
import type { Match } from "./Match";
import type { IClock } from "./interfaces/IClock";
import type { IMatchRepository, UpdateParams } from "./interfaces/IMatchRepository";
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

    updateScore (matchId: string | number, params: Required<UpdateParams>) {
        this.storage.update(matchId, params);
    }

    finish (matchId: string | number) {

    }

    getSummary () {

    }
}
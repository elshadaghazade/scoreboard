import { EventEmitter } from "node:stream";
import type { Match } from "./Match";
import type { IClock } from "./interfaces/IClock";

export class Scoreboard extends EventEmitter {

    constructor (
        private clock: IClock = Date
    ) {
        super();
    }

    startNewMatch (match: Match) {
        match.start(this.clock.now());
    }

    updateScore () {

    }

    finish () {

    }

    getSummary () {

    }
}
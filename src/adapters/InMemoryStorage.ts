import type { IMatchRepository } from "../core/interfaces/MatchRepository";
import { Match } from "../core/Match";

export class InMemoryStorage implements IMatchRepository {
    save(match: Match): void {
        throw new Error("Method not implemented.");
    }

    findById(matchId: string | number): Match {
        throw new Error("Method not implemented.");
    }

    update(matchId: string | number): void {
        throw new Error("Method not implemented.");
    }

    delete(matchId: string | number): Match {
        throw new Error("Method not implemented.");
    }

    clearAll(): void {
        throw new Error("Method not implemented.");
    }

    findAll(): Match[] {
        throw new Error("Method not implemented.");
    }
}
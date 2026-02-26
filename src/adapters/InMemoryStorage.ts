import type { IMatchRepository } from "../core/interfaces/MatchRepository";
import { Match } from "../core/Match";

export class InMemoryStorage implements IMatchRepository {

    private storage: Map<string | number, Match> = new Map();

    save(match: Match): void {
        this.storage.set(match.id, match);
    }

    findById(matchId: string | number): Match {
        const match = this.storage.get(matchId);
        if (!match) {
            throw new Error('Match not found');
        }

        return match;
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
        return Array.from(this.storage.values());
    }
}
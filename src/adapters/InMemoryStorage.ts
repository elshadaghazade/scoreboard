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

    delete(matchId: string | number): Match {
        const match = this.storage.get(matchId);
        if (!match) {
            throw new Error('Match not found');
        }

        if (this.storage.delete(matchId)) {
            return match;
        }

        throw new Error('Match could not be deleted');
    }

    clearAll(): void {
        this.storage.clear();
    }

    findAll(): Match[] {
        return Array.from(this.storage.values());
    }
}
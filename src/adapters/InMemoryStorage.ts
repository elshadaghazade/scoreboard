import type { IMatchRepository, UpdateParams } from "../core/interfaces/IMatchRepository";
import { Match } from "../core/Match";

export class InMemoryStorage implements IMatchRepository {

    private storage: Map<string | number, Match> = new Map();

    save(...matches: Match[]): void {
        for(const match of matches) {
            this.storage.set(match.id, match);
        }
    }

    findById(matchId: string | number): Match {
        const match = this.storage.get(matchId);
        if (!match) {
            throw new Error('Match not found');
        }

        return match;
    }

    update(matchId: string | number, params: UpdateParams): void {
        const match = this.findById(matchId);

        if (params.awayTeam) {
            match.awayTeam.setScore(params.awayTeam);
        }
        
        if (params.homeTeam) {
            match.homeTeam.setScore(params.homeTeam);
        }
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
import type { Match } from "../Match";

export interface IMatchRepository {
    /**
     * Persists the given Match
     * 
     * Contract:
     * - must store a match so it can be retrived later by id
     * - if a match with the same id exists then method should replace it
     */
    save(match: Match): void;

    /**
     * finds a match by id and returns it.
     * Throws an error if match not found.
     */
    findById(matchId: string | number): Match;

    /**
     * deletes an existing match by it's id.
     * Throws an error if match not found.
     */
    delete(matchId: string | number): Match;

    /**
     * removes all matches.
     */
    clearAll(): void;

    /**
     * returns all matches from storage as an array.
     */
    findAll(): Match[];
}
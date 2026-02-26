import type { Match } from "../Match";

export interface IRankStrategy {
    getSummary(matches: Match[]): Match[];
}
import type { IRankStrategy } from "../core/interfaces/IRankStrategy";
import { Match } from "../core/Match";

export class RankStrategy implements IRankStrategy {
    getSummary(matches: Match[]): Match[] {
        return matches.sort((m1, m2) => {
            const m1TotalScore = m1.homeTeam.getScore() + m1.awayTeam.getScore();
            const m2TotalScore = m2.homeTeam.getScore() + m2.awayTeam.getScore();
            const scoreDiff = m2TotalScore - m1TotalScore;

            if (scoreDiff) {
                return scoreDiff;
            }

            return m2.whenStarted()! - m1.whenStarted()!;
        });
    }
}
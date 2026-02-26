export class Team {
    private score = 0;

    constructor(public name: string) {}

    setScore(score: number) {
        if (score < 0) {
            throw new Error("score must be a non-negative integer");
        }
        this.score = score;
    }

    getScore() {
        return this.score;
    }
}
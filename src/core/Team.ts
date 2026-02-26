export class Team {
    private score = 0;

    constructor(public name: string) {}

    setScore(score: number) {
        this.score = score;
    }

    getScore() {
        return this.score;
    }
}
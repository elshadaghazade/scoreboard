import { describe, test, expect } from '@jest/globals';
import { Team } from '../src/core/Team';
import { Match } from '../src/core/Match';

describe('Match', () => {
    test('initially match is not ongoing, not finished, no timestamps', () => {
        const home = new Team('Home');
        const away = new Team('Away');

        const match = new Match('m1', home, away);

        expect(match.isOngoing()).toBe(false);
        expect(match.isFinished()).toBe(false);
        expect(match.whenFinished()).toBeUndefined();
        expect(match.whenStarted()).toBeUndefined();
    });

    test('start() method sets startedAt once', () => {
        const match = new Match('m1', new Team('Home'), new Team('Away'));
        match.start(1000);

        expect(match.whenStarted()).toBe(1000);
        expect(match.isOngoing()).toBe(true);
        expect(match.isFinished()).toBe(false);

        match.start(2000);
        expect(match.whenStarted()).toBe(1000);
    });

    test('finish() method does nothing if match is not started yet', () => {
        const match = new Match('m1', new Team('Home'), new Team('Away'));
        match.finish(1000);
        
        expect(match.whenFinished()).toBeUndefined();
        expect(match.whenStarted()).toBeUndefined();
        expect(match.isOngoing()).toBe(false);
        expect(match.isFinished()).toBe(false);
    })

    test('finish() method is ignored if is called twice', () => {
        const match = new Match('m1', new Team('Home'), new Team('Away'));
        match.start(1000);
        match.finish(2000);

        expect(match.isOngoing()).toBe(false);
        expect(match.isFinished()).toBe(true);
        expect(match.whenStarted()).toBe(1000);
        expect(match.whenFinished()).toBe(2000);

        match.finish(3000);
        expect(match.whenFinished()).toBe(2000);
    })

    test('start() method is ignored after finish() is called', () => {
        const match = new Match('m1', new Team('Home'), new Team('Away'));
        match.start(1000);
        match.finish(2000);

        expect(match.whenStarted()).toBe(1000);

        match.start(3000);
        expect(match.whenStarted()).toBe(1000);
    })

    test('keeps the same Team instances passed in constructor', () => {
        const home = new Team('Home');
        const away = new Team('Away');

        const match = new Match('m1', home, away);

        expect(match.homeTeam).toBe(home);
        expect(match.awayTeam).toBe(away);
    })
});
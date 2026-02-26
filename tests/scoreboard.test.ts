import { describe, test, expect, jest } from '@jest/globals';
import { Team } from '../src/core/Team';
import { Match } from '../src/core/Match';
import { Scoreboard } from '../src/core/Scoreboard';

describe('Scoreboard', () => {
    test('startNewMatch() method calls match.start() method and passes clock.now()', () => {
        const now = 1000;
        const clock = { now: jest.fn(() => now) }

        const scoreBoard = new Scoreboard(clock);

        const match = new Match('m1', new Team('Home'), new Team('Away'));

        scoreBoard.startNewMatch(match);

        expect(clock.now).toHaveBeenCalledTimes(1);
        expect(match.whenStarted()).toBe(now);
    })

})
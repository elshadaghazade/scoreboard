import { describe, test, expect } from '@jest/globals';
import { Team } from '../src/core/Team';

describe('Team', () => {
    test('stores the name from constructor', () => {
        const team = new Team('Arsenal');
        expect(team.name).toBe('Arsenal');
    })

    test('starts with score = 0', () => {
        const team = new Team('Arsenal');
        expect(team.getScore()).toBe(0);
    })

    test('setScore updates the score', () => {
        const team = new Team('Arsenal');
        team.setScore(7);
        expect(team.getScore()).toBe(7);
    });

    test('setScore throws error on negative score', () => {
        const team = new Team('Arsenal');
        expect(() => team.setScore(-1)).toThrow("score must be a non-negative integer");
    })
});
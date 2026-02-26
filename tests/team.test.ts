import { describe, test, expect } from '@jest/globals';
import { Team } from '../src/core/Team';

describe('Team', () => {
    test('stores the name from constructor', () => {
        const team = new Team('Arsenal');

        expect(team.name).toBe('Arsenal');
    });
});